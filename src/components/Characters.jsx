import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CharacterCard from "./CharacterCard";
import Logo from "../assets/img/image 12.png";
import "../App.css";
import CustomSelect from "./CustomSelect";
import Pagination from "./Pagination";

const Characters = () => {
  const userName = useSelector((state) => state.name);
  const [characters, setCharacters] = useState([]);
  const [characterName, setCharacterName] = useState("");
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;

  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (selectedType) {
      // Obtener los Pokémon del tipo seleccionado
      fetch(selectedType)
        .then((response) => response.json())
        .then((data) => {
          const numPages = Math.ceil(data.pokemon.length / itemsPerPage);
          setTotalPages(numPages);

          const startIdx = (page - 1) * itemsPerPage;
          const endIdx = startIdx + itemsPerPage;
          const pokemonSlice = data.pokemon.slice(startIdx, endIdx);
          setCharacters(pokemonSlice);
        });
    } else {
      fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${
          (page - 1) * itemsPerPage
        }&limit=${itemsPerPage}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Calcular el número total de páginas en función de la cantidad total de Pokémon
          const numPages = Math.ceil(data.count / itemsPerPage);
          setTotalPages(numPages);

          setCharacters(data.results);
        });
    }

    fetch(`https://pokeapi.co/api/v2/type/`)
      .then((response) => response.json())
      .then((data) => setLocations(data.results));
  }, [page, selectedType]);

  const searchCharacter = () => {
    const lowercaseName = characterName.toLowerCase();
    navigate(`/characters/${lowercaseName}`);
  };

  const filterType = (selectedValue) => {
    setSelectedType(selectedValue);
    setPage(1); // Restablecer la página a 1 cuando se cambia el tipo
  };

  return (
    <div className="pokedexBackgroud">
      {/*===========================================================================      Head         ======================================================*/}
      <div className="w-full h-11 sm:h-14 md:h-16 xl:h-24 bg-rectangleRed relative">
        <div className="container mx-auto h-full relative">
          <img
            src={Logo}
            alt="Pokedex Logo"
            className="w-[215px] h-[38px] sm:w-[258px] sm:h-[47px] md:w-[323px] md:h-[57px] xl:w-[431px] xl:h-[76px] sm:ml-10 absolute bottom-[-5px] left-0 cursor-pointer"
          />
          <div className="ellipse sm:mr-2 md:mr-0 absolute bottom-[-30px] sm:bottom-[-42px] md:bottom-[-48px] xl:bottom-[-60px] right-0 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 xl:w-20 xl:h-20 border-[6px] sm:border-[8px] md:border-[9px] xl:border-[12px] rounded-full z-10 border-rectangleBlack bg-white flex justify-center items-center">
            <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 xl:w-10 xl:h-10 border-[6px] sm:border-[8px] md:border-[9px] xl:border-[12px] rounded-full z-20 border-rectangleBlack bg-ellipse hover:scale-110 duration-300"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-5 sm:h-6 md:h-8 xl:h-10 bg-rectangleBlack z-0"></div>
      {/*===========================================================================      Body         ======================================================*/}
      <div className="container mx-auto h-full">
        <div className="sm:mx-10">
          <div className="headerPokedex">
            <p className="mt-10 text-lg sm:text-2xl">
              <span className="font-semibold text-textRed">
                Welcome {userName},
              </span>{" "}
              here you can find your favorite Pokémon
            </p>
          </div>
          <div className="searchBarPokedex my-8 sm:my-10 flex flex-col lg:flex-row sm:justify-between">
            <div className="w-full lg:w-[600px] xl:w-[666px] shadow-lg flex">
              <input
                type="text"
                placeholder="Look for a Pokémon"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    searchCharacter();
                  }
                }}
                className="inputName w-[232px] h-8 sm:w-full lg:w-[464px] sm:h-16 p-4 sm:text-lg"
              />
              <button
                onClick={searchCharacter}
                className="buttonName w-28 h-8 sm:w-52 sm:h-16 sm:text-lg shadow-lg bg-button text-white hover:scale-110 duration-300 "
              >
                Search
              </button>
            </div>

            <div className="selectContainer">
              <CustomSelect locations={locations} filterType={filterType} />
            </div>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8 lg:gap-10 place-items-center">
            {characters.length > 0 && // Mostrar solo si hay al menos una tarjeta
              characters.map((pokemon) => (
                <CharacterCard
                  url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                  key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                />
              ))}
          </ul>
          {characters.length > 0 && (
            <div className="pagination grid place-items-center py-24">
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Characters;
