import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import Clear from './Clear';
import Save from './Save';
import Copy from './Copy';
import Cut from './Cut';
import Zoom from './Zoom';
import RemoveComments from './RemoveComments';
import { Menu } from 'lucide-react';

interface Props {
  language: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
  setLanguage: (language: string) => void;
  setCode: (code: string) => void;
  removeComments: () => void;
  saveFile: () => void;
  copyCode: () => void;
  cutCode: () => void;
}

export default function CodeEditor({
  language,
  value,
  onChange,
  setLanguage,
  setCode,
  removeComments,
  saveFile,
  copyCode,
  cutCode,
}: Props) {
  const [theme, setTheme] = useState('vs-light');
  const [fontSize, setFontSize] = useState(14);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () =>
      setTheme(darkModeQuery.matches ? 'vs-dark' : 'vs-light');
    updateTheme();
    darkModeQuery.addEventListener('change', updateTheme);
    return () => darkModeQuery.removeEventListener('change', updateTheme);
  }, []);

  const extensions: Record<string, string> = {
    python: 'py',
    typescript: 'ts',
    javascript: 'js',
  };

  const handleEditorChange = (val: string | undefined) =>
    onChange?.(
      val?.trim() === '// Start typing your code here...' ||
        val?.trim() === '# Start typing your code here...'
        ? ''
        : val
    );

  return (
    <div className="dev-surface border rounded-lg flex flex-col h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[500px]">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-600"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
          <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
            main.{extensions[language]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector setLanguage={setLanguage} />

          <div className="hidden md:flex items-center gap-2">
            <Zoom setFontSize={setFontSize} />
            <Clear setCode={setCode} />
            <Cut cutCode={cutCode} />
            <Copy copyCode={copyCode} />
            <Save saveFile={saveFile} />
            <RemoveComments removeComments={removeComments} />
          </div>

          <div className="md:hidden relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Editor Actions"
            >
              <Menu />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-15 items-center bg-zinc-900 dark:bg-zinc-800 border border-zinc-700 rounded-md shadow-lg flex flex-col py-2 z-50">
                <Zoom setFontSize={setFontSize} />
                <Clear setCode={setCode} />
                <Cut cutCode={cutCode} />
                <Copy copyCode={copyCode} />
                <Save saveFile={saveFile} />
                <RemoveComments removeComments={removeComments} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={handleEditorChange}
        theme={theme}
        options={{
          minimap: { enabled: false },
          fontSize,
          fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
          lineNumbers: 'on',
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 16 },
          renderLineHighlight: 'all',
          selectOnLineNumbers: true,
          matchBrackets: 'always',
          folding: true,
          foldingHighlight: true,
          showFoldingControls: 'mouseover',
        }}
      />
    </div>
  );
}
