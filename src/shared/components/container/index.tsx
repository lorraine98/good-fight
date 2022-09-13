interface Props {
  marginX?: number;
  marginY?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Container = ({ marginX = 0, marginY = 1, children, style }: Props) => {
  return (
    <>
      <div className="container" style={style}>
        {children}
      </div>
      <style jsx>{`
        .container {
          margin: ${marginX}rem ${marginY}rem;
        }
      `}</style>
    </>
  );
};

export default Container;
