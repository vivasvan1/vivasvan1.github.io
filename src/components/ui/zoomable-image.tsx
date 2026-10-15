import { cn } from "@/lib/utils";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./button";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.2;

type ZoomableImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });

  const clampScale = useCallback(
    (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value)),
    [],
  );

  const resetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const applyZoom = useCallback(
    (delta: number) => {
      setScale((current) => {
        const next = clampScale(current + delta);
        if (next === 1) {
          setPosition({ x: 0, y: 0 });
        }
        return next;
      });
    },
    [clampScale],
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const delta = event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      applyZoom(delta);
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      node.removeEventListener("wheel", onWheel);
    };
  }, [applyZoom]);

  useEffect(() => {
    resetView();
  }, [src, resetView]);

  const onPointerDown = (event: React.PointerEvent) => {
    if (scale <= 1) {
      return;
    }
    dragging.current = true;
    lastPoint.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragging.current) {
      return;
    }
    const dx = event.clientX - lastPoint.current.x;
    const dy = event.clientY - lastPoint.current.y;
    lastPoint.current = { x: event.clientX, y: event.clientY };
    setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const onPointerUp = (event: React.PointerEvent) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onDoubleClick = () => {
    if (scale > 1) {
      resetView();
      return;
    }
    setScale(2);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className={cn(
          "relative h-[min(60vh,32rem)] w-full overflow-hidden rounded-lg border bg-muted/40",
          scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={onDoubleClick}
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="max-h-full max-w-full select-none object-contain"
          />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          Scroll or use +/- to zoom · double-click to reset
        </p>
        <div className="flex shrink-0 gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            aria-label="Zoom out"
            onClick={() => {
              applyZoom(-ZOOM_STEP);
            }}
            disabled={scale <= MIN_ZOOM}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            aria-label="Zoom in"
            onClick={() => {
              applyZoom(ZOOM_STEP);
            }}
            disabled={scale >= MAX_ZOOM}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            aria-label="Reset zoom"
            onClick={resetView}
            disabled={scale === 1 && position.x === 0 && position.y === 0}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
