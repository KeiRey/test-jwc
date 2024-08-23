import { FocusableComponentLayout, FocusContext, FocusDetails, KeyPressDetails, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";

type Props = {
  onAssetPress: (props: object, details: KeyPressDetails) => void;
};

export default function MainContent({ onAssetPress }: Props) {
  const { ref, focusKey, focusSelf } = useFocusable({
    focusKey: "HOME",
    focusable: true,
    focusBoundaryDirections : ['down', 'up', 'left', 'right'],
    isFocusBoundary : true,
  });

  const onRowFocus = React.useCallback(
    ({ y }: { y: any }) => {
      console.log(y);
      if (ref.current) {
        ref.current.scrollTop = y - 10;
        ref.current.style.scrollBehavior = "smooth";
      }
    },
    [ref]
  );

  React.useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="grid grid-cols-3 p-1 no-scrollbar h-full overflow-auto gap-3 pb-12 px-3 my-6 ">
        {Array(50)
          .fill(0)
          .map((_, index) => (
            <Card onAssetPress={onAssetPress} onFocus={onRowFocus} title={`Card ${index}`} id={index} description={``} key={index} />
          ))}
      </div>
    </FocusContext.Provider>
  );
}
