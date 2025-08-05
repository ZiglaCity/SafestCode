import { ScissorsIcon } from "lucide-react";

interface Props {
  cutCode: () => void;
}


export default function Cut({cutCode} : Props){
  return (
    <div>
      <button className="mx-3" onClick={()=>cutCode}>
        <ScissorsIcon />
      </button>
    </div>
  )
}