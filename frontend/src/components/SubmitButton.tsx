interface ButtonType {
    onSubmit? : () => void
}
const SubmitButton = ({onSubmit} : ButtonType) => {
    return (
        <button onClick={onSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Submit Code
        </button>
    )
}

export default SubmitButton;