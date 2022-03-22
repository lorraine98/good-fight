interface Props {
  marginX?: number;
  marginY?: number;
  children?: React.ReactNode;
}

const Container = ({ marginX = 0, marginY = 1, children }: Props) => {
  return (
    <>
      <div className="container">{children}</div>
      <style jsx>{`
        .container {
          margin: ${marginX}rem ${marginY}rem;
        }
      `}</style>
    </>
  );
};

export default Container;
