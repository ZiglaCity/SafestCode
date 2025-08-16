import { BrushCleaningIcon } from 'lucide-react';

interface Props {
  setCode: (code: string) => void;
}

export default function Clear({ setCode }: Props) {
  return (
    <div>
      <button
        title="Clear"
        onClick={() => setCode('')}
        className="mx-1 p-2 rounded-md bg-gray-100 hover:bg-gray-200 
                   dark:bg-gray-800 dark:hover:bg-gray-700 
                   transition-colors duration-200 shadow-sm border border-gray-300 dark:border-gray-700"
      >
        <BrushCleaningIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
      </button>
    </div>
  );
}
