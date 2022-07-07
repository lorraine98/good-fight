import { Global } from "@emotion/react";
import { SwipeableDrawer } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const BottomSheet = ({ open, onClose, onOpen }: Props) => {
  const [container, setContainer] = useState<HTMLElement | null>();
  const drawerBleeding = 24;

  useEffect(() => {
    setContainer(document.getElementById("__next"));
  }, []);

  return (
    <>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            left: "calc(50% - 240px)",
            overflow: "visible",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxWidth: "30rem",
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        swipeAreaWidth={56}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      />
    </>
  );
};

export default BottomSheet;
