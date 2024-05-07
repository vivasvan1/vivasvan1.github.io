import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import CursorBlinker from "./cursor-blinker";
import { useEffect } from "react";

export default function TextAnim() {
  const baseText = "This is Vivasvan Patel" as string;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );
  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween", // Not really needed because adding a duration will force "tween"
      duration: 5,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);
  return (
    <span className="">
      <motion.span>{displayText}</motion.span>
      <CursorBlinker />
    </span>
  );
}
