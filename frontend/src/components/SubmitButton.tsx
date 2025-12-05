interface Props {
  onSubmit: () => void;
  isLoading: boolean;
  selected: string[];
}

const SubmitButton: React.FC<Props> = ({ onSubmit, isLoading, selected }) => {
  const handleClick = () => {
    if (!selected || selected.length === 0) {
      console.error('Select a task first');
      return;
    }
    onSubmit();
  };

  return (
    <button
      onClick={handleClick}
      disabled={!selected.length || isLoading}
      className={`w-full py-2 rounded-md font-medium text-white transition-all ${isLoading || !selected.length ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
    >
      {isLoading ? 'Analyzing...' : 'Analyze Code'}
    </button>
  );
};

export default SubmitButton;
