import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/img/image 12.png";
import vector from "../assets/img/Vector 1.png";
import vector2 from "../assets/img/Vector 2.png";
import pokedex from "../assets/img/pokedex.png";
import { typeColors } from "../components/TypeColors";
import { Link } from "react-router-dom";

const CharacterDetail = () => {
  const [character, setCharacter] = useState({});
  const [moves, setMoves] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(async (res) => {
        const movesUrl = res.data.moves.map((move) => move.move.url);

        const movesRequests = movesUrl.map((url) =>
          axios.get(url).then((response) => response.data)
        );

        try {
          const movesData = await Promise.all(movesRequests);

          const moveNames = movesData.map(
            (move) =>
              move.names.find((name) => name.language.name === "en").name
          );

          setMoves(moveNames);
        } catch (moveErr) {
          setError("Error al obtener los movimientos del Pokémon.");
          console.error(moveErr);
        }
        setCharacter(res.data);
      })
      .catch((err) => {
        setError("Error al obtener los datos del Pokémon.");
        console.error(err);
      });
  }, [id]);
  return (
    <div className="pokedexBackgroud">
      {/*===========================================================================      Head         ======================================================*/}
      <div className="w-full h-11 sm:h-14 md:h-16 xl:h-24 bg-rectangleRed relative">
        <div className="container mx-auto h-full relative">
          <Link to="/characters">
            <img
              src={Logo}
              alt="Pokedex Logo"
              className="ww-[215px] h-[38px] sm:w-[258px] sm:h-[47px] md:w-[323px] md:h-[57px] xl:w-[431px] xl:h-[76px] sm:ml-10 absolute bottom-[-5px] left-0 cursor-pointer"
            />
          </Link>
          <div className="ellipse sm:mr-2 md:mr-0 absolute bottom-[-30px] sm:bottom-[-42px] md:bottom-[-48px] xl:bottom-[-60px] right-0 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 xl:w-20 xl:h-20 border-[6px] sm:border-[8px] md:border-[9px] xl:border-[12px] rounded-full z-10 border-rectangleBlack bg-white flex justify-center items-center">
            <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 xl:w-10 xl:h-10 border-[6px] sm:border-[8px] md:border-[9px] xl:border-[12px] rounded-full z-20 border-rectangleBlack bg-ellipse hover:scale-110 duration-300"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-5 sm:h-6 md:h-8 xl:h-10 bg-rectangleBlack z-0"></div>
      {/*===========================================================================      Body         ======================================================*/}

      <div className="container mx-auto sm:px-5 2xl:px-0 flex flex-col justify-center items-center ">
        {/*=================================================          Card 1       ============================================*/}
        <div className="mt-32 p-1 lg:mt-40 rounded-md w-full lg:w-[1116px] lg:h-[1272px] shadow-2xl">
          <div
            className={`w-full h-[138px] lg:h-[185px] mx-auto flex justify-center items-center relative rounded-t-md ${
              typeColors[character.types?.[0].type.name]?.background
            }`}
          >
            <img
              src={character.sprites?.other["official-artwork"].front_default}
              alt=""
              className="w-[278px] h-[235px] lg:w-[341px] lg:h-[314px] mb-24 lg:mb-32"
            />
          </div>
          <div className="mx-4 lg:mx-28 my-8 lg:mt-12">
            <div
              className={`mx-auto px-2 w-max h-max border rounded text-center text-2xl md:text-3xl lg:text-4xl font-semibold ${
                typeColors[character.types?.[0].type.name]?.text
              }`}
            >
              <h1>#{character.id}</h1>
            </div>
            <div
              className={`mx-auto mt-5 capitalize text-center text-2xl md:text-4xl lg:text-5xl h-max flex lg:items-center lg:justify-center ${
                typeColors[character.types?.[0].type.name]?.text
              }`}
            >
              <div className="grid place-items-center">
                {/* Imagen izquierda */}
                <img src={vector} alt="" className="flex-1 hidden sm:block" />
              </div>
              <div className="sm:mx-6 shrink-0 pb-1 font-semibold w-full sm:w-auto">
                <h1>{character.name}</h1>
              </div>
              <div className="grid place-items-center">
                {/* Imagen derecha */}
                <img src={vector} alt="" className="flex-1 hidden sm:block" />
              </div>
            </div>

            <div className="mx-auto mt-6 text-center flex justify-center items-center gap-20">
              <div className="w-max h-max">
                <p className="text-base">Weight</p>
                <h2 className="text-lg sm:text-2xl font-semibold">
                  {character?.weight}
                </h2>
              </div>
              <div className="w-max h-max">
                <p className="text-base">Height</p>
                <h2 className="text-lg sm:text-2xl font-semibold">
                  {character?.height}
                </h2>
              </div>
            </div>
            <div className="mx-auto sm:mt-10 text-center sm:flex justify-center items-center gap-8 ">
              <div className="mt-8 sm:mt-0 w-full sm:w-[435px]">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Type</h2>
                <div className="mt-6 sm:mt-10 flex text-lg md:text-xl lg:text-2xl capitalize font-semibold text-white gap-8">
                  {character.types?.[0] && (
                    <div
                      className={`w-1/2 h-[47px] rounded flex items-center justify-center ${
                        typeColors[character.types[0]?.type.name]?.bg
                      }`}
                    >
                      <p>{character.types[0]?.type.name}</p>
                    </div>
                  )}
                  {character.types?.[1] && (
                    <div
                      className={`w-1/2 h-[47px] rounded flex items-center justify-center ${
                        typeColors[character.types[1]?.type.name]?.bg
                      }`}
                    >
                      <p>{character.types[1]?.type.name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 sm:mt-0 w-full sm:w-[435px]">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Abilities</h2>
                <div className="mt-6 sm:mt-10 flex text-lg md:text-xl lg:text-2xl capitalize font-semibold gap-8">
                  <div className="w-1/2 h-[47px] border rounded flex items-center justify-center">
                    <p>{character.abilities?.[0]?.ability?.name}</p>
                  </div>
                  <div className="w-1/2 h-[47px] border rounded flex items-center justify-center">
                    <p>{character.abilities?.[1]?.ability?.name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-24 text-3xl md:text-4xl lg:text-5xl font-semibold flex">
              <div className="mt-2 lg:mt-4 flex-none">
                <h1 className="mr-4 lg:mr-10 md:pt-2 lg:pt-0 ">Stats</h1>
              </div>
              <div className="flex items-center justify-center grow">
                <img src={vector2} alt="" className="" />
              </div>
              <div className="flex items-center justify-center flex-none ">
                <img
                  src={pokedex}
                  alt=""
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-auto lg:h-auto animate-spin-slow"
                />
              </div>
            </div>
            {/*=========           Graphic bar            =========*/}
            <div className="mt-6 lg:w-[877px]">
              <div className="mt-6">
                <div className="mt-3 flex justify-between">
                  <p className="text-lg md:text-xl lg:text-2xl font-semibold">HP</p>
                  <p className="text-base md:text-lg lg:text-xl font-semibold">
                    {character.stats?.[0].base_stat}/150
                  </p>
                </div>
                <div className="mt-3 w-full h-[24px] sm:h-[28px] lg:h-[34px] rounded bg-rectangleGreey relative">
                  <div
                    className="bg-gradient-to-r from-[#fcd676] via-[#f5bc2b] to-[#E6901E] rounded animate-pulse absolute top-0 left-0 h-full"
                    style={{
                      width: `${(character.stats?.[0].base_stat / 150) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="mt-6">
                <div className="mt-3 flex justify-between">
                  <p className="text-lg md:text-xl lg:text-2xl font-semibold">Attack</p>
                  <p className="text-base md:text-lg lg:text-xl font-semibold">
                    {character.stats?.[1].base_stat}/150
                  </p>
                </div>
                <div className="mt-3 w-full h-[24px] sm:h-[28px] lg:h-[34px] rounded bg-rectangleGreey relative">
                  <div
                    className="bg-gradient-to-r from-[#fcd676] via-[#f5bc2b] to-[#E6901E] rounded animate-pulse absolute top-0 left-0 h-full"
                    style={{
                      width: `${(character.stats?.[1].base_stat / 150) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="mt-6">
                <div className="mt-3 flex justify-between">
                  <p className="text-lg md:text-xl lg:text-2xl font-semibold">Defense</p>
                  <p className="text-base md:text-lg lg:text-xl font-semibold">
                    {character.stats?.[2].base_stat}/150
                  </p>
                </div>
                <div className="mt-3 w-full h-[24px] sm:h-[28px] lg:h-[34px] rounded bg-rectangleGreey relative">
                  <div
                    className="bg-gradient-to-r from-[#fcd676] via-[#f5bc2b] to-[#E6901E] rounded animate-pulse absolute top-0 left-0 h-full"
                    style={{
                      width: `${(character.stats?.[2].base_stat / 150) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="mt-6">
                <div className="mt-3 flex justify-between">
                  <p className="text-lg md:text-xl lg:text-2xl font-semibold">Speed</p>
                  <p className="text-base md:text-lg lg:text-xl font-semibold">
                    {character.stats?.[5].base_stat}/150
                  </p>
                </div>
                <div className="mt-3 w-full h-[24px] sm:h-[28px] lg:h-[34px] rounded bg-rectangleGreey relative">
                  <div
                    className="bg-gradient-to-r from-[#fcd676] via-[#f5bc2b] to-[#E6901E] rounded animate-pulse absolute top-0 left-0 h-full"
                    style={{
                      width: `${(character.stats?.[5].base_stat / 150) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*=================================================          Card 2       ============================================*/}
        <div className="my-16 lg:my-20 rounded-md w-full lg:w-[1116px] shadow-2xl">
          <div className="mt-10 mx-4 lg:mx-28 text-3xl md:text-4xl lg:text-5xl font-semibold flex ">
            <div className="mt-2 lg:mt-4 flex-none">
              <h1 className="mr-4 lg:mr-10 md:pt-2 lg:pt-0">Movements</h1>
            </div>
            <div className="flex items-center justify-center grow">
              <img src={vector2} alt="" className="" />
            </div>
            <div className="flex items-center justify-center flex-none">
              <img
                src={pokedex}
                alt=""
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-auto lg:h-auto animate-spin-slow"
              />
            </div>
          </div>
          <div className="mx-4 lg:mx-16 mt-8 mb-12 lg:mb-24 font-medium text-xl lg:text-2xl flex flex-wrap gap-4 md:gap-6 lg:gap-8">
            {moves.length > 0 ? (
              moves.map((move, index) => (
                <div
                  key={index}
                  className="px-6 md:px-9 lg:px-12 w-max h-[38px] md:h-[44px] lg:h-[64px] flex items-center justify-center bg-rectangleGreeyMovs rounded-[50px] "
                >
                  {move}
                </div>
              ))
            ) : (
              <p>There are no moves available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
