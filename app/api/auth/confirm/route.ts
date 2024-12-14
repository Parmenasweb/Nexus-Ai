// import { type EmailOtpType } from "@supabase/supabase-js";
// import { type NextRequest } from "next/server";

// import { createClient } from "@/lib/supabase/client";
// import { redirect } from "next/navigation";
// import { NextApiRequest } from "next";

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const token_hash = searchParams.get("token_hash");
//   const type = searchParams.get("type") as EmailOtpType | null;
//   const next = searchParams.get("next") ?? "/";

//   if (token_hash && type) {
//     const supabase = await createClient();

//     const { error } = await supabase.auth.verifyOtp({
//       type,
//       token_hash,
//     });
//     if (!error) {
//       // redirect user to specified redirect URL or root of app
//       redirect(next);
//     }
//   }

//   // redirect the user to an error page with some instructions
//   redirect("/error");
// }
import { type EmailOtpType } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

function stringOrFirstString(item: string | string[] | undefined) {
  return Array.isArray(item) ? item[0] : item;
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).appendHeader("Allow", "GET").end();
    return;
  }

  const queryParams = req.query;
  3;

  const token_hash = stringOrFirstString(queryParams.token_hash);
  const type = stringOrFirstString(queryParams.type);

  let next = "/error";

  if (token_hash && type) {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash,
    });
    if (error) {
      console.error(error);
    } else {
      next = stringOrFirstString(queryParams.next) || "/";
    }
  }

  res.redirect(next);
}
