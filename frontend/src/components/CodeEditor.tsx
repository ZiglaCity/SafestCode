import Editor from "@monaco-editor/react";

interface Props {
  language?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
}

export default function CodeEditor({ language = "typescript", value, onChange }: Props) {

  const handleEditorChange = (value: string | undefined) => {
    onChange?.(value);
  };

  return (
    <div className="w-full h-[500px] border rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  );
}