const UserSearch = ({ handleSearch }: any) => {
  return (
    <div>
      <div className="form-control w-full max-w-xs flex flex-row ml-12">
        <input
          type="text"
          placeholder="Escriba el rut del usuario"
          className="input input-bordered w-full max-w-xs"
          onChange={(e:any) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UserSearch;
