import { cn } from "@/lib/utils";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { Button } from "./button";

type ZoomableImageProps = {
  src: string;
  alt: string;
  className?: string;
  isActive?: boolean;
};

export function ZoomableImage({
  src,
  alt,
  className,
  isActive = true,
}: ZoomableImageProps) {
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const [scale, setScale] = useState(1);

  // Reset zoom whenever this slide becomes inactive or the image source changes
  useEffect(() => {
    if (!isActive) {
      transformRef.current?.resetTransform();
      setScale(1);
    }
  }, [isActive]);

  useEffect(() => {
    transformRef.current?.resetTransform();
    setScale(1);
  }, [src]);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    transformRef.current?.zoomIn(0.4);
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    transformRef.current?.zoomOut(0.4);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    transformRef.current?.resetTransform();
  };

  const handleToggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1.05) {
      transformRef.current?.resetTransform();
    } else {
      transformRef.current?.centerView(2);
    }
  };

  const isZoomed = scale > 1.02;

  return (
    <div
      className={cn(
        "group relative h-[min(55vh,28rem)] sm:h-[min(60vh,32rem)] w-full select-none overflow-hidden rounded-xl border border-border/60 bg-muted/20 dark:bg-zinc-950/40",
        className
      )}
    >
      <TransformWrapper
        ref={transformRef}
        initialScale={1}
        minScale={1}
        maxScale={4}
        centerOnInit
        limitToBounds
        doubleClick={{
          mode: "toggle",
          step: 1,
          excluded: ["zoom-controls-exclude"],
        }}
        wheel={{
          step: 0.15,
          excluded: ["zoom-controls-exclude"],
        }}
        pinch={{
          step: 5,
          excluded: ["zoom-controls-exclude"],
        }}
        panning={{
          velocityDisabled: false,
          excluded: ["zoom-controls-exclude"],
        }}
        onTransform={(_ref, state) => {
          setScale(state.scale);
        }}
      >
        <TransformComponent
          wrapperClass={cn(
            "!w-full !h-full",
            isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
          )}
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="max-h-full max-w-full select-none object-contain"
          />
        </TransformComponent>
      </TransformWrapper>

      {/* Floating Controls Bar - stays anchored to viewport and never moves on panning */}
      <div
        className="zoom-controls-exclude absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-full border border-border/70 bg-background/90 px-1.5 py-1 shadow-md backdrop-blur-md"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full text-foreground/80 hover:bg-muted hover:text-foreground disabled:opacity-40"
          aria-label="Zoom out"
          onClick={handleZoomOut}
          disabled={scale <= 1.01}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>

        <button
          type="button"
          onClick={handleToggleZoom}
          className="px-1.5 text-[11px] font-medium tabular-nums text-foreground/80 transition-colors hover:text-foreground"
          title={isZoomed ? "Click to reset zoom" : "Click to zoom to 2x"}
          aria-label={`Zoom level: ${Math.round(scale * 100)}%`}
        >
          {Math.round(scale * 100)}%
        </button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full text-foreground/80 hover:bg-muted hover:text-foreground disabled:opacity-40"
          aria-label="Zoom in"
          onClick={handleZoomIn}
          disabled={scale >= 4}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>

        <div className="mx-0.5 h-3.5 w-[1px] bg-border/80" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full text-foreground/80 hover:bg-muted hover:text-foreground disabled:opacity-40"
          aria-label="Reset zoom"
          onClick={handleReset}
          disabled={!isZoomed}
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>

      {/* Subtle Hint Pill */}
      <div className="zoom-controls-exclude pointer-events-none absolute bottom-3 left-3 z-10 hidden select-none items-center gap-1.5 rounded-full border border-border/50 bg-background/70 px-2.5 py-1 text-[11px] text-muted-foreground shadow-sm backdrop-blur-md sm:flex">
        <span>Scroll / Pinch to zoom</span>
        <span className="text-border">•</span>
        <span>Drag to pan</span>
        <span className="text-border">•</span>
        <span>Double-click to reset</span>
      </div>
    </div>
  );
}
