import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeName } from "../store/slices/name.slice";
import Logo from "../assets/img/image 11.png";

const InputName = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enterName = () => {
    dispatch(changeName(userName));
    navigate("/characters")
  }

  return (
    <div className="InputNameContainer h-screen flex justify-center items-center ">
      <div className="pb-28 mx-auto text-center">
        <img src={Logo} alt="React Logo" className="w-[338px] h-[60px] sm:w-[676px] sm:h-[121px]" />
        <h1 className="mt-14 mb-2 text-3xl sm:text-5xl font-bold text-textRed">
          Hello trainer!
        </h1>
        <p className="text-lg sm:text-2xl font-semibold text-textBlack">
          To be able to continue, register your name
        </p>
        <div className="my-12 flex shadow-lg">
          <input
            className="inputName w-[232px] h-8 sm:w-full xl:w-[464px] sm:h-16 p-4 sm:text-lg bg-white"
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
              setError("");
            }}
            placeholder="Your name"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                enterName(); // Llama a la función enterName() cuando se presione Enter
              }
            }}
            value={userName}
          />
          <button
            className="buttonName w-28 h-8 sm:w-52 xl:w-52 sm:h-16 sm:text-lg bg-button text-white hover:scale-110 duration-300 "
            onClick={enterName}
          >
            Enter
          </button>
        </div>
      </div>
      {/*====================  footer =======================*/}
      <div className="fixed bottom-0 left-0 w-full h-14 sm:h-28 xl:h-40 z-0 bg-rectangleRed">
        <div className="fixed bottom-0 left-0 w-full h-6 sm:h-12 xl:h-16 bg-rectangleBlack"></div>
      </div>
      <div className="w-10 h-10 sm:w-20 sm:h-20 xl:w-28 xl:h-28 border-[6px] sm:border-[12px] rounded-full fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10 border-rectangleBlack bg-white">
        <div className="w-5 h-5 sm:w-10 sm:h-10 xl:w-16 xl:h-16 border-[6px] sm:border-[12px] rounded-full z-20 border-rectangleBlack bg-ellipse absolute inset-0 m-auto hover:scale-110 duration-300 "></div>
      </div>
    </div>
  );
};

export default InputName;
