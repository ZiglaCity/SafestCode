
interface Props {
    result : string[];
}

const ResultPanel = ({result} : Props) => {
    return (
        <div>
            <h1>Result</h1>
                {result.map((point, i) => (
                <div key={i} className="text-sm py-1 border-b">
                    {point}
                </div>))}
        </div>
    );
}

export default ResultPanel;