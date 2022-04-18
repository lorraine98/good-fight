import { useTheme } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import styled from "@emotion/styled";

interface Props {
  selected: string;
  onClickLatestButton: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClickPopularityButton: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const StyledP = styled.p<{ color: string }>`
  color: ${({ color }) => color};
  margin: 0 0.3rem;
`;

const OrderByHeader = ({
  selected,
  onClickLatestButton,
  onClickPopularityButton,
}: Props) => {
  const theme = useTheme();

  const iconDefaultStyle = {
    fontSize: "1rem",
    stroke: "black",
    strokeWidth: "2",
  };

  const iconUnselectedStyle = {
    ...iconDefaultStyle,
    stroke: `${theme.palette.custom.gray}`,
  };

  const iconSelectedStyle = {
    ...iconDefaultStyle,
    stroke: "#27c255",
  };

  return (
    <>
      <div className="bar">
        <div className="category">
          <div className="latest" onClick={onClickLatestButton}>
            {selected === "latest" ? (
              <CheckIcon sx={{ ...iconSelectedStyle }} />
            ) : (
              <CheckIcon sx={{ ...iconUnselectedStyle }} />
            )}
            <StyledP
              color={
                selected === "latest" ? "black" : `${theme.palette.custom.gray}`
              }
            >
              최신순
            </StyledP>
          </div>
          <div className="popularity" onClick={onClickPopularityButton}>
            {selected === "popularity" ? (
              <CheckIcon sx={{ ...iconSelectedStyle }} />
            ) : (
              <CheckIcon sx={{ ...iconUnselectedStyle }} />
            )}
            <StyledP
              color={
                selected === "popularity"
                  ? "black"
                  : `${theme.palette.custom.gray}`
              }
            >
              인기순
            </StyledP>
          </div>
        </div>
      </div>
      <style jsx>{`
        .bar {
          display: flex;
          width: 100%;
          height: 2.5rem;
          background-color: ${theme.palette.custom.white};
          margin-top: 0.2rem;
          padding: 0 1rem;
          box-shadow: 0 1px 3px rgba(57, 63, 72, 0.1);
        }

        .category {
          display: flex;
          align-items: center;
        }

        .category > div {
          display: flex;
          align-items: center;
          margin: 0 0.2rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default OrderByHeader;
