import Editor from '@monaco-editor/react';

function CodeEditor() {
  const handleEditorChange = () => {
    //use a state to keep track of the latest changes typed...
    
  };

  return (
    <div style={{ height: '90vh' }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// Start typing your code here..."
        theme="vs-dark"
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default CodeEditor;
