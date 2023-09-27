import React from "react";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronDoubleLeft } from "react-icons/hi";

const Pagination = ({ page, setPage, totalPages }) => {
  const itemsPerPageSection = 7;

  const generatePageNumbers = () => {
    const totalSections = Math.ceil(totalPages / itemsPerPageSection);
    const currentSection = Math.ceil(page / itemsPerPageSection);
    const startPage = (currentSection - 1) * itemsPerPageSection + 1;
    const endPage = startPage + itemsPerPageSection - 1;

    const pageNumbers = [];
    for (let i = startPage; i <= endPage && i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="container mx-auto w-full sm:w-[500px] md:w-[600px] lg:w-[890px] flex justify-between">
      {page > 1 && (
        <button
          className="w-[40px] h-[40px] sm:w-[55px] sm:h-[55px] md:w-[65px] md:h-[65px] lg:w-[97px] lg:h-[97px] rounded-md bg-rectangleRed text-white text-2xl flex justify-center items-center"
          onClick={() => setPage(page - 1)}
        >
          <HiChevronDoubleLeft />
        </button>
      )}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          className={`${
            page === pageNumber ? "selectedPage bg-rectangleRed  text-white" : ""
          } w-[40px] h-[40px] sm:w-[55px] sm:h-[55px] md:w-[65px] md:h-[65px] lg:w-[97px] lg:h-[97px] rounded-md text-2xl flex justify-center items-center`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={`w-[40px] h-[40px] sm:w-[55px] sm:h-[55px] md:w-[65px] md:h-[65px] lg:w-[97px] lg:h-[97px] rounded-md ${
          page === totalPages ? "bg-gray-400" : "bg-rectangleRed"
        } text-white text-2xl flex justify-center items-center`}
      >
        <HiChevronDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
