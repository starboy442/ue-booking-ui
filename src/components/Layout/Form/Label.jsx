const Label = ({ title }) => {
  return (
    <label
      htmlFor={title.toLowerCase()}
      className="block mb-2 text-sm font-medium text-slate-900"
    >
      {title}
    </label>
  );
};

export default Label;
