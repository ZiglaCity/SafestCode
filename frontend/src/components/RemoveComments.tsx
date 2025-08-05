import { LucideRemoveFormatting } from "lucide-react";

interface Props {
  removeComments: () => void;
}


export default function RemoveComments({removeComments} : Props){
  return (
    <div>
      <button title="Remove Comments" className="pr-5" onClick={()=>removeComments}>
        <LucideRemoveFormatting />
      </button>
    </div>
  )
}