import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
      const supabase = createClient();
      const {
        data: { session },
        error,
      } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Auth callback error:", error);
        return NextResponse.redirect(
          `${requestUrl.origin}/login?error=auth_callback_failed`
        );
      }

      if (session?.user) {
        // Create or update user record in our database
        await prisma.user.upsert({
          where: { id: session.user.id },
          create: {
            id: session.user.id,
            email: session.user.email!,
            credits: 50, // Default credits for new users
            planType: "free",
          },
          update: {
            email: session.user.email!,
          },
        });

        return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
      }
    }

    return NextResponse.redirect(`${requestUrl.origin}/login?error=no_code`);
  } catch (error) {
    console.error("Auth callback error:", error);
    const requestUrl = new URL(request.url);
    return NextResponse.redirect(`${requestUrl.origin}/login?error=unknown`);
  }
}
