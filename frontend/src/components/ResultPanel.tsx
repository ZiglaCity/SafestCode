interface Props {
  result: string[];
  onClose: (value: boolean) => void;
}

const ResultPanel: React.FC<Props> = ({ result, onClose }) => {
  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-full max-w-sm sm:max-w-md bg-zinc-900 border-l-4 border-blue-500 shadow-lg rounded-lg p-4 space-y-3 z-50 animate-in fade-in duration-300
      sm:rounded-xl
      flex flex-col
      max-h-[60vh] overflow-y-auto
    "
    >
      <div className="flex justify-between items-center">
        <h2 className="text-blue-400 font-semibold text-sm sm:text-base">
          Result Summary
        </h2>
        <button
          onClick={() => onClose(false)}
          className="text-zinc-400 hover:text-red-500 transition-colors px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
          aria-label="Close"
        >
          ✖
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {result.map((point, idx) => (
          <div
            key={idx}
            className="text-sm sm:text-base bg-zinc-800 rounded-md px-3 py-2 border border-zinc-700 flex items-start gap-2"
          >
            <span className="font-semibold text-blue-400 min-w-[20px]">
              #{idx + 1}
            </span>
            <span className="text-zinc-200 break-words">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPanel;
