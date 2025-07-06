
interface Props {
    result : string[];
}

const ResultPanel = ({result} : Props) => {
    return (
        <div className="space-y-2">
            <h2>Result</h2>
            {result.map((point, idx) => (
                <div key={idx} className="text-sm bg-zinc-900 rounded px-4 py-2 border-l-4 border-blue-500">
                <span className="font-medium text-blue-400">#{idx + 1}</span> {point}
                </div>
        ))}
        </div>

    );
}

export default ResultPanel;