import DynamicSvgComponent from "@/components/svg/DynamicSvg";

const SettingField = ({
  iconName,
  label,
  value,
  description,
  disablePencil,
  onClick,
}) => {
  return (
    <div
      aria-hidden={true}
      className="flex w-full cursor-pointer select-none border-b border-b-slate-300 px-4 py-3 font-inter active:bg-slate-100 dark:border-b dark:border-b-slate-800 dark:text-slate-300 dark:active:bg-slate-800"
      onClick={onClick}
    >
      <div className="px-3 py-3">
        <i
          className={`fill-current font-bold text-slate-900 dark:text-slate-300`}
        >
          <DynamicSvgComponent name={iconName} />
        </i>
      </div>
      <div className="flex-1">
        <div className="flex">
          <div className="flex flex-1 flex-col">
            <span className="text-sm">{label}</span>
            <span className="py-1 font-poppins text-sm font-bold">{value}</span>
          </div>
          {!disablePencil && (
            <div>
              <DynamicSvgComponent
                name="Pencil"
                className="h-4 w-4 font-bold text-green-700 dark:text-green-500"
              />
            </div>
          )}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SettingField;
