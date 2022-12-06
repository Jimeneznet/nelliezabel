import { Word } from "@lib/types/word.types";
import { useState } from "react";

export const usePagination = (words: Array<Word>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [wordsPerPage] = useState<number>(30);
  const indexLastWord = currentPage * wordsPerPage;
  const indexFirstWord = indexLastWord - wordsPerPage;
  const currentWords = words.slice(indexFirstWord, indexLastWord);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return { currentWords, wordsPerPage, currentPage, paginate };
};

export const usePageNumbers = (totalWords: number, wordsPerPage: number) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalWords / wordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};
