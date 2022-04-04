import { useTheme } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import styled from "@emotion/styled";

const StyledP = styled.p<{ color: string }>`
  color: ${({ color }) => color};
  margin: 0 0.3rem;
`;

const OrderBy = () => {
  const theme = useTheme();
  const [latestSelected, setLatestSelected] = useState(true);
  const [popularitySelected, setPopularitySelected] = useState(false);

  const iconDefaultStyle = {
    fontSize: "1rem",
    stroke: "black",
    strokeWidth: "2",
  };

  const iconUnselectedStyle = {
    ...iconDefaultStyle,
    stroke: `${theme.palette.gray}`,
  };

  const iconSelectedStyle = {
    ...iconDefaultStyle,
    stroke: "#27c255",
  };

  const handleClickLatestButton = () => {
    if (!latestSelected) {
      setLatestSelected(true);
      setPopularitySelected(false);
    }
  };

  const handleClickPopularityButton = () => {
    if (!popularitySelected) {
      setPopularitySelected(true);
      setLatestSelected(false);
    }
  };

  return (
    <>
      <div className="bar">
        <div className="category">
          <div className="latest" onClick={handleClickLatestButton}>
            {latestSelected ? (
              <CheckIcon sx={{ ...iconSelectedStyle }} />
            ) : (
              <CheckIcon sx={{ ...iconUnselectedStyle }} />
            )}
            <StyledP color={latestSelected ? "black" : `${theme.palette.gray}`}>
              최신순
            </StyledP>
          </div>
          <div className="popularity" onClick={handleClickPopularityButton}>
            {popularitySelected ? (
              <CheckIcon sx={{ ...iconSelectedStyle }} />
            ) : (
              <CheckIcon sx={{ ...iconUnselectedStyle }} />
            )}
            <StyledP
              color={popularitySelected ? "black" : `${theme.palette.gray}`}
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
          background-color: ${theme.palette.white};
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

export default OrderBy;
