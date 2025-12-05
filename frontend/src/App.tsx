import { useEffect, useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import SubmitButton from './components/SubmitButton';
import SubmitOptions from './components/SubmitOptions';
import ResultPanel from './components/ResultPanel';
import About from './components/About';
import { Analyzer } from './api/analyzer';
import { removeCommentsFromCode } from './utils/removeComments';
import { saveFile } from './utils/saveFile';
import { toast } from 'react-toastify';

function App() {
  const [selectedModes, setSelectedModes] = useState<string[]>(['review']);
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState(
    language !== 'python'
      ? '// Start typing your code here...'
      : '# Start typing your code here...'
  );
  const [summary, setSummary] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const handleCodeChange = (updatedCode: string | undefined) => {
    setCode(updatedCode || '');
  };

  useEffect(() => {
    if (
      code.trim() === '// Start typing your code here...' ||
      code.trim() === '# Start typing your code here...'
    )
      setCode(
        language !== 'python'
          ? '// Start typing your code here...'
          : '# Start typing your code here...'
      );
  }, [language]);

  const handleSubmit = async () => {
    if (
      !code ||
      code.trim() === '// Start typing your code here...' ||
      code.trim() === '# Start typing your code here...'
    ) {
      console.error('Please enter code to be analyzed');
      toast.error('Please enter code to be analyzed');
      return;
    }

    setIsLoading(true);
    try {
      const body = { code, mode: selectedModes.join(','), language };
      const result = await Analyzer(body);

      if (result.success && result.data) {
        let parsed: { code: string; summary: string[]; error: string } | null =
          null;
        try {
          parsed = JSON.parse(result.data);
        } catch (err) {
          console.error('Failed to parse AI response:', err);
          toast.error('Failed to parse AI response.');
        }

        if (parsed) {
          setCode(parsed.code || code);
          setSummary(parsed.summary || []);
          setShowSummary(parsed.summary?.length > 0 || false);

          if (parsed.error) {
            console.warn('AI reported an error:', parsed.error);
            toast.error(
              'Analysis completed with errors. Check the summary for details.'
            );
          }
        } else {
          console.warn('No valid parsed data from AI, keeping original code.');
          toast.error('No valid parsed data from AI, keeping original code.');
          setCode(code);
          setSummary([]);
          setShowSummary(false);
        }
      } else {
        console.error('Analysis failed:', result.error);
        setSummary([]);
        setShowSummary(false);
      }
    } catch (err) {
      console.error('Unexpected error during analysis:', err);
      setSummary([]);
      setShowSummary(false);
    }
    setIsLoading(false);
  };

  const removeComments = () =>
    setCode(removeCommentsFromCode('\n' + code, language).trim());
  const handleSave = () => saveFile(code, language);
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      console.error('Copy failed');
    }
  };
  const cutCode = async () => {
    copyCode();
    setCode('');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-[#242424] text-black dark:text-white gap-6 p-4">
      <div className="flex-1 w-full lg:w-3/4">
        <CodeEditor
          language={language}
          value={code}
          onChange={handleCodeChange}
          setLanguage={setLanguage}
          setCode={setCode}
          removeComments={removeComments}
          saveFile={handleSave}
          copyCode={copyCode}
          cutCode={cutCode}
        />
      </div>

      <div className="flex flex-col w-full lg:w-1/4 gap-4">
        <SubmitOptions
          selected={selectedModes}
          setSelectedTasks={setSelectedModes}
        />
        <SubmitButton
          onSubmit={handleSubmit}
          selected={selectedModes}
          isLoading={isLoading}
        />
        {summary.length > 0 && showSummary && (
          <ResultPanel result={summary} onClose={setShowSummary} />
        )}
        <About />
      </div>
    </div>
  );
}

export default App;
