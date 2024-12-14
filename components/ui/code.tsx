"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CodeProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
}

const Code = React.forwardRef<HTMLPreElement, CodeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <pre
        ref={ref}
        className={cn(
          "mb-4 mt-2 overflow-x-auto rounded-lg bg-secondary p-4 font-mono text-sm text-secondary-foreground",
          className
        )}
        {...props}
      >
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {children}
        </code>
      </pre>
    );
  }
);

Code.displayName = "Code";

export { Code };
