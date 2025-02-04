import React from "react";

const HeroImg = "/imgaes/statBg.jpg";

const LandingHeroPage = () => {
  const style = {
    container: {
      backgroundImage: `url(${HeroImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "2rem",
    },
  };

  return (
    <div id='home' style={style.container}>
      <h3 className='text-5xl font-extrabold text-sky-600 max-md:text-4xl max-sm:text-2xl'>
        WELCOME TO STUMATE
      </h3>
      <h2 className='text-6xl font-bold text-orange-600 mt-4 max-md:text-5xl max-sm:text-3xl'>
        Your Gateway To Academic Excellence!
      </h2>
      <p className='text-lg text-cyan-500 mt-4 max-md:text-base max-sm:text-sm'>
        "The roots of education are bitter, but the fruit is sweet."
      </p>
      <div className='flex gap-4 mt-6 max-md:flex-col'>
        <button className='bg-black text-white border border-yellow-400 px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-gray-800 flex items-center gap-2'>
          GET STARTED NOW →
        </button>
        <button className='bg-yellow-400 text-black px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-yellow-500 flex items-center gap-2'>
          VIEW COURSES →
        </button>
      </div>
    </div>
  );
};

export default LandingHeroPage;
