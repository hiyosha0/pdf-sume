import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  const payload = await req.text();

  const sig = req.headers.get("stripe-signature");

  let event;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret);

    switch (event.type) {
      case "checkout.session.completed":
        const sessionId = event.data.object.id;
        console.log("Checkout session completed");
        console.log(sessionId);

        //retrive data from the session
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });

        await handleCheckoutSessionCompleted({ session, stripe });

        break;

      case "customer.subscription.deleted":
        console.log("Customer subscription deleted");

        const subscription = event.data.object;
        const subscriptionId = event.data.object.id;

        await handleSubscriptionDeleted({ subscriptionId, stripe });

        console.log(subscription);
        break;

      default:
        console.log(`unhandled event Type ${event.type}`);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to trigger the webhook" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: "success",
  });
};
