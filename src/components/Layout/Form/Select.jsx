const SelectCustom = ({ id, name, handleChange, value }) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      className="bg-white border border-slate-300 text-slate-900 text-sm rounded-md focus:ring-slate-200 focus:border-slate-200 block w-full p-3"
    >
      <option value="Select">Select</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  );
};

export default SelectCustom;
