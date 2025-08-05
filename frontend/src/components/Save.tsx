import { SaveIcon } from "lucide-react";

interface Props {
  saveFile: () => void;
}


export default function Save({saveFile} : Props){
  return (
    <div>
      <button title="Save" className="mx-3" onClick={saveFile}>
        <SaveIcon />
      </button>
    </div>
  )
}