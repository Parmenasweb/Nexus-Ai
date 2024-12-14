"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Download, Lock, Image as ImageIcon } from "lucide-react";

interface ImagePreviewProps {
  image: string | null;
  isLoading: boolean;
  isPaidUser: boolean;
  onDownload: () => void;
}

export function ImagePreview({ image, isLoading, isPaidUser, onDownload }: ImagePreviewProps) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Label>Preview</Label>
        {image && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onDownload}
              disabled={!isPaidUser}
            >
              <Download className="w-4 h-4 mr-2" />
              Download HD
              {!isPaidUser && <Lock className="w-3 h-3 ml-1" />}
            </Button>
          </div>
        )}
      </div>

      <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
              <p className="text-sm text-muted-foreground">Generating your image...</p>
            </div>
          </div>
        ) : image ? (
          <>
            <img
              src={image}
              alt="Generated"
              className="w-full h-full object-cover"
            />
            {!isPaidUser && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center p-6">
                  <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <h3 className="font-medium mb-2">HD Download Available in Pro</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upgrade to download high-resolution images
                  </p>
                  <Button>Upgrade to Pro</Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Generated image will appear here
              </p>
            </div>
          </div>
        )}
      </div>

      {image && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Resolution: {isPaidUser ? "1024x1024" : "512x512"}</span>
          <Badge variant="secondary">AI Generated</Badge>
        </div>
      )}
    </Card>
  );
}