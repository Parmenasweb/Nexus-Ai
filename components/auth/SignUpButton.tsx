"use client";

import { useRouter } from "next/navigation";
import { SignUpButton as ClerkSignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface SignUpButtonProps {
  mode?: "modal" | "redirect";
  afterSignUpUrl?: string;
  className?: string;
}

export function SignUpButton({ 
  mode = "redirect", 
  afterSignUpUrl = "/dashboard",
  className 
}: SignUpButtonProps) {
  const router = useRouter();

  return (
    <ClerkSignUpButton mode={mode} afterSignUpUrl={afterSignUpUrl}>
      <Button className={className} variant="outline">
        Sign Up
      </Button>
    </ClerkSignUpButton>
  );
}