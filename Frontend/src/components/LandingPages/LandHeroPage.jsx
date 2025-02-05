import React from "react";

const HeroImg = "/imgaes/statBg.png";

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
    <div id="home" style={style.container}>
      <h1 className="mb-8 text-center bg-gradient-to-b from-green-500 to-green-400/20 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
        Welcome To StuMate
      </h1>
      <h1 className="mb-8 text-center bg-gradient-to-b from-green-500 to-green-400/20 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
        Your Gateway To Academic Excellence!
      </h1>
      <p className="text-lg text-green-500 mt-4 max-md:text-base max-sm:text-sm">
        "The roots of education are bitter, but the fruit is sweet."
      </p>
      <div className="flex gap-4 mt-6 max-md:flex-col">
        <button className="bg-black text-white border border-yellow-400 px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-gray-500 flex items-center gap-2">
          GET STARTED NOW →
        </button>
        <button className="bg-green-600 text-white px-6 py-3 text-lg rounded-lg shadow-lg hover:bg-green-500 flex items-center gap-2">
          VIEW COURSES →
        </button>
      </div>
    </div>
  );
};

export default LandingHeroPage;
