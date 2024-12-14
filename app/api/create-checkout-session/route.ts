import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createCheckoutSession, getOrCreateStripeCustomer } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { priceId, planName } = body;

    if (!priceId || !planName) {
      return new NextResponse("Price ID and plan name are required", {
        status: 400,
      });
    }

    const customerId = await getOrCreateStripeCustomer(user.email!, user.id);
    const session = await createCheckoutSession(
      customerId,
      priceId,
      user.id,
      planName
    );

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
