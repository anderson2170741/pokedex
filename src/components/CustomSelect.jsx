import React, { useEffect } from 'react';
import Select from 'react-select';

const CustomSelect = ({ locations, filterType }) => {
  const locationOptions = locations.map((type) => ({
    value: type.url,
    label: type.name,
  }));

  // Función para ocultar la barra de desplazamiento
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      ::-webkit-scrollbar {
        width: 0 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none', 
      cursor:'pointer'
    }),
    indicatorSeparator: () => ({ display: 'none' }), 
    dropdownIndicator: (provided) => ({ ...provided }), // Ajusta el padding de la flecha hacia abajo
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#D93F3F' : 'transparent', 
      color: state.isFocused ? 'white' : 'black', 
      cursor:'pointer'
    }),
  };

  return (
    <div className="m-auto pt-4 lg:pt-0 lg:m-0 w-full sm:w-[490px] lg:w-full lg:min-w-[300px] xl:w-[490px]">
      <Select
        className="select capitalize w-full h-8 sm:h-16 sm:text-lg sm:py-3 shadow-lg"
        options={locationOptions}
        onChange={(selectedOption) => filterType(selectedOption.value)}
        placeholder="All pokémon"
        styles={customStyles} 
      />
    </div>
  );
};

export default CustomSelect;
