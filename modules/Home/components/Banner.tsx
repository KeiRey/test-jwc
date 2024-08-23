import React from "react";
import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";
import Image from "next/image";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

type Props = {
  openDetail: boolean;
  handleBack: () => void;
  setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Banner({ openDetail, handleBack, setOpenDetail }: Props) {
  const { ref, focused, focusSelf } = useFocusable({
    focusKey: "BANNER_BACK",
    onEnterPress: () => {
      setOpenDetail(false);
    },
    onArrowPress: (e) => {
      return true;
    },
  });
  React.useEffect(() => {
    if (openDetail) {
      focusSelf();
    }
  }, [focusSelf, openDetail]);

  return (
    <div className="relative w-full">
      {openDetail && (
        <motion.div
          ref={ref}
          onClick={handleBack}
          animate={{ left: openDetail ? "10px" : "-40px", display: openDetail ? "block" : "flex" }}
          transition={{ duration: 0.5 }}
          className={`cursor-pointer absolute z-[70] top-[105%] rounded-lg px-2 ${focused ? "bg-[#ffffff32]" : ""}`}
        >
          <span className="flex items-center gap-1">
            <IoIosArrowRoundBack size={30} />
            Back
          </span>
        </motion.div>
      )}
      <motion.div
        animate={{ backgroundColor: openDetail ? "#c4fd5f" : "#163bb0" }}
        transition={{ duration: 0.5 }}
        className="w-full h-[280px] bg-[#163bb0] rounded-b-[100%] overflow-hidden relative z-50 flex flex-col items-center"
      >
        <Image src="/images/logo_jwc_2024.png" alt="Logo JWC" width={150} height={150} className="w-[90%] opacity-30 absolute top-[-10%]" />
        <Image src="/images/logo_jwc_2024.png" alt="Logo JWC" width={150} height={150} className="w-[90%] opacity-70 mt-[9%]" />
        <Image src="/images/logo_jwc_2024.png" alt="Logo JWC" width={150} height={150} className="w-[90%]" />
        {!openDetail && <span className="text-4xl mt-4">E-PASSPORT</span>}
      </motion.div>
      <motion.div
        initial={{ top: "-100px" }}
        animate={{ top: openDetail ? "-100px" : "35%" }}
        transition={{ duration: 0.5 }}
        className="w-full h-[333px] bg-[#c4fd5f] absolute z-10 rounded-b-[100%]"
      ></motion.div>
      <motion.div
        initial={{ top: "-120px" }}
        animate={{ top: openDetail ? "-120px" : "75%" }}
        transition={{ duration: 0.5 }}
        className="w-full h-[333px] bg-[#ec64dd] absolute z-[5] rounded-b-[100%]"
      ></motion.div>
    </div>
  );
}
