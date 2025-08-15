import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import Swiper navigation module

import { useRouter } from "next/navigation";
import moment from "moment-timezone";
import { Navigation } from "swiper/modules";


import NavigationButton from "./NavigationButton";

const CardSwiper = ({ xs_slidesPerView = 2.5, events, title, height }: any) => {
  const router = useRouter();
 
  return (
    <div className="md:px-28 xs:px-3">
      <Swiper
        modules={[Navigation]}
        breakpoints={{
          // when window width is <= 640px
          350: {
            slidesPerView: xs_slidesPerView,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          // when window width is <= 768px
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          // when window width is <= 1024px
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        }}
        className="mySwiper"
        pagination={{ clickable: false }}
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        }}
      >
        {events
          ?.filter((fil: any) => fil.isActive === true)
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ) // Sort by latest event date
          .map((data: any, index: any) => (
            <SwiperSlide key={index}>
              <div
                onClick={() =>  router.push(`/home/shows/${data.id}`)}
                className="relative rounded-md px-1 py-4 cursor-pointer hover:scale-105 
        transition-transform duration-300 ease-in-out"
                style={{ cursor: "pointer" }}
              >
                {title === "Trending" && (
                  <img
                    className="w-8 absolute top-7 right-4"
                    src="/assets/trending.png"
                    alt=""
                  />
                )}
                <img
                  style={{
                    cursor: "pointer",
                    borderRadius: "15px",
                    objectFit: "cover",
                    width: "100%",
                    height: height,
                  }}
                  src={data.cover}
                  alt=""
                />

                <h2 className={`text-lg font-bold mt-4 mb-1`}>
                  {data.titleInEnglish}
                </h2>

                <p>{data.tagsInEnglish}</p>

                <p className="text-light_grey">
                  Starting:{" "}
                  {`${moment
                    .utc(data?.eventDate)
                    .locale("en")
                    .format("D")} ${moment
                    .utc(data?.eventDate)
                    .locale("en")
                    .format("MMMM")} ${moment
                    .utc(data?.eventDate)
                    .locale("en")
                    .format("yyyy")} (${moment
                    .utc(data?.eventDate)
                    .locale("en")
                    .format("dddd")})`}
                </p>
              </div>
            </SwiperSlide>
          ))}

        <div className="flex justify-center mt-4 space-x-4">
          <NavigationButton
            direction="prev"
          />
          <NavigationButton
            direction="next"
          />
        </div>
      </Swiper>
    </div>
  );
};

export default CardSwiper;
