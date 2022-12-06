import { usePageNumbers } from "hooks/dictionary/pagination.hooks";

type paginationEntries = {
  wordsPerPage: number;
  totalWords: number;
  currentPage: number;
  paginate: Function;
};

const Pagination = ({
  wordsPerPage,
  totalWords,
  paginate,
  currentPage,
}: paginationEntries) => {
  const pageNumbers = usePageNumbers(totalWords, wordsPerPage);

  return (
    <nav className="my-8 flex justify-center">
      <div className="btn-group">
        {pageNumbers.map((number, index) => (
          <button
            className={`btn btn-xs md:btn-md 
            hover:bg-[#D9D7FE] hover:text-black
            ${number === currentPage ? "bg-[#8F19EA] text-white" : null} 
            `}
            onClick={() => paginate(number)}
            key={index}
          >
            {number}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
