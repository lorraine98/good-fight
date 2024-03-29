import { useTheme } from "@mui/system";
import { CSSProperties } from "react";

interface Props {
  text: string;
  type: string;
  style?: CSSProperties;
}

const Tag = ({ text, type, style }: Props) => {
  const theme = useTheme();

  const getBorderColor = () => {
    switch (type) {
      case "keyword":
        return `${theme.palette.custom.brown}`;
      case "target":
        return `${theme.palette.custom.softBrown}`;
    }
  };

  return (
    <>
      <span className="text" style={{ ...style }}>
        {text}
      </span>

      <style jsx>{`
        .text {
          padding: 0.25rem 0.75rem;
          border: 1px solid ${getBorderColor()};
          border-radius: 0.375rem;
          font-weight: 600;
          margin-right: 1rem;
        }
      `}</style>
    </>
  );
};

export default Tag;
