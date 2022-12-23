import { stringLength } from "@firebase/util";
import React, { useState } from "react";
import {
  DictionaryCategoryFilterItem,
  ICategoryFilter,
} from "./DictionaryCategoryFilterItem";

export interface ICategoryFilterList {
  categories: { categoryName: string; categoryEnabled: boolean }[];
  callback: (categoryName: string) => void;
}

export const DictionaryCategoryFilterList: React.FC<ICategoryFilterList> = (
  props
) => {
  return (
    <div className="dropdown">
      <label className="btn rounded-none bordered m-0" tabIndex={0}>
        <div className="hidden md:inline">Categorías</div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu shadow bg-base-100 rounded-box w-fit mt-2"
      >
        {props.categories.map((filteredCategory) => {
          return (
            <li key={filteredCategory.categoryName}>
              <DictionaryCategoryFilterItem
                {...(filteredCategory as ICategoryFilter)}
                categoryCallback={props.callback}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
