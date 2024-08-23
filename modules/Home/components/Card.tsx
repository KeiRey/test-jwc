import React from "react";
import { motion } from "framer-motion";
import { CardTypes } from "@/utils/types/CardTypes";
import { FocusableComponentLayout, FocusDetails, KeyPressDetails, useFocusable } from "@noriginmedia/norigin-spatial-navigation";

interface CardProps extends CardTypes {
  onFocus?: (layout: FocusableComponentLayout, props: object, details: FocusDetails) => void;
  onAssetPress: (props: object, details: KeyPressDetails) => void;
}

export default function Card({ id, title, description, onFocus, onAssetPress: onEnterPress }: CardProps) {
  const { ref, focused } = useFocusable({
    onFocus,
    onEnterPress,
    focusKey: `CARD_${id}`,
    extraProps: {
      id,
      title,
      description,
    },
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(0.5)" }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className={`flex flex-col w-full h-[170px] bg-[#000] transition-all duration-300 cursor-pointer rounded-md border-2 ${
        focused ? " border-white scale-105" : " border-transparent"
      }`}
    ></motion.div>
  );
}
