import { useState } from 'react'
import './App.css'
import CodeEditor from './components/CodeEditor'
import SubmitButton from './components/SubmitButton';
import SubmitOptions from './components/SubmitOptions';
import { submitRequest } from './utils/sendCodeRequest';
import extractCodeBlock, {extractSummary} from './utils/extractCleanCode';
import LanguageSelector from './components/LanguageSelector';
import ResultPanel from './components/ResultPanel';

function App() {
  const [code, setCode] = useState("// Start typing your code here...");
  const [selectedModes, setSelectedModes] = useState<string[]>(["review"]);
  const [language, setLanguage] = useState<string>("javascript");
  const [summary, setSummary] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCodeChange = (updatedCode: string | undefined) => {
    setCode(updatedCode || "");
  };

  const handleSubmit = async () => {
    if(!code || code === "// Start typing your code here..."){
      console.error("Pls enter code to be anyalyzed...");
      return
    }
    setIsLoading(true);
    const body = {
      code,
      mode : selectedModes.join(","),
      language,
    }
    
    console.log("Submitted code:", body);
    const result = await submitRequest(body);
    let reviewedCode = result?.code;
    console.log("Reviewed code: ", reviewedCode)
    if (reviewedCode ){
      reviewedCode = extractCodeBlock(reviewedCode);
      const { codeBlock, summaryLines } = extractSummary(reviewedCode);
      reviewedCode = codeBlock.trim();
      setSummary(summaryLines);
    }
    console.log("New reviewed code :", reviewedCode);
    console.log("Summary: ", summary);
    setCode(reviewedCode);
    console.log(result);
    setIsLoading(false);
  };

  return (
    <div className="flex space-y-1 gap-3">
      <div className='w-screen'>
        <LanguageSelector setLanguage={setLanguage} />
        <CodeEditor value={code} onChange={handleCodeChange} language={language} />
        { summary.length > 0 && <ResultPanel result={summary}/>}
      </div>
      <div> 
        <SubmitOptions selected={selectedModes} setSelectedTasks={setSelectedModes} />
        <SubmitButton onSubmit={handleSubmit}selected={selectedModes} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;