import { useState } from "react"

export default function SubmitOptions () {

    const [checked, setChecked] = useState<string[]>(["improve"])

    interface OptionType {
        label : string,
        value : string
    }
    const options : OptionType[] = [
        {label : "Improve", value : "improve"},
        {label : "Debug", value : "debug"},
        {label : "Secure", value : "secure"},
    ]

    const handleChange = (value : string ) => {
        setChecked(checked => checked.includes(value) ? checked.filter(opt => opt !== value) : [...checked, value] )
    } 

    return (
        <div>
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