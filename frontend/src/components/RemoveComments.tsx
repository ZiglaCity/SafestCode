interface Props {
  removeComments: () => void;
}


export default function RemoveComments({removeComments} : Props){
  return (
    <div>
      <button className="mx-5" onClick={()=>removeComments}>
        Remove Comments
      </button>
    </div>
  )
}