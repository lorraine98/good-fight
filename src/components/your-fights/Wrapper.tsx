import React from "react";

type Props = {
  style?: object;
  children?: React.ReactNode;
};

const Wrapper = ({ style, children }: Props) => {
  return (
    <>
      <div className="wrapper" style={style}>
        {children}
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};

export default Wrapper;
