export interface ICategoryFilter {
  categoryName: string;
  categoryEnabled: boolean;
  categoryCallback: (categoryName: string) => void;
}

export const DictionaryCategoryFilterItem: React.FC<ICategoryFilter> = (
  props
) => {
  return (
    <div
      onClick={() => {
        props.categoryCallback(props.categoryName);
      }}
    >
      <label className="label pointer-events-none m-0 p-0 w-full">
        <h2 className="label-text whitespace-nowrap m-0 text-left pointer">
          {props.categoryName}
        </h2>
        <div className="mx-8 pointer-events-none"></div>
        <input
          type="checkbox"
          className="toggle toggle-secondary"
          checked={props.categoryEnabled}
          onChange={() => {}}
        />
      </label>
    </div>
  );
};
