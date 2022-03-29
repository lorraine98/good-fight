interface Props {
  title: string;
}

const Board = ({ title }: Props) => {
  return (
    <>
      <div className="board">
        <div className="board__header">
          <p className="title">{title}</p>
          <div className="more__btn">더보기 &gt;</div>
        </div>
      </div>
      <style jsx>{`
        .board {
          display: flex;
          flex-direction: column;
          border-radius: 0.375rem;
          background-color: white;
          height: 13rem;
          margin: 1rem 0;
          padding: 1rem;
          box-sizing: border-box;
        }

        .board__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .title {
          font-weight: bold;
          font-size: 1.3rem;
        }

        .more__btn {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Board;
