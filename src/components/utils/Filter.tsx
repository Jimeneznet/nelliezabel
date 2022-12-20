import { Word } from "@lib/types/word.types";

export const filterQuery = (sentence: string) => {
  const search = sentence
    .toLocaleLowerCase()
    .split(" ")
    .map((element: any) => element.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+/g, ""))
    .filter((item) => item !== "");
  return search;
};
export const filterCategory = (isCheckedA: boolean, isCheckedB: boolean, isCheckedC: boolean ) => {
  let categories = ["Educación","Jurídico","Psicología"];
  (isCheckedA === true && isCheckedB === true && isCheckedC === true) ? console.log("without filters") :
  (isCheckedA === true && isCheckedB === true) ? categories.splice(2,1) : (isCheckedB === true && isCheckedC === true) ? categories.splice(0,1) :
  (isCheckedA === true && isCheckedC === true) ? categories.splice(1,1) : isCheckedA === true ? categories=categories.filter(tech => tech === "Educación") :
  isCheckedB === true  ? categories=categories.filter(tech => tech === "Jurídico")  : isCheckedC === true  ? categories=categories.filter(tech => tech === "Psicología") : console.log("without filters")
  return categories;
};

export const filterWords = (words: Word[], searchQuery: string, isCheckedA: boolean, isCheckedB: boolean, isCheckedC: boolean ) => {
  const categories = filterCategory(isCheckedA,isCheckedB,isCheckedC)
  console.log(categories)
  const [categoryOne,categoryTwo] = categories
  const parsedFilter = filterQuery(searchQuery);
  let parsedWords: Word[] = [];
  

  if ((searchQuery === null || searchQuery.match(/^ *$/) !== null) && categories.length === 3 ) return words;

  if ((searchQuery === null || searchQuery.match(/^ *$/) !== null) && categories.length === 2 ) {
    for (let i = 0; i < words.length; i++) {
      const category= filterQuery(words[i].category);
      for (let j = 0; j < category.length; j++) {
        if (categoryOne.toLocaleLowerCase() === category[j] || categoryTwo.toLocaleLowerCase() === category[j]) {
          parsedWords.push(words[i]);
          break;
        }
      }
    }
    return parsedWords;
  } else if ((searchQuery === null || searchQuery.match(/^ *$/) !== null) && categories.length === 1 ) {
    
    for (let i = 0; i < words.length; i++) {
      const category= filterQuery(words[i].category);
      for (let j = 0; j < category.length; j++) {
        if (categoryOne.toLocaleLowerCase() === category[j]) {
          parsedWords.push(words[i]);
          break;
        }
      }
    }
    console.log(parsedWords);
    
    return parsedWords;
  }

  if (categories.length === 2 ) {
    for (let i = 0; i < words.length; i++) {
      const element = filterQuery(words[i].word);
      const category= filterQuery(words[i].category);
      for (let j = 0; j < element.length; j++) {
        const query = element[j];
        if (parsedFilter.includes(query) && categoryOne.toLocaleLowerCase() === category[j] || categoryTwo.toLocaleLowerCase() === category[j]) {
          parsedWords.push(words[i]);
          break;
        }
      }
    }
    return parsedWords;
  } else if (categories.length === 1 ) {
    for (let i = 0; i < words.length; i++) {
      const element = filterQuery(words[i].word);
      const category= filterQuery(words[i].category);
      for (let j = 0; j < element.length; j++) {
        const query = element[j];
        if (parsedFilter.includes(query) && categoryOne.toLocaleLowerCase() === category[j]) {
          parsedWords.push(words[i]);
          break;
        }
      }
    }
    return parsedWords;
  }
  
  
};

