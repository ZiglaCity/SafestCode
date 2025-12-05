import { FileCode, Search, Settings } from 'lucide-react';

interface Props {
  selected: string[];
  setSelectedTasks: (tasks: string[]) => void;
}

const tasks = [
  {
    id: 'review',
    title: 'Review Code',
    description: 'Get comprehensive code review suggestions',
    color: 'bg-blue-100 text-blue-600 border-blue-200',
    icon: FileCode,
  },
  {
    id: 'security',
    title: 'Scan for Vulnerabilities',
    description: 'Identify potential security issues',
    color: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    icon: Search,
  },
  {
    id: 'debug',
    title: 'Debug Error',
    description: 'Find and fix bugs in your code',
    color: 'bg-red-100 text-red-600 border-red-200',
    icon: Settings,
  },
];

const SubmitOptions: React.FC<Props> = ({ selected, setSelectedTasks }) => {
  const handleClick = (id: string) => {
    setSelectedTasks(
      selected.includes(id)
        ? selected.filter((t) => t !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="dev-surface border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          SafestCode Analysis
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select a task to analyze your code and get intelligent suggestions.
        </p>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => {
          const Icon = task.icon;
          const isSelected = selected.includes(task.id);
          return (
            <div
              key={task.id}
              onClick={() => handleClick(task.id)}
              className={`cursor-pointer p-3 rounded-lg border transition-transform duration-200 ${isSelected ? 'border-blue-500 scale-105 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 hover:scale-105 dark:border-gray-700'}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {task.title}
                  </span>
                </div>
                {isSelected && (
                  <span
                    className={`px-2 py-0.5 text-xs rounded border font-medium ${task.color}`}
                  >
                    Selected
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {task.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubmitOptions;
