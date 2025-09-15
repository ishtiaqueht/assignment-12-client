import React from "react";
import { Link } from "react-router"; 
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  {
    title: "Empower Your Learning with EduPulse",
    description: "Discover sessions, connect with peers & grow academically.",
    image: "https://i.ibb.co/9H9wj1b0/learn.jpg",
    link: "/studySessions",
  },
  {
    title: "Join Interactive Study Sessions",
    description: "Participate in engaging and collaborative study experiences.",
    image:
      "https://images.unsplash.com/photo-1721702754494-fdd7189f946c?w=600&auto=format&fit=crop&q=60",
    link: "/studySessions",
  },
  {
    title: "Connect with Expert Tutors",
    description: "Get guidance from professionals and improve your skills.",
    image:
      "https://images.unsplash.com/photo-1588873281272-14886ba1f737?w=600&auto=format&fit=crop&q=60",
    link: "/studySessions",
  },
];

const Banner = () => {
  return (
    <div className="w-full mt-6">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        emulateTouch
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-md md:text-lg lg:text-xl mb-6 drop-shadow-md">
                {slide.description}
              </p>

              <Link
                to={slide.link}
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
              >
                Explore Study Sessions
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
