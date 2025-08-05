import { BrushCleaningIcon } from "lucide-react"

interface Props {
  setCode : (code : string) => void,
}


export default function Clear({setCode} : Props){

  return (
    <div>
      <button className="" onClick={()=>setCode("")}>
        <BrushCleaningIcon />
      </button>
    </div>
  )
}