import { SaveIcon } from "lucide-react";

interface Props {
  saveFile: () => void;
}


export default function RemoveComments({saveFile} : Props){
  return (
    <div>
      <button className="mx-5" onClick={()=>saveFile}>
        <SaveIcon />
      </button>
    </div>
  )
}