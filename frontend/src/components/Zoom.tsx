import { Plus, Minus } from "lucide-react";

interface zoomProps{
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
}

export default function Zoom({setFontSize} : zoomProps){

  const handleFontChange = (change : string) => {
    setFontSize(prev => change === "+" ? (prev + 2) : Math.max(0, prev - 2));
  }

  return (

    <div className="flex">
      <div>
        <button 
          onClick={()=>handleFontChange("-")}
          className="mx-1 p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 
                   dark:bg-gray-800 dark:hover:bg-gray-700 
                   transition-colors duration-200 shadow-sm border border-gray-300 dark:border-gray-700">
          <Minus />
        </button>
      </div>
      <div>
        <button 
          onClick={()=>handleFontChange("+")}
          className="mx-1 p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 
                   dark:bg-gray-800 dark:hover:bg-gray-700 
                   transition-colors duration-200 shadow-sm border border-gray-300 dark:border-gray-700">
          <Plus />
        </button>
      </div>
    </div>
  )
}