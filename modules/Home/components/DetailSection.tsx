import React from "react";
import { motion } from "framer-motion";
import { CardTypes } from "@/utils/types/CardTypes";
import { FocusableComponentLayout, FocusDetails, KeyPressDetails, useFocusable } from "@noriginmedia/norigin-spatial-navigation";

type Props = {
  cardData: CardTypes;
  onAssetPress: (props: object, details: KeyPressDetails) => void;
};

export default function DetailSection({ cardData, onAssetPress }: Props) {
  const [tabActive, setTabActive] = React.useState("detail");
  const TABS = [
    {
      label: "Detail",
      value: "detail",
    },
    {
      label: "Synopsis",
      value: "synopsis",
    },
  ];

  const onRowFocus = React.useCallback(({ node }: { node: any }) => {
    setTabActive(node.id);
  }, []);

  return (
    <div className="flex flex-col w-full px-3 items-center relative z-[60] gap-6 top-[-80px]">
      <motion.div
        initial={{ opacity: 0, filter: "blur(0.5)" }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`bg-[#000] h-[170px] w-[140px] rounded-md`}
      ></motion.div>
      <span className="font-bold text-lg">{cardData?.title}</span>
      <div className="flex flex-col w-full">
        <div className="grid grid-cols-2 border-b-2 border-white">
          {TABS.map((dt, i) => (
            <TabDetail onFocus={onRowFocus} {...dt} key={i} />
          ))}
        </div>
        {tabActive === "detail" ? (
          <motion.div initial={{ opacity: 0, filter: "blur(0.5)" }} animate={{ opacity: 1 }} className=" w-full flex flex-col py-3 gap-2">
            <div className="flex items-start text-pretty">
              <span className="w-[30%] text-[#B4FF36]">Genre</span>
              <span className="w-[70%]">Drama, Horror</span>
            </div>
            <div className="flex items-start text-pretty">
              <span className="w-[30%] text-[#B4FF36]">Director</span>
              <span className="w-[70%]">Coralie Fargeat</span>
            </div>
            <div className="flex items-start text-pretty">
              <span className="w-[30%] text-[#B4FF36]">Cast</span>
              <span className="w-[70%]">Demi Moore, Dennis Quaid, Margaret Qualley</span>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, filter: "blur(0.5)" }} animate={{ opacity: 1 }} className=" w-full py-3">
            Seorang selebriti yang mulai memudar pamornya memutuskan untuk menggunakan obat pasar gelap berupa zat pereplikasi sel yang untuk
            sementara waktu menciptakan versi dirinya yang lebih muda dan lebih baik.
          </motion.div>
        )}
      </div>
    </div>
  );
}

type TabDetailProps = {
  label: string;
  value: string;
  onFocus?: (layout: FocusableComponentLayout, props: object, details: FocusDetails) => void;
};

const TabDetail = ({ label, value, onFocus }: TabDetailProps) => {
  const { ref, focused } = useFocusable({
    focusKey: `TAB_DETAIL_${value.toUpperCase()}`,
    onEnterPress: () => {},
    onFocus,
    extraProps: {
      label,
      value,
    },
  });
  return (
    <span id={value} ref={ref} className={`w-full text-center py-2 rounded-t-lg ${focused ? "bg-[#ffffff32]" : "bg-transparent"}`}>
      {label}
    </span>
  );
};
