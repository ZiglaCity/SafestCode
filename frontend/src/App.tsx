import { useState } from 'react'
import './App.css'
import CodeEditor from './components/CodeEditor'
import SubmitButton from './components/SubmitButton';
import SubmitOptions from './components/SubmitOptions';
import { submitRequest } from './utils/sendCodeRequest';
import extractCodeBlock, {extractSummary} from './utils/extractCleanCode';
import ResultPanel from './components/ResultPanel';
import { Clipboard } from 'lucide-react';

function App() {
  const [selectedModes, setSelectedModes] = useState<string[]>(["review"]);
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState(language !== "python" ? "// Start typing your code here..." : "# Start typing your code here...");
  const [summary, setSummary] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);

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
      const { codeBlock, summaryLines } = extractSummary(reviewedCode, language);
      reviewedCode = codeBlock.trim();
      setSummary(summaryLines);
      if(summary){
        setShowSummary(true);
      }
    }
    console.log("New reviewed code :", reviewedCode);
    console.log("Summary: ", summary);
    setCode(reviewedCode);
    console.log(result);
    setIsLoading(false);
  };

  const removeComments = () => {
    // TODO: logic for removing comments depending on the lanuage...
  }

  const saveFile = () => {
// logic for file saving ...
  }

  const copyCode = async () => {
    try {
      console.log("Copying to clipboard...")
      await navigator.clipboard.writeText(code);
      console.log("Copied to clipboard:", code);
    } catch (err) {
      console.error("Failed to copy:", err);
    }  
  }

  const cutCode = async () => {
    try{
      copyCode();
      setCode("");
    } catch (err){
      console.log("Failed to cut: ", err)
    }
  }
 
  return (
  <div className="flex flex-col lg:flex-row gap-6 w-full px-3 py-1">
    <div className="flex-1 space-y-4">
      <div className="w-full">
        <CodeEditor
          value={code}
          onChange={handleCodeChange}
          language={language}
          setLanguage={setLanguage}
          setCode={setCode}
          removeComments={removeComments}
          saveFile={saveFile}
          copyCode={copyCode}
          cutCode={cutCode}
        />
      </div>
    </div>

    <div className="lg:w-1/4 w-full space-y-4">
      <SubmitOptions
        selected={selectedModes}
        setSelectedTasks={setSelectedModes}
      />
      <SubmitButton
        onSubmit={handleSubmit}
        selected={selectedModes}
        isLoading={isLoading}
      />
      {summary.length > 0 && showSummary && (
        <ResultPanel result={summary} onClose={setShowSummary} /> 
      )}
    </div>
  </div>

  );
}

export default App;