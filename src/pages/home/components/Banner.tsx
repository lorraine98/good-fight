import Image from "next/image";
import Container from "src/shared/components/container";

const Banner = () => {
  return (
    <>
      <div className="banner">
        <Image
          src="/static/adv.jpg"
          alt="광고"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <style jsx>{`
        .banner {
          position: relative;
          border-radius: 0.375rem;
          width: 100%;
          height: 5rem;
          overflow: hidden;
          margin: 1rem 0;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Banner;
