"use client";

import { Card } from "@/components/ui/card";
import { ImageIcon, VideoIcon, FileTextIcon } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "image",
    action: "Enhanced portrait photo",
    timestamp: "2 minutes ago",
    icon: ImageIcon,
  },
  {
    id: 2,
    type: "video",
    action: "Generated product showcase",
    timestamp: "1 hour ago",
    icon: VideoIcon,
  },
  {
    id: 3,
    type: "content",
    action: "Created blog post",
    timestamp: "3 hours ago",
    icon: FileTextIcon,
  },
];

interface RecentActivityProps {
  className?: string;
}

export function RecentActivity({ className }: RecentActivityProps) {
  return (
    <Card className={className}>
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex items-center space-x-4 text-sm"
              >
                <div className="rounded-full p-2 bg-secondary">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}