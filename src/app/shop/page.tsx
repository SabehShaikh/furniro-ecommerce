import Image from "next/image";
import BlowHero from "@/components/BlowHero";
import Services from "@/components/Service";

export default function ShopHero() {
  const productData = [
    {
      id: 1,
      name: "Syltherine",
      image: "/images/syltherine.png",
      price: 2500000,
      originalPrice: 3500000,
      discount: 30,
      isSale: true,
      type: "Stylish cafe chair",
    },
    {
      id: 2,
      name: "Leviosa",
      image: "/images/leviosa.png",
      price: 2500000,
      type: "Stylish cafe chair",
    },
    {
      id: 3,
      name: "Lolito",
      image: "/images/lolito.png",
      price: 7000000,
      originalPrice: 14000000,
      discount: 50,
      isSale: true,
      type: "Luxury big sofa",
    },
    {
      id: 4,
      name: "Respira",
      image: "/images/respira.png",
      price: 500000,
      type: "Outdoor bar table and stool",
      tag: "New",
    },
    {
      id: 5,
      name: "Grifo",
      image: "/images/grifo.png",
      price: 1500000,
      type: "Night lamp",
    },
    {
      id: 6,
      name: "Muggo",
      image: "/images/muggo.png",
      price: 150000,
      type: "Small mug",
      tag: "New",
    },
    {
      id: 7,
      name: "Pingky",
      image: "/images/pingky.png",
      price: 7000000,
      originalPrice: 14000000,
      discount: 50,
      isSale: true,
      type: "Cute bed set",
    },
    {
      id: 8,
      name: "Potty",
      image: "/images/potty.png",
      price: 500000,
      type: "Minimalist flower pot",
      tag: "New",
    },
    {
      id: 9,
      name: "Syltherine",
      image: "/images/syltherine.png",
      price: 2500000,
      originalPrice: 3500000,
      discount: 30,
      isSale: true,
      type: "Stylish cafe chair",
    },
    {
      id: 10,
      name: "Leviosa",
      image: "/images/leviosa.png",
      price: 2500000,
      type: "Stylish cafe chair",
    },
    {
      id: 11,
      name: "Lolito",
      image: "/images/lolito.png",
      price: 7000000,
      originalPrice: 14000000,
      discount: 50,
      isSale: true,
      type: "Luxury big sofa",
    },
    {
      id: 12,
      name: "Respira",
      image: "/images/respira.png",
      price: 500000,
      type: "Outdoor bar table and stool",
      tag: "New",
    },
    {
      id: 13,
      name: "Grifo",
      image: "/images/grifo.png",
      price: 1500000,
      type: "Night lamp",
    },
    {
      id: 14,
      name: "Muggo",
      image: "/images/muggo.png",
      price: 150000,
      type: "Small mug",
      tag: "New",
    },
    {
      id: 15,
      name: "Pingky",
      image: "/images/pingky.png",
      price: 7000000,
      originalPrice: 14000000,
      discount: 50,
      isSale: true,
      type: "Cute bed set",
    },
    {
      id: 16,
      name: "Potty",
      image: "/images/potty.png",
      price: 500000,
      type: "Minimalist flower pot",
      tag: "New",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="shopsect relative h-80 w-full overflow-hidden">
        <Image
          src="/images/shopbg.png"
          alt="Shop Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 text-center flex flex-col items-center justify-center h-full w-full">
          <h3 className="font-medium text-3xl md:text-4xl text-black">Shop</h3>
          <h5 className="text-black mt-2 text-sm md:text-lg">
            <span className="font-semibold">Home</span> &gt; Shop
          </h5>
        </div>
      </div>

      {/* Filters and Sorting */}
      <BlowHero />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-8 py-8">
        {productData.map((product) => (
          <div
            key={product.id}
            className="bg-[#F4F5F7]  rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 group"
          >
            {/* Image Section */}
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={225}
                className="w-full h-64 object-cover"
              />
              {product.isSale && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs">
                  -{product.discount}%
                </span>
              )}
              {product.tag && (
                <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs">
                  {product.tag}
                </span>
              )}
              <button className="absolute inset-x-0 bottom-0 bg-black text-white py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Add to Cart
              </button>
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.type}</p>
              <div className="mt-2">
                {product.isSale ? (
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-gray-900">
                      Rp {product.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400 line-through">
                      Rp {product.originalPrice?.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-bold text-gray-900">
                    Rp {product.price.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center items-center gap-[38px] my-8">
        <button className="px-4 py-2 text-center bg-[#B88E2F] text-white  font-semibold">
          1
        </button>
        <button className="px-4 py-2 text-center bg-[#F9F1E7] text-gray-700  font-semibold">
          2
        </button>
        <button className="px-4 py-2 text-center bg-[#F9F1E7] text-gray-700  font-semibold">
          3
        </button>
        <button className="px-4 py-2 bg-[#F9F1E7] text-gray-700 rounded-md font-semibold">
          Next
        </button>
      </div>

      <Services />
    </>
  );
}
