interface Props {
  setLanguage: (language: string) => void;
}

const languages: Record<string, string> = {
  javascript: 'Javascript',
  typescript: 'Typescript',
  python: 'Python',
};

const LanguageSelector = ({ setLanguage }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        id="language"
        onChange={handleChange}
        className="px-3 py-1.5 text-sm border hover:bg-gray-200 dark:bg-gray-800
         dark:hover:bg-gray-700 dark:text-white transition-colors duration-200
         border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
      >
        {Object.entries(languages).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
