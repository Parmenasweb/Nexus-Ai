import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe, handleSubscriptionChange } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function handleSubscriptionEvent(subscription: any) {
  const { userId, planName } = subscription.metadata;
  await handleSubscriptionChange(
    userId,
    subscription.status === "active" ? subscription.id : null,
    subscription.status,
    subscription.status === "active" ? planName : "free"
  );
}

export async function POST(req: Request) {
  try {
    if (!webhookSecret) {
      throw new Error("Missing Stripe webhook secret");
    }

    const body = await req.text();
    const signature = headers().get("stripe-signature")!;

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed");
      return new NextResponse("Webhook signature verification failed", {
        status: 400,
      });
    }

    if (event.type.startsWith("customer.subscription.")) {
      await handleSubscriptionEvent(event.data.object);
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}
