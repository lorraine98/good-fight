import Image from "next/image";

const Ad = () => {
  return (
    <>
      <div className="ad">
        <Image
          src="/static/adv.jpg"
          alt="광고"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
      <style jsx>{`
        .ad {
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

export default Ad;
