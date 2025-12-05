import { useEffect, useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import SubmitButton from './components/SubmitButton';
import SubmitOptions from './components/SubmitOptions';
import ResultPanel from './components/ResultPanel';
import About from './components/About';
import extractCodeBlock, { extractSummary } from './utils/extractCleanCode';
import { Analyzer } from './api/analyzer';
import { removeCommentsFromCode } from './utils/removeComments';
import { saveFile } from './utils/saveFile';

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
      return;
    }

    setIsLoading(true);
    try {
      const body = { code, mode: selectedModes.join(','), language };
      const result = await Analyzer(body);

      let reviewedCode = result.data;
      if (reviewedCode) {
        reviewedCode = extractCodeBlock(reviewedCode);
        const { codeBlock, summaryLines } = extractSummary(
          reviewedCode,
          language
        );
        reviewedCode = codeBlock.trim();
        setSummary(summaryLines);
        setShowSummary(summaryLines.length > 0);
      }

      setCode(reviewedCode || code);
    } catch (err) {
      console.error('Analysis failed:', err);
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
