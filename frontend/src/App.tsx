import { useState } from 'react'
import './App.css'
import CodeEditor from './components/CodeEditor'
import SubmitButton from './components/SubmitButton';

function App() {
  const [code, setCode] = useState("// Start typing your code here...");

  const handleCodeChange = (updatedCode: string | undefined) => {
    setCode(updatedCode || "");
  };

  const handleSubmit = () => {
    console.log("Submitted code:", code);
    setCode("// we do something here later...");
  };

  return (
    <div className="space-y-4">
      <CodeEditor value={code} onChange={handleCodeChange} />
      <SubmitButton onSubmit={handleSubmit} />
    </div>
  );
}

export default App;