import {
  handleCheckoutCompleted,
  handleSubscriptionDeleted,
  handleSubscriptionUpdated,
} from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
  typescript: true,
});

// This is your Stripe webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const POST = async (req: NextRequest) => {
  console.log("Webhook received");

  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !endpointSecret) {
    console.error("Missing signature or webhook secret");
    return NextResponse.json(
      { error: "Missing signature or webhook secret" },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    console.log("Event verified:", event.type);
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        console.log("Processing checkout completion...");
        await handleCheckoutCompleted(event.data.object);
        break;

      case "customer.subscription.deleted":
        console.log("Processing subscription deletion...");
        await handleSubscriptionDeleted({
          subscriptionId: event.data.object.id,
        });
        break;

      case "customer.subscription.updated":
        console.log("Processing subscription update...");
        await handleSubscriptionUpdated({
          subscriptionId: event.data.object.id,
        });
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    console.log("Webhook processed successfully");
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 200 }
    );
  }
};
