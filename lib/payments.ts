import Stripe from "stripe";
import { getDbConnection } from "./db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
  typescript: true,
});

export async function handleSubscriptionDeleted({
  subscriptionId,
}: {
  subscriptionId: string;
}) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const sql = await getDbConnection();
    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;
  } catch (error) {
    console.log("Error deleting subscription", error);
    throw error;
  }
}

export async function handleSubscriptionUpdated({
  subscriptionId,
}: {
  subscriptionId: string;
}) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const sql = await getDbConnection();
    await sql`
      UPDATE users SET status = 'active' WHERE customer_id = ${subscription.customer}
    `;
  } catch (error) {
    console.log("Error updating subscription", error);
    throw error;
  }
}

export async function handleCheckoutCompleted(session: any) {
  try {
    const customer = await stripe.customers.retrieve(session.customer);
    const email = session.customer_details.email;
    const customerName = session.customer_details.name;

    const sql = await getDbConnection();

    // Create or update user
    await createOrUpdateUser({
      sql,
      email,
      fullName: customerName,
      customerId: session.customer,
      priceId: session.metadata.priceId,
      status: "active",
    });

    // Create payment record
    await createPayment({
      sql,
      stripePaymentId: session.payment_intent || session.id,
      amount: session.amount_total,
      status: session.payment_status,
      priceId: session.metadata.priceId,
      userEmail: email,
    });
  } catch (error) {
    console.log("Error completing checkout", error);
    throw error;
  }
}

async function createOrUpdateUser({
  sql,
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  sql: any;
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) {
  try {
    // Check if user exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length === 0) {
      // Create new user
      await sql`
        INSERT INTO users (email, full_name, customer_id, price_id, status)
        VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})
      `;
      console.log("Created new user:", email);
    } else {
      // Update existing user
      await sql`
        UPDATE users 
        SET full_name = ${fullName},
            customer_id = ${customerId},
            price_id = ${priceId},
            status = ${status}
        WHERE email = ${email}
      `;
      console.log("Updated existing user:", email);
    }
  } catch (error) {
    console.error("Error in createOrUpdateUser:", error);
    throw error;
  }
}

async function createPayment({
  sql,
  stripePaymentId,
  amount,
  status,
  priceId,
  userEmail,
}: {
  sql: any;
  stripePaymentId: string;
  amount: number;
  status: string;
  priceId: string;
  userEmail: string;
}) {
  try {
    await sql`
      INSERT INTO payments (
        amount,
        status,
        stripe_payment_id,
        price_id,
        user_email
      ) VALUES (
        ${amount},
        ${status},
        ${stripePaymentId},
        ${priceId},
        ${userEmail}
      )
    `;
    console.log("Created payment record:", stripePaymentId);
  } catch (error) {
    console.error("Error in createPayment:", error);
    throw error;
  }
}
