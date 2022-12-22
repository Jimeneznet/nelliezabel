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
  isCheckedA: boolean,
  isCheckedB: boolean,
  isCheckedC: boolean
) => {
  let categories = ["Educación", "Jurídico", "Psicología"];
  isCheckedA === true && isCheckedB === true && isCheckedC === true
    ? console.log("without filters")
    : isCheckedA === true && isCheckedB === true
    ? categories.splice(2, 1)
    : isCheckedB === true && isCheckedC === true
    ? categories.splice(0, 1)
    : isCheckedA === true && isCheckedC === true
    ? categories.splice(1, 1)
    : isCheckedA === true
    ? (categories = categories.filter((tech) => tech === "Educación"))
    : isCheckedB === true
    ? (categories = categories.filter((tech) => tech === "Jurídico"))
    : isCheckedC === true
    ? (categories = categories.filter((tech) => tech === "Psicología"))
    : console.log("without filters");
  return categories;
};

export const filterCategory2 = (
  categoriesControl: Array<{ categoryName: string; categoryEnabled: boolean }>
) => {
  const filteredCategories = categoriesControl
    .map((element) => {
      if (element.categoryEnabled) return element.categoryName;
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
  const categories = filterCategory2(categoriesControl);
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
  console.log(categories);

  if (parsedWords.length === 0) return [];
  if (categories.length !== 3) {
    for (let i = 0; i < parsedWords.length; i++) {
      const category = parsedWords[i].category;
      console.log(category);
      if (!categories.includes(category)) {
        delete parsedWords[i];
      } else {
        console.log(category);
      }
    }
  }

  parsedWords = parsedWords.filter((element) => {
    return element != null && element !== undefined;
  });
  console.log(parsedWords);

  return parsedWords;
};
