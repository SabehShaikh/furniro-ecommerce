import Image from "next/image";

const GalleryComponent = () => {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="font-poppins font-bold text-[14px] sm:text-[17px] lg:text-[20px] text-[#616161]">
          Share your setup with
        </span>
        <h1 className="font-poppins font-extrabold text-[28px] sm:text-[32px] lg:text-[40px] text-[#3A3A3A]">
          #FuniroFurniture
        </h1>
      </div>

      {/* 2-Column Grid for Images */}
      <div className="grid grid-cols-2 gap-4 lg:gap-2">
        <div>
          <Image
            src="/images/funiro1.png"
            alt="Furniture setup 1"
            layout="responsive"
            width={382}
            height={274}
            className="rounded-lg"
          />
        </div>
        <div>
          <Image
            src="/images/funiro2.png"
            alt="Furniture setup 2"
            layout="responsive"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div>
          <Image
            src="/images/funiro3.png"
            alt="Furniture setup 3"
            layout="responsive"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div>
          <Image
            src="/images/funiro4.png"
            alt="Furniture setup 4"
            layout="responsive"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div>
          <Image
            src="/images/funiro5.png"
            alt="Furniture setup 5"
            layout="responsive"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div>
          <Image
            src="/images/funiro6.png"
            alt="Furniture setup 6"
            layout="responsive"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div>
          <Image
            src="/images/funiro7.png"
            alt="Furniture setup 7"
            layout="responsive"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div>
          <Image
            src="/images/funiro8.png"
            alt="Furniture setup 8"
            layout="responsive"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div>
          <Image
            src="/images/funiro9.png"
            alt="Furniture setup 9"
            layout="responsive"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryComponent;
