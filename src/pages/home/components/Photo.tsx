import Image from "next/image";
import Container from "src/shared/components/container";
import RecentFightBox from "./RecentFightBox";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useTheme } from "@mui/system";
import { useState } from "react";
import { fightStatusType } from "src/shared/components/MyFightsStatusIcon";
import Spinner from "src/shared/spinner";

export interface IRecentFightInfo {
  isLoading?: boolean;
  content?: string;
  state?: fightStatusType;
}

const Photo = ({ isLoading, content, state }: IRecentFightInfo) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const theme = useTheme();

  const iconStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
    fontSize: "5rem",
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    setImageSrc(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="photo">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="커플사진"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <form method="post" encType="multipart/form-data">
            <label htmlFor="file-input">
              <ImageSearchIcon sx={{ ...iconStyle }} />
            </label>
            <input
              type="file"
              accept="image/*"
              id="file-input"
              onChange={handleImageChange}
            />
          </form>
        )}
        <Container>
          <div
            className="recent"
            style={isLoading ? { justifyContent: "center" } : {}}
          >
            {isLoading ? (
              <Spinner size={50} />
            ) : (
              <RecentFightBox content={content} state={state} />
            )}
          </div>
        </Container>
      </div>
      <style jsx>{`
        form {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        input {
          visibility: hidden;
        }

        .photo {
          position: relative;
          display: flex;
          height: 21rem;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 0.375rem;
          overflow: hidden;
        }

        .recent {
          position: absolute;
          display: flex;
          bottom: 1rem;
          width: calc(100% - 2rem);
          height: 5rem;
          background-color: ${theme.palette.custom.white};
          border-radius: 0.375rem;
          align-items: center;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Photo;
