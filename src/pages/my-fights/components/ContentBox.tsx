import { MoreVert } from "@mui/icons-material";
import { useTheme } from "@mui/system";
import MyFightsStatusIcon from "src/shared/components/MyFightsStatusIcon";
import Tag from "./Tag";

const ContentBox = () => {
  const theme = useTheme();

  return (
    <>
      <div className="wrapper">
        <div className="upperInfo-wrapper">
          <MyFightsStatusIcon state="solved" size="large" />
          <div className="upperInfo">
            <div className="upperInfo-tags">
              <Tag text="설거지" type="keyword" />
              <Tag text="아무개" type="target" />
            </div>
            <span>2022.02.08</span>
          </div>
        </div>
        <MoreVert sx={{ position: "absolute", right: 12, top: 16 }} />
        <div className="lowerInfo">
          <h1 className="content">설거지를 제때 안함</h1>
          <p>설거지를 제때 해야 벌레가 안생김</p>
          <p>정해진 날짜에 맞춰 설거지 꼭 하자!</p>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          background: ${theme.palette.white};
          border-radius: 0.375rem;
          padding: 1rem 1rem 0.5rem 1rem;
          position: relative;
        }
        .upperInfo-wrapper {
          display: flex;
          margin-bottom: 1rem;
        }
        .upperInfo {
          margin: 0.8rem 1.6rem;
        }
        .upperInfo-tags {
          margin-bottom: 1rem;
        }
        .lowerInfo > * {
          margin-bottom: 0.8rem;
        }
        .content {
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default ContentBox;