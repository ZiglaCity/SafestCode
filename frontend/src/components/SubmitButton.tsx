interface ButtonType {
  onSubmit: () => void;
  isLoading: boolean;
  selected: string[];
}
const SubmitButton = ({ onSubmit, isLoading, selected }: ButtonType) => {
  const handleSubmit = () => {
    if (!selected) {
      console.error('Please select a task to be peformed');
      return;
    }
    onSubmit();
  };

  return (
    <div className="">
      <button
        onClick={handleSubmit}
        disabled={!selected || isLoading}
        className={` py-2 rounded-md font-medium text-white px-4 bg-blue-600 hover:bg-blue-700 ${
          isLoading || !selected
            ? 'bg-dev-accent/50 cursor-not-allowed'
            : 'bg-dev-accent hover:bg-dev-accent-muted'
        }`}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Code'}
      </button>
    </div>
  );
};

export default SubmitButton;
