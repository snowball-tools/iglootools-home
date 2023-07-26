import React, { PropsWithChildren } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedComponentProps {
  children: React.ReactNode;
  key: string;
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
  children,
  key,
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={key}
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -200, opacity: 0 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default AnimatedComponent;
