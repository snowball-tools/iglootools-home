import React, { type PropsWithChildren } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedComponentProps extends PropsWithChildren {
  animKey: string;
}

const AnimatedComponent = ({ animKey, children }: AnimatedComponentProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={animKey}
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -200, opacity: 0 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default AnimatedComponent;
