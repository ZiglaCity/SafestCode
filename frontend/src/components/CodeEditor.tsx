import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";

interface Props {
  language: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
  setLanguage: (language : string) => void;
}

export default function CodeEditor({ language, value, onChange, setLanguage }: Props) {

  const extensions: Record<string, string> = {
    python: "py",
    typescript: "ts",
    javascript: "js",
  };
  
  const handleEditorChange = (value: string | undefined) => {
    if (value?.trim() === "// Start typing your code here..." ){
      value = "";
    }
    onChange?.(value);
  };

  return (
    <div className="h-[500px] dev-surface border rounded-lg">
      <div className="flex items-center justify-between px-4 py-2 border-b border-dev-border">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm dev-text-muted font-mono">main.{extensions[language]}</span>
        </div>
        <LanguageSelector setLanguage={setLanguage} />
      </div>
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
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