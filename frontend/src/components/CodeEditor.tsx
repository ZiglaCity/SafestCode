import Editor from "@monaco-editor/react";

interface Props {
  language?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
}

export default function CodeEditor({ language, value, onChange }: Props) {

  const handleEditorChange = (value: string | undefined) => {
    if (value?.trim() === "// Start typing your code here..." ){
      value = "";
    }
    onChange?.(value);
  };

  return (
    <div className="w-full h-[500px] border rounded-lg overflow-hidden">
      <Editor
        height="100%"
        language={language}
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