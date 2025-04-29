import { handleCheckoutCompleted } from "@/lib/payments";
import { NextResponse } from "next/server";

// Test webhook endpoint for development
export const GET = async () => {
  try {
    // Simulate a Stripe checkout.session.completed webhook event
    const mockSession = {
      id: "cs_test_123",
      customer: "cus_test123",
      customer_details: {
        email: "test@example.com",
        name: "Test User",
      },
      metadata: {
        priceId: "price_basic",
      },
      payment_intent: "pi_test123",
      payment_status: "paid",
      amount_total: 199, // Amount in cents
    };

    await handleCheckoutCompleted(mockSession);

    return NextResponse.json(
      {
        message: "Test webhook processed successfully",
        data: mockSession,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing test webhook:", error);
    return NextResponse.json(
      {
        error: "Test webhook failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};

// Also support POST for testing real webhook payloads
export const POST = async (req: Request) => {
  try {
    const session = await req.json();
    await handleCheckoutCompleted(session);
    return NextResponse.json(
      { message: "Test webhook processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      {
        error: "Webhook processing failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};
