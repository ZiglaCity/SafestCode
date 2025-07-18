interface Props {
  result: string[];
  onClose: (value: boolean) => void;
}

const ResultPanel = ({ result, onClose }: Props) => {
  const handleClick = () => {
    onClose(false);
  };

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-sm bg-zinc-900 border-l-4 border-blue-500 shadow-lg rounded-lg p-4 space-y-3 z-50 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-blue-400 font-semibold text-sm">Result Summary</h2>
        <button
          onClick={handleClick}
          className="text-zinc-400 hover:text-red-500 transition-colors px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
          aria-label="Close"
        >
          ✖
        </button>
      </div>

      {result.map((point, idx) => (
        <div
          key={idx}
          className="text-sm bg-zinc-800 rounded-md px-3 py-2 border border-zinc-700 flex items-start gap-2"
        >
          <span className="font-semibold text-blue-400">#{idx + 1}</span>
          <span className="text-zinc-200">{point}</span>
        </div>
      ))}
    </div>
  );
};

export default ResultPanel;