import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { SwipeableDrawer } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { useNextDom } from "src/shared/hooks/useRootDom";

interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: ReactElement;
}

const BottomSheet = ({ open, onClose, onOpen, children }: Props) => {
  const rootDom = useNextDom();

  const drawerBleeding = 24;
  const swipeableDrawerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    "& .MuiPaper-root": {
      height: `calc(50% - ${drawerBleeding}px)`,
      overflow: "visible",
      borderTopLeftRadius: "16px",
      borderTopRightRadius: "16px",
      maxWidth: "30rem",
      position: "static",
    },
  };

  return (
    <>
      <SwipeableDrawer
        sx={{ ...swipeableDrawerStyle }}
        container={rootDom}
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className="inner">{children}</div>
      </SwipeableDrawer>
      <style jsx>{`
        .inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 12px;
        }
      `}</style>
    </>
  );
};

export default BottomSheet;
