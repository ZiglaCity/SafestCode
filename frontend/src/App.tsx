import { useState } from 'react'
import './App.css'
import CodeEditor from './components/CodeEditor'
import SubmitButton from './components/SubmitButton';
import SubmitOptions from './components/SubmitOptions';
import { submitRequest } from './utils/sendCodeRequest';
import extractCodeBlock from './utils/extractCleanCode';

function App() {
  const [code, setCode] = useState("// Start typing your code here...");
  const [selectedModes, setSelectedModes] = useState<string[]>(["review"]);

  const handleCodeChange = (updatedCode: string | undefined) => {
    setCode(updatedCode || "");
  };

  const handleSubmit = async () => {
    const body = {
      code,
      mode : selectedModes.join(","),
      language : "Javascript"
    }
    
    console.log("Submitted code:", body);
    const result = await submitRequest(body);
    let reviewedCode = result?.code;
    if (reviewedCode ){
      reviewedCode = extractCodeBlock(reviewedCode);
    }
    setCode(reviewedCode);
    console.log(result);
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