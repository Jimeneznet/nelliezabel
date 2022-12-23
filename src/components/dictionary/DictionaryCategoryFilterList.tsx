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
    <div className="dropdown w-1/2 md:w-fit">
      <label
        className="btn bg-secondaryHeader border-none m-0 text-white w-full rounded-none rounded-bl-md md:rounded-bl-none"
        tabIndex={0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="rgb(245,243,255)"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>
        <div className="mx-2 md:hidden">
          Filtrar
          </div>
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
