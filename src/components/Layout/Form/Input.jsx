const Input = ({
  type,
  name,
  id,
  placeholder,
  required,
  handleChange,
  value,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required={required}
      className="bg-white border border-slate-300 text-slate-900 text-sm rounded-md focus:ring-slate-200 block w-full p-3 "
    />
  );
};

export default Input;
