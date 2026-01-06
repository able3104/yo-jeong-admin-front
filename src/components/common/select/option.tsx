import { cn } from "cn-func";
import { useSelectContext } from "./selectContext";

interface SelectOptionProps {
  name: string;
}

const Option = ({ name }: SelectOptionProps) => {
  const { selectedOption, onChange } = useSelectContext();
  const isSelected = selectedOption?.name === name;

  return (
    <label
      className={cn(
        "flex flex-row justify-between items-center gap-2",
        "px-4 py-3 cursor-pointer",
        isSelected ? "bg-gray-background" : "bg-white hover:bg-gray-background"
      )}
      onClick={() => onChange({ name })}
    >
      <div className="flex flex-col">
        <p className="text-base ">{name}</p>
      </div>
    </label>
  );
};

export default Option;
