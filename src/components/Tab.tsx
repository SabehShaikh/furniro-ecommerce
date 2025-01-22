"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";

const Tab = () => {
  const [activeTab, setActiveTab] = useState("Description");
  return (
    <div>
      {/* extra taps */}
      <section className="mt-12 pb-10 border-b">
        <div className="flex flex-col md:flex-row justify-center md:space-x-8 space-y-4 md:space-y-0 overflow-x-auto">
          {["Description", "Additional Information", "Reviews [4]"].map(
            (tab, index) => (
              <p
                key={index}
                className={`text-lg md:text-2xl pb-2 whitespace-nowrap cursor-pointer 
                ${activeTab === tab ? "text-black font-semibold" : "text-[#9F9F9F]"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </p>
            )
          )}
        </div>

        <div className="max-w-4xl mx-auto mt-8 space-y-4">
          {activeTab === "Description" && (
            <>
              <p className="text-[#9F9F9F] text-center text-base leading-relaxed">
                Embodying the raw, wayward spirit of rock 'n' roll, the Kilburn
                portable active stereo speaker takes the unmistakable look and
                sound of Marshall, unplugs the chords, and takes the show on the
                road.
              </p>
              <p className="text-[#9F9F9F] text-center text-base leading-relaxed">
                Weighing in under 7 pounds, the Kilburn is a lightweight piece
                of vintage-styled engineering. Setting the bar as one of the
                loudest speakers in its class, the Kilburn is a compact,
                stout-hearted hero with a well-balanced audio which boasts a
                clear midrange and extended highs for a sound that is both
                articulate and pronounced.
              </p>
            </>
          )}

          {activeTab === "Additional Information" && (
            <>
              <p className="text-[#9F9F9F] text-center text-base leading-relaxed">
                The ComfortCloud sofa features a modular design, allowing you to
                arrange the sections according to your space and preference. It
                is available in a variety of colors and fabrics, including
                velvet, linen, and leather.
              </p>
              <p className="text-[#9F9F9F] text-center text-base leading-relaxed">
                The sofa is equipped with high-density foam cushions that
                provide both softness and support. It also comes with removable,
                machine-washable cushion covers for easy maintenance.
              </p>
            </>
          )}

          {activeTab === "Reviews [4]" && (
            <>
              <div className="space-y-4">
                {[
                  {
                    name: "John Doe",
                    review:
                      "This sofa is a game-changer! So comfortable and stylish.",
                  },
                  {
                    name: "Alex Johnson",
                    review:
                      "The fabric is soft, and the cushions provide great support.",
                  },
                  {
                    name: "Emily Davis",
                    review: "Perfect for long movie nights. Highly recommend!",
                  },
                  {
                    name: "Chris Brown",
                    review:
                      "The quality is excellent, and the design is very modern.",
                  },
                ].map((review, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 border rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m9 0v9a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V9m15 0H4.5m15 0L12 3m0 0L4.5 9"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-[#9F9F9F] text-sm">{review.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {["descriptionImg1.png", "descriptionImg2.png"].map((img, index) => (
            <Image
              key={index}
              src={`/images/${img}`}
              alt={`Description Image ${index + 1}`}
              width={600}
              height={400}
              className="rounded-[8px] object-cover w-full"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tab;
