import { Word } from "@lib/types/word.types";

export const filterQuery = (sentence: string) => {
  const search = sentence
    .toLocaleLowerCase()
    .split(" ")
    .map((element: any) => element.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+/g, ""))
    .filter((item) => item !== "");
  return search;
};

export const filterCategory = (
  categoriesControl: Array<{ categoryName: string; categoryEnabled: boolean }>
) => {
  const filteredCategories = categoriesControl
    .map((element) => {
      return element.categoryEnabled ? element.categoryName : null;
    })
    .filter((element) => {
      return element != null && element !== undefined && element !== "";
    });
  return filteredCategories;
};

export const filterWords = (
  words: Word[],
  searchQuery: string,
  categoriesControl: Array<{ categoryName: string; categoryEnabled: boolean }>
) => {
  const categories = filterCategory(categoriesControl);
  const parsedFilter = filterQuery(searchQuery);
  let parsedWords: Word[] = [];

  if (searchQuery === null || searchQuery.match(/^ *$/) !== null) {
    parsedWords = words.filter((element) => {
      return element != null && element !== undefined;
    });
  } else {
    for (let i = 0; i < words.length; i++) {
      const element = filterQuery(words[i].word);
      for (let j = 0; j < element.length; j++) {
        const query = element[j];
        if (parsedFilter.includes(query)) {
          parsedWords.push(words[i]);
          break;
        }
      }
    }
  }

  if (parsedWords.length === 0) return [];
  if (categories.length !== 3) {
    for (let i = 0; i < parsedWords.length; i++) {
      const category = parsedWords[i].category;
      if (!categories.includes(category)) {
        delete parsedWords[i];
      } else {
      }
    }
  }

  parsedWords = parsedWords.filter((element) => {
    return element != null && element !== undefined;
  });

  return parsedWords;
};
