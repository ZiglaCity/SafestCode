import { BrushCleaningIcon } from "lucide-react";

interface Props {
  setCode: (code: string) => void;
}

export default function Clear({ setCode }: Props) {
  return (
    <div>
      <button
        title="Clear"
        onClick={() => setCode("")}
        className="mx-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 
                   active:scale-95 shadow-sm border border-gray-200 
                   transition-all duration-150 flex items-center justify-center"
      >
        <BrushCleaningIcon className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}
