"use client";

import { formatPrice } from "@/lib/utils/format";
import {
  KeyframeOptions,
  animate,
  useInView,
  useIsomorphicLayoutEffect,
} from "framer-motion";
import { useRef } from "react";

type AnimatedCounterProps = {
  from: number;
  to: number;
  animationOptions?: KeyframeOptions;
  className?: string;
};

const AnimatedPrice = ({
  from,
  to,
  animationOptions,
  className,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;
    if (!inView) return;

    // Set initial value
    element.textContent = formatPrice(String(from));

    // If reduced motion is enabled in system's preferences
    if (window.matchMedia("(prefers-reduced-motion)").matches) {
      element.textContent = formatPrice(String(to));
      return;
    }

    const controls = animate(from, to, {
      duration: 0.5,
      ease: "easeOut",
      ...animationOptions,
      onUpdate(value) {
        element.textContent = formatPrice(value.toFixed(0));
      },
    });

    // Cancel on unmount
    return () => {
      controls.stop();
    };
  }, [ref, inView, from, to]);

  return <span ref={ref} className={className} />;
};

export default AnimatedPrice;