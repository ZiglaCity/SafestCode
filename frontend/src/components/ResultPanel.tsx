interface Props {
    result : string[];
		onClose: (value : boolean) => void;
}

const ResultPanel = ({result, onClose} : Props) => {
	
	const handleClick = () => {
		onClose(false);
	}
	return (
		<div className="space-y-2 bg-zinc-900">
			<div onClick={handleClick} className="text-blue-400 border border-red-500"> X </div>
			{result.map((point, idx) => (
				<div key={idx} className="text-sm bg-zinc-900 rounded px-4 py-2 border-l-4 border-blue-500">
					<span className="font-medium text-blue-400">#{idx + 1}</span> {point}
				</div>
			))}
		</div>

	);
}

export default ResultPanel;