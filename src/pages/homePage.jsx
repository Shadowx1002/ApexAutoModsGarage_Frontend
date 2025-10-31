import Header from "../components/header";
import {
  FaArrowDownLong,
  FaFacebookF,
  FaStar,
  FaTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function HomePage() {
  return (
    <div className="bg-gray-950 text-white">
      <Header />

      {/* SOCIAL BAR */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="flex flex-wrap border-2 items-center justify-center border-[#F77603] my-5 mb-20 py-1 mt-28 w-[90%] md:w-[1350px] border-l-0 border-r-0 gap-3">
          {/* Facebook */}
          <Link to="/" className="hover:text-white text-white px-3 py-1">
            <FaFacebookF />
          </Link>

          {/* Twitter */}
          <Link to="/" className="hover:text-white text-white px-3 py-1">
            <FaTwitter />
          </Link>

          {/* Instagram */}
          <Link to="/" className="hover:text-white text-white px-3 py-1">
            <AiFillInstagram />
          </Link>

          {/* Phone */}
          <Link
            to="/"
            className="items-center flex gap-2 hover:text-white text-white px-3 py-1"
          >
            <FaPhoneAlt />
            <h2 style={{ fontFamily: "Judson" }}>+94 771212121</h2>
          </Link>

          {/* Email */}
          <Link
            to="/"
            className="items-center flex gap-2 hover:text-white text-white px-3 py-1"
          >
            <MdEmail />
            <h2 style={{ fontFamily: "Judson" }}>AUMGarage@gmail.com</h2>
          </Link>
        </div>

        {/* HERO SECTION */}
        <div className="w-[90%] md:w-[1350px] h-[350px] md:h-[500px] bg-[url('car1.jpg')] bg-cover bg-center rounded-3xl border border-[#F77603] flex flex-col justify-center">
          <h1
            style={{ fontFamily: "Kaushan Script" }}
            className="text-3xl md:text-5xl text-[#F77603]"
          >
            Apex Auto Mods Garage
          </h1>
          <h1
  style={{ fontFamily: "Judson" }}
  className="text-xl md:text-3xl text-white text-center mt-2"
>
  <Typewriter
    words={[
      "Welcome to Apex Auto Mods Garage!",
      "We make your car look and feel brand new.",
      "Expert repairs, detailing & modifications.",
      "Your satisfaction is our top priority."
    ]}
    loop={true}
    cursor
    cursorStyle="_"
    typeSpeed={60}
    deleteSpeed={40}
    delaySpeed={1500}
  />
</h1>
          <h1
            style={{ fontFamily: "Kaushan Script" }}
            className="text-xl md:text-3xl text-white mt-24 md:mt-80"
          >
            Your Trusted Garage
          </h1>
        </div>

        <button className="py-4 flex items-center justify-center gap-3">
          Explore More <FaArrowDownLong className="text-[#F77603]" />
        </button>
      </section>

      {/* CAR BRANDS */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="bg-[#151414] w-[90%] md:w-[1350px] h-auto md:h-[500px] rounded-3xl border border-[#F77603] p-5">
          <h1
            style={{ fontFamily: "Judson" }}
            className="text-xl md:text-2xl py-4"
          >
            CAR BRANDS WORLDWIDE
          </h1>

          <div className="w-full flex flex-wrap justify-center gap-5 md:gap-7 py-5">
            <div className="w-[150px] md:w-[250px] h-[150px] md:h-[250px] bg-[url('benz.png')] bg-cover bg-center rounded-3xl"></div>
            <div className="w-[150px] md:w-[250px] h-[150px] md:h-[250px] bg-[url('bmw.png')] bg-cover bg-center rounded-3xl"></div>
            <div className="w-[150px] md:w-[250px] h-[150px] md:h-[250px] bg-[url('porsche.png')] bg-cover bg-center rounded-3xl"></div>
            <div className="w-[150px] md:w-[250px] h-[150px] md:h-[250px] bg-[url('lambo.png')] bg-cover bg-center rounded-3xl"></div>
          </div>

          <h1
            style={{ fontFamily: "Judson" }}
            className="text-sm md:text-xl p-4"
          >
            There are many car brands worldwide, from major manufacturers...
          </h1>
        </div>

        {/* FEEDBACKS */}
        <div className="flex flex-col items-center">
          <h1
            style={{ fontFamily: "Judson" }}
            className="text-lg md:text-xl pt-6"
          >
            FEEDBACKS
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-10 w-[90%] md:w-[1350px]">
            {/* Review Boxes */}
            <div className="w-full md:w-[40%] bg-[#1a1a1a] border border-[#F77603] rounded-2xl p-5 flex gap-4 shadow-lg">
              <div className="w-[120px] md:w-[120px] h-[100px] md:h-[160px] bg-[url('review2.jpeg')] bg-cover bg-center rounded-xl"></div>
              <p
                className="text-white text-xs md:text-sm"
                style={{ fontFamily: "Judson" }}
              >
                <span
                  className="text-xl text-[#F77603]"
                  style={{ fontFamily: "Kaushan Script" }}
                >
                  Mr. Alex
                </span>
                <br />
                Excellent service! Very professional team.
                <div className="flex mt-4 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-[#F77603]" />
                  ))}
                </div>
              </p>
            </div>

            <div className="w-full md:w-[40%] bg-[#1a1a1a] border border-[#F77603] rounded-2xl p-5 flex gap-4 shadow-lg">
              <div className="w-[120px] md:w-[120px] h-[100px] md:h-[160px] bg-[url('review1.jpeg')] bg-cover bg-center rounded-xl"></div>
              <p
                className="text-white text-xs md:text-sm"
                style={{ fontFamily: "Judson" }}
              >
                <span
                  className="text-xl text-[#F77603]"
                  style={{ fontFamily: "Kaushan Script" }}
                >
                  Mr. John
                </span>
                <br />
                Friendly staff, fair pricing. Great work!
                <div className="flex mt-4 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-[#F77603]" />
                  ))}
                </div>
              </p>
            </div>

            {/* See more */}
            <div className="w-full md:w-[20%] bg-[#1a1a1a] border border-[#F77603] rounded-2xl p-5 flex items-center justify-center hover:bg-[#F77603] transition">
              <h1
                className="text-lg md:text-xl"
                style={{ fontFamily: "Kaushan Script" }}
              >
                See More →
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT & SUBSCRIBE */}
      <section
        className="w-full flex items-center justify-center px-5 md:px-10 py-20"
        style={{ fontFamily: "Judson" }}
      >
        <div className="w-full md:w-[1000px] flex flex-col md:flex-row items-center justify-center gap-10 bg-[#101010] rounded-3xl h-auto md:h-[500px] p-5">
          {/* Contact */}
          <div className="bg-[#111] rounded-2xl p-8 w-full">
            <h2 className="text-3xl md:text-4xl text-[#F77603] mb-5">
              Contact Us
            </h2>
            <p className="text-lg mb-3">
              Email: <span className="text-gray-300">AUMGarage@gmail.com</span>
            </p>
            <p className="text-lg mb-3">
              Phone: <span className="text-gray-300">+94 77 121 2121</span>
            </p>
            <p className="text-lg">
              Address: <span className="text-gray-300">Colombo, Sri Lanka</span>
            </p>
          </div>

          {/* Subscribe */}
          <div className="bg-[#111] rounded-2xl p-8 w-full">
            <h2 className="text-3xl md:text-4xl text-[#F77603] mb-3">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-6">
              Sign up for private offers, new mods & tips.
            </p>

            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-700"
              />
              <button className="bg-[#F77603] px-6 py-3 rounded-xl hover:bg-orange-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
