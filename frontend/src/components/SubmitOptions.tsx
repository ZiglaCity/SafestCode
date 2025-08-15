import { FileCode, Search, Settings } from 'lucide-react';

interface AITaskPanelProps {
  selected: string[];
  setSelectedTasks: (tasks: string[])  => void;
}

const tasks = [
  {
    id: 'review',
    title: 'Review Code',
    description: 'Get comprehensive code review suggestions',
    color: 'bg-blue-100 text-blue-600 border-blue-200',
    icon: FileCode
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
    icon: Settings
  }
];

const SubmitOptions: React.FC<AITaskPanelProps> = ({ selected, setSelectedTasks }) => {

  const handleClick = (value : string) => {
    const newSelected = selected.includes(value) 
    ? selected.filter(task => task !== value)
    : [...selected, value];
    
    setSelectedTasks(newSelected);
    console.log("New Selected: ", newSelected);
  }

  return (
    <div className="w-auto dev-surface border border-dev-border rounded-lg p-4 space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-dev-text mb-2 text-center">SafestCode Analysis</h3>
        <p className="text-sm dev-text-muted text-center">
          Select a task to analyze your code and get intelligent suggestions.
        </p>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => {
          const isSelected = selected.includes(task.id);
          const Icon = task.icon;

          return (
            <div
              key={task.id}
              onClick={() => handleClick(task.id)}
              className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 ${
                isSelected
                  ? 'border-dev-accent bg-dev-accent/5'
                  : 'border-dev-border hover:border-dev-accent/50'
              }`}
            >
              <div className="flex flex-col">
                <div className='flex justify-between'>
                  <div className='flex justify-baseline items-center'>
                    <div>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-dev-text">{task.title}</h3>
                    </div>
                  </div>
                  <div>
                  {isSelected && (
                    <span
                    className={`px-2 py-0.5 text-xs rounded border font-medium ${task.color}`}
                    >
                      Selected
                    </span>
                  )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-dev-text-muted mt-1">{task.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubmitOptions;
