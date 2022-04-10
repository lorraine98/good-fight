import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/system";
import { useState } from "react";
import { myFightsProps } from "src/api/post-my-fights-form";
import MyFightsStatusIcon from "src/shared/components/MyFightsStatusIcon";
import Tag from "./Tag";

const ContentBox = ({
  content,
  date,
  feedback,
  keyword,
  reason,
  solved,
  target,
}: myFightsProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="wrapper">
        <div className="upperInfo-wrapper">
          <MyFightsStatusIcon state={solved} size="large" />
          <div className="upperInfo">
            <div className="upperInfo-tags">
              <Tag text={keyword} type="keyword" />
              <Tag text={target} type="target" />
            </div>
            <span>{date}</span>
          </div>
        </div>
        <IconButton
          onClick={handleClick}
          sx={{ position: "absolute", right: 12, top: 16 }}
        >
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem>수정</MenuItem>
          <MenuItem>삭제</MenuItem>
        </Menu>
        <div className="lowerInfo">
          <h1 className="content">{content}</h1>
          <p>{reason}</p>
          <p>{feedback}</p>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          background: ${theme.palette.custom.white};
          border-radius: 0.375rem;
          padding: 1rem 1rem 0.5rem 1rem;
          position: relative;
          margin-bottom: 1rem;
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
