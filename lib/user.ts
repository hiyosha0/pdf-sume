import { pricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUploadCount } from "./summaries";
import { User } from "@clerk/nextjs/server";

export async function initializeNewUser(email: string, fullName: string) {
  const sql = await getDbConnection();
  const basicPlan = pricingPlans.find((plan) => plan.id === "basic");

  try {
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length === 0) {
      await sql`
        INSERT INTO users (
          email, 
          full_name, 
          price_id, 
          status
        ) VALUES (
          ${email}, 
          ${fullName}, 
          ${basicPlan?.priceId}, 
          'inactive'
        )
      `;
      console.log("Initialized new user with basic plan:", email);
    }
  } catch (error) {
    console.error("Error initializing user:", error);
    throw error;
  }
}

export async function getPriceIdForActiveUser(email: string) {
  const sql = await getDbConnection();

  const query = await sql`
    SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`;
  return query?.[0]?.price_id || null;
}

export async function hasActivePlan(email: string) {
  const sql = await getDbConnection();

  const query = await sql`
    SELECT price_id, status FROM users WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL`;
  return query && query.length > 0;
}

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUploadCount(userId);

  const priceId = await getPriceIdForActiveUser(userId);
  const isPro =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "pro";
  const uploadLimit: number = isPro ? 1000 : 5;

  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
}

export async function getSubscriptionStatus(user: User) {
  const hasSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );

  return hasSubscription;
}
