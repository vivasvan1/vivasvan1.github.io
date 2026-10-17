import { useEffect, useRef } from "react";
import { useTheme } from "@/components/site/theme-provider";

interface Dot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  radius: number;
  targetRadius: number;
  opacity: number;
  targetOpacity: number;
}

export function InteractiveDotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let isDark = document.documentElement.classList.contains("dark");
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const SPACING = 28;
    const RADIUS = 130;
    const MAX_PUSH = 22;

    let dots: Dot[] = [];

    const initDots = () => {
      dots = [];
      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;
      const offsetX = ((width % SPACING) - SPACING) / 2;
      const offsetY = ((height % SPACING) - SPACING) / 2;

      const baseOpacity = isDark ? 0.25 : 0.22;
      const baseRadius = 1.5;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = c * SPACING + offsetX;
          const originY = r * SPACING + offsetY;
          dots.push({
            originX,
            originY,
            x: originX,
            y: originY,
            radius: baseRadius,
            targetRadius: baseRadius,
            opacity: baseOpacity,
            targetOpacity: baseOpacity,
          });
        }
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initDots();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY : e.clientY;

      if (clientX !== undefined && clientY !== undefined) {
        mouse.x = clientX;
        mouse.y = clientY;
        mouse.active = true;
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const baseOpacity = isDark ? 0.25 : 0.22;
      const baseRadius = 1.5;
      const dotColor = isDark ? "255, 255, 255" : "0, 0, 0";

      // Cursor spotlight circle
      if (mouse.active && mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          RADIUS * 1.2
        );
        glow.addColorStop(0, isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.05)");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, RADIUS * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        let targetX = dot.originX;
        let targetY = dot.originY;
        let targetRadius = baseRadius;
        let targetOpacity = baseOpacity;

        if (mouse.active) {
          const dx = dot.originX - mouse.x;
          const dy = dot.originY - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < RADIUS) {
            const force = Math.pow(1 - dist / RADIUS, 1.5);
            const angle = Math.atan2(dy, dx);

            // Push dots away from cursor
            targetX += Math.cos(angle) * force * MAX_PUSH;
            targetY += Math.sin(angle) * force * MAX_PUSH;

            // Expand and brighten dots near cursor
            targetRadius = baseRadius + force * 1.8;
            targetOpacity = baseOpacity + force * (isDark ? 0.65 : 0.6);
          }
        }

        // Smooth spring physics interpolation
        dot.x += (targetX - dot.x) * 0.16;
        dot.y += (targetY - dot.y) * 0.16;
        dot.radius += (targetRadius - dot.radius) * 0.18;
        dot.opacity += (targetOpacity - dot.opacity) * 0.18;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${dot.opacity.toFixed(3)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 block h-full w-full select-none"
    />
  );
}
