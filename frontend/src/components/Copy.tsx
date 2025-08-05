import { CopyIcon } from "lucide-react";

interface Props {
  copyCode: () => void;
}


export default function Copy({copyCode} : Props){
  return (
    <div>
      <button className="mx-5" onClick={()=>copyCode}>
        <CopyIcon />
      </button>
    </div>
  )
}