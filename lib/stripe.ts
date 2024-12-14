import Stripe from "stripe";
import { prisma } from "./db";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

export const getOrCreateStripeCustomer = async (
  email: string,
  userId: string
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { stripeCustomerId: true },
  });

  if (user?.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
};

export const createCheckoutSession = async (
  customerId: string,
  priceId: string,
  userId: string,
  planName: string
) => {
  return stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
    metadata: { userId, planName },
  });
};

export const handleSubscriptionChange = async (
  userId: string,
  subscriptionId: string | null,
  status: string = "inactive",
  planName: string = "free"
) => {
  const credits =
    planName === "Basic"
      ? 200
      : planName === "Pro"
      ? 1000
      : planName === "Enterprise"
      ? 999999
      : 50;

  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionId,
      subscriptionStatus: status,
      planType: planName,
      credits,
    },
  });
};
