import { Word } from "@lib/types/word.types";

export const filterQuery = (sentence: string) => {
  const search = sentence
    .toLocaleLowerCase()
    .split(" ")
    .map((element: any) => element.replace(/[^a-zA-Z]/g, ""))
    .filter((item) => item !== "");
  return search;
};

export const filterWords = (words: Word[], searchQuery: string) => {
  if (searchQuery === null || searchQuery.match(/^ *$/) !== null) return words;
  const parsedFilter = filterQuery(searchQuery);
  let parsedWords: Word[] = [];
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

  return parsedWords;
};
