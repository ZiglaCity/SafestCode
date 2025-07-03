interface Props {
    checked : string[],
    onCheck : (check : string[]) => void
}

export default function SubmitOptions ({checked, onCheck} : Props) {

    interface OptionType {
        label : string,
        value : string
    }
    const options : OptionType[] = [
        {label : "Review", value : "review"},
        {label : "Debug", value : "debug"},
        {label : "Secure", value : "secure"},
    ]

    const handleChange = (value: string) => {
    const newChecked = checked.includes(value)
        ? checked.filter(opt => opt !== value)
        : [...checked, value];

    onCheck(newChecked);
    };

    return (
        <div>
            <h1>Code Review & Debugging Tool</h1>
            {options.map(option => (
                <label key={option.value} className="block ml-0">
                    <input
                        type="checkbox"
                        value={option.value}
                        checked={checked.includes(option.value)}
                        onChange={() => handleChange(option.value)}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    )
}