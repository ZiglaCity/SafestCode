import { CopyIcon } from "lucide-react";

interface Props {
  copyCode: () => void;
}


export default function Copy({copyCode} : Props){
  return (
    <div>
      <button title="Copy" className="mx-3" onClick={()=>copyCode}>
        <CopyIcon />
      </button>
    </div>
  )
}