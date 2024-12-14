interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex-1 space-y-4 md:space-y-8 p-2 md:p-8">
      <div className="flex-1 space-y-4">{children}</div>
    </div>
  );
}