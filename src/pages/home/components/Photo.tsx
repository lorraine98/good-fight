import Image from "next/image";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useState } from "react";
import { postImageToStorage, postImageUrlWithUID } from "src/api/home";

const Photo = () => {
  const [imageSrc, setImageSrc] = useState<string>("");

  const iconStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "5rem",
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    postImageToStorage(file);
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
              <input
                type="file"
                accept="image/*"
                id="file-input"
                onChange={handleImageChange}
              />
            </label>
          </form>
        )}
      </div>
      <style jsx>{`
        form {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        input {
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        .photo {
          position: relative;
          display: flex;
          height: 21rem;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 0.375rem;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Photo;
