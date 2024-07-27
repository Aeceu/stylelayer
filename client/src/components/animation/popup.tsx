import React, { useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const Popup = ({ delay, duration, children, className }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: { scale: 0 },
        visible: {
          scale: 1,
          transition: { delay: delay ? delay : 0.2, duration: duration && duration },
        },
      }}
      initial="hidden"
      animate={mainControls}>
      {children}
    </motion.div>
  );
};

export default Popup;
