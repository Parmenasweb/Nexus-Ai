"use client";

import { useRouter } from "next/navigation";
import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface SignInButtonProps {
  mode?: "modal" | "redirect";
  afterSignInUrl?: string;
  className?: string;
}

export function SignInButton({ 
  mode = "redirect", 
  afterSignInUrl = "/dashboard",
  className 
}: SignInButtonProps) {
  const router = useRouter();

  return (
    <ClerkSignInButton mode={mode} afterSignInUrl={afterSignInUrl}>
      <Button className={className}>
        Sign In
      </Button>
    </ClerkSignInButton>
  );
}