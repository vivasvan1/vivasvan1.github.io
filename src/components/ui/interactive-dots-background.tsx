import { useEffect, useRef } from "react";
import { useTheme } from "@/components/site/theme-provider";

interface Dot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  currentRadius: number;
  opacity: number;
  currentOpacity: number;
}

export function InteractiveDotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
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

    const SPACING = 24;
    const INTERACTION_RADIUS = 140;
    const MAX_PUSH = 18;
    const SPRING_FACTOR = 0.12;
    const DAMPING = 0.82;

    let dots: Dot[] = [];

    const initDots = () => {
      dots = [];
      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      const offsetX = ((width % SPACING) - SPACING) / 2;
      const offsetY = ((height % SPACING) - SPACING) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = c * SPACING + offsetX;
          const originY = r * SPACING + offsetY;
          dots.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            radius: 1.25,
            currentRadius: 1.25,
            opacity: 0.15,
            currentOpacity: 0.15,
          });
        }
      }
    };

    const resize = () => {
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

    resize();
    window.addEventListener("resize", resize);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const onTouchEnd = () => {
      mouse.active = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    const render = (time: number) => {

      // Smooth mouse interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.2;
        mouse.y += (mouse.targetY - mouse.y) * 0.2;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.1;
        mouse.y += (-1000 - mouse.y) * 0.1;
      }

      ctx.clearRect(0, 0, width, height);

      // Subtle ambient cursor spotlight glow
      if (mouse.active && mouse.x > -100 && mouse.x < width + 100) {
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          INTERACTION_RADIUS * 1.5,
        );
        if (isDark) {
          glow.addColorStop(0, "rgba(255, 255, 255, 0.05)");
          glow.addColorStop(0.5, "rgba(255, 255, 255, 0.015)");
          glow.addColorStop(1, "rgba(255, 255, 255, 0)");
        } else {
          glow.addColorStop(0, "rgba(0, 0, 0, 0.04)");
          glow.addColorStop(0.5, "rgba(0, 0, 0, 0.015)");
          glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        }
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, INTERACTION_RADIUS * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      const baseR = isDark ? 255 : 0;
      const baseG = isDark ? 255 : 0;
      const baseB = isDark ? 255 : 0;
      const baseOpacity = isDark ? 0.14 : 0.12;

      // Idle wave time factor
      const waveTime = time * 0.0015;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Microscopic organic breathing when idle
        const idleOffsetX =
          Math.sin(waveTime + dot.originX * 0.02 + dot.originY * 0.01) * 0.5;
        const idleOffsetY =
          Math.cos(waveTime + dot.originX * 0.01 + dot.originY * 0.02) * 0.5;

        let targetX = dot.originX + idleOffsetX;
        let targetY = dot.originY + idleOffsetY;
        let targetOpacity = baseOpacity;
        let targetRadius = dot.radius;

        if (mouse.active) {
          const dx = dot.originX - mouse.x;
          const dy = dot.originY - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radiusSq = INTERACTION_RADIUS * INTERACTION_RADIUS;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const force = Math.pow(1 - dist / INTERACTION_RADIUS, 1.6);
            const nx = dist === 0 ? 0 : dx / dist;
            const ny = dist === 0 ? 0 : dy / dist;

            // Push dot away from cursor with elastic spring
            targetX += nx * force * MAX_PUSH;
            targetY += ny * force * MAX_PUSH;

            // Increase brightness and radius near cursor
            targetOpacity = baseOpacity + force * (isDark ? 0.7 : 0.65);
            targetRadius = dot.radius + force * 1.35;
          }
        }

        // Spring-damper physics towards target
        const ax = (targetX - dot.x) * SPRING_FACTOR;
        const ay = (targetY - dot.y) * SPRING_FACTOR;
        dot.vx = (dot.vx + ax) * DAMPING;
        dot.vy = (dot.vy + ay) * DAMPING;
        dot.x += dot.vx;
        dot.y += dot.vy;

        dot.currentOpacity += (targetOpacity - dot.currentOpacity) * 0.18;
        dot.currentRadius += (targetRadius - dot.currentRadius) * 0.18;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${dot.currentOpacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 block h-full w-full select-none"
    />
  );
}
