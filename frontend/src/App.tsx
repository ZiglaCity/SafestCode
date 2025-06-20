import { useState } from 'react'
import './App.css'
import CodeEditor from './components/CodeEditor'
import SubmitButton from './components/SubmitButton';
import SubmitOptions from './components/SubmitOptions';

function App() {
  const [code, setCode] = useState("// Start typing your code here...");
  const [selectedModes, setSelectedModes] = useState<string[]>(["review"]);

  const handleCodeChange = (updatedCode: string | undefined) => {
    setCode(updatedCode || "");
  };

  const handleSubmit = () => {
    const body = {
      code,
      mode : selectedModes,
      language : "Javascript"
    }
    
    console.log("Submitted code:", body);
    setCode("// we do something here later...");
  };

  return (
    <div className="space-y-4">
      <CodeEditor value={code} onChange={handleCodeChange} />
      <SubmitButton onSubmit={handleSubmit} />
      <SubmitOptions checked={selectedModes} onCheck={setSelectedModes} />
    </div>
  );
}

export default App;