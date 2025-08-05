interface Props {
  setCode : (code : string) => void,
}


export default function Clear({setCode} : Props){

  return (
    <div>
      <button className="" onClick={()=>setCode("")}>
        Clear
      </button>
    </div>
  )
}