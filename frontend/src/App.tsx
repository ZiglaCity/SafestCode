import { useState } from 'react'
import './App.css'
import CodeEditor from './components/CodeEditor'
import SubmitButton from './components/SubmitButton';
import SubmitOptions from './components/SubmitOptions';
import { submitRequest } from './utils/sendCodeRequest';
import extractCodeBlock from './utils/extractCleanCode';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const [code, setCode] = useState("// Start typing your code here...");
  const [selectedModes, setSelectedModes] = useState<string[]>(["review"]);
  const [language, setLanguage] = useState<string>("javascript");

  const handleCodeChange = (updatedCode: string | undefined) => {
    setCode(updatedCode || "");
  };

  const handleSubmit = async () => {
    const body = {
      code,
      mode : selectedModes.join(","),
      language,
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
    <div className="flex space-y-4">
      <div className='w-screen'>
        <LanguageSelector setLanguage={setLanguage} />
        <CodeEditor value={code} onChange={handleCodeChange} language={language} />
      </div>
      <div> 
        <SubmitOptions checked={selectedModes} onCheck={setSelectedModes} />
        <SubmitButton onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default App;