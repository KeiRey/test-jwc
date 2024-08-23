"use client";

import React from "react";
import { CardTypes } from "@/utils/types/CardTypes";
import { init, setKeyMap } from "@noriginmedia/norigin-spatial-navigation";
import Banner from "./Banner";
import DetailSection from "./DetailSection";
import MainContent from "./MainContent";

type Props = {};

export default function HomePage({}: Props) {
  init({
    debug: false,
    visualDebug: false,
  });
  setKeyMap({
    left: [37, 205, 214],
    up: [38, 203, 211],
    right: [39, 206, 213],
    down: [40, 204, 212],
    enter: [13, 195],
    back: [461, 10009],
  });

  const [openDetail, setOpenDetail] = React.useState(false);
  const [cardData, setCardData] = React.useState<CardTypes>({
    id: 0,
    title: "Card 0",
    description: "Description 0",
  });

  const onAssetPress = React.useCallback((asset: any) => {
    setCardData((prev) => ({
      id: asset.id,
      title: asset.title,
      description: asset.description,
    }));
    setOpenDetail(true);
  }, []);

  const handleBack = () => {
    setOpenDetail(false);
    setCardData({
      id: 0,
      title: "Card 0",
      description: "Description 0",
    });
  };

  return (
    <div className="w-full flex items-center h-screen justify-center md:py-4 ">
      <div className="max-w-[400px] bg-[#163bb0] h-full w-full md:rounded-lg overflow-hidden relative">
        <Banner setOpenDetail={setOpenDetail} openDetail={openDetail} handleBack={handleBack} />
        <div className="w-full h-full relative z-[100]">
          {!openDetail && <MainContent onAssetPress={onAssetPress} />}
          {openDetail && <DetailSection cardData={cardData} onAssetPress={onAssetPress} />}
        </div>
      </div>
    </div>
  );
}
