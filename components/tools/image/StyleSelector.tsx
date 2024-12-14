"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface StyleSelectorProps {
  value: string;
  onChange: (style: string) => void;
  disabled?: boolean;
}

const styles = [
  {
    id: "realistic",
    name: "Realistic",
    description: "Photorealistic style with high detail",
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&q=80"
  },
  {
    id: "artistic",
    name: "Artistic",
    description: "Creative and expressive artistic style",
    image: "https://images.unsplash.com/photo-1699114798945-5b0cd8288cee?w=500&q=80"
  },
  {
    id: "cartoon",
    name: "Cartoon",
    description: "Stylized cartoon illustrations",
    image: "https://images.unsplash.com/photo-1698778573682-346d219402b5?w=500&q=80"
  },
  {
    id: "3d",
    name: "3D Render",
    description: "3D rendered graphics and illustrations",
    image: "https://images.unsplash.com/photo-1697144518266-0bf5776fb977?w=500&q=80"
  }
];

export function StyleSelector({ value, onChange, disabled }: StyleSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Style</Label>
      <div className="grid grid-cols-2 gap-4">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            disabled={disabled}
            className={cn(
              "relative overflow-hidden rounded-lg border-2 aspect-[4/3] p-2 transition-all hover:border-primary",
              value === style.id ? "border-primary ring-2 ring-primary ring-offset-2" : "border-muted",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <img
              src={style.image}
              alt={style.name}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="relative z-10 h-full flex flex-col justify-end bg-gradient-to-t from-background/90 to-background/0 -m-2 p-4">
              <h3 className="font-medium text-sm">{style.name}</h3>
              <p className="text-xs text-muted-foreground">{style.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}