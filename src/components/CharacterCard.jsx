import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { typeColors } from "../components/TypeColors";

const CharacterCard = ({ url }) => {
  const [character, setCharacters] = useState({});

  useEffect(() => {
    axios.get(url).then((res) => setCharacters(res.data));
  }, []);

  return (
    <div
      className={`card mt-8 w-[277px] h-max border-8 rounded-2xl hover:scale-110 duration-300 ${
        typeColors[character.types?.[0].type.name]?.border
      }`}
    >
      <Link to={`/characters/${character.id}`}>
        <div
          className={`w-[261px] h-[128px] flex justify-center items-center relative rounded-t-md ${
            typeColors[character.types?.[0].type.name]?.background
          }`}
        >
          <img
            src={character.sprites?.other.dream_world.front_default}
            alt=""
            className="w-[143px] h-[150px] mt-16"
          />
        </div>
        <div className={`px-2`}>
          <div className={`text-center mt-12 pb-4 border-b`}>
            <h1
              className={`capitalize text-2xl font-semibold ${
                typeColors[character.types?.[0].type.name]?.text
              }`}
            >
              {character.name}
            </h1>
            <h2 className="capitalize text-sm">
              {character.types?.map((type, index) => (
                <span key={type.type.name}>
                  {index > 0 && " / "}
                  {type.type.name}
                </span>
              ))}
            </h2>

            <p className="text-xs text-textGrey">Type</p>
          </div>
          <div
            className={`py-3 grid grid-cols-2 gap-4 place-content-around text-center`}
          >
            <div className="">
              <p className="text-xs text-textGrey">HP</p>
              <p
                className={`text-base font-semibold ${
                  typeColors[character.types?.[0].type.name]?.text
                }`}
              >
                {character.stats?.[0].base_stat}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-textGrey">ATTACK</p>
              <p
                className={`text-base font-semibold ${
                  typeColors[character.types?.[0].type.name]?.text
                }`}
              >
                {character.stats?.[1].base_stat}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-textGrey">DEFENSE</p>
              <p
                className={`text-base font-semibold ${
                  typeColors[character.types?.[0].type.name]?.text
                }`}
              >
                {character.stats?.[2].base_stat}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-textGrey">SPEED</p>
              <p
                className={`text-base font-semibold ${
                  typeColors[character.types?.[0].type.name]?.text
                }`}
              >
                {character.stats?.[5].base_stat}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CharacterCard;
