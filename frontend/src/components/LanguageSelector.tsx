interface Props {
  setLanguage : (language : string) => void;
}

const languages : Record<string, string> = {
  javascript : "Javascript",
  typescript : "Typescript",
  python : "Python", 
}


const LanguageSelector = ( {setLanguage} : Props) => {
  const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  }
  return (
    <select onChange={handleChange}>
      {Object.entries(languages).map(([key, value]) => 
      <option key={key} value={key}>{value}</option>)}
    </select>
  )
}


export default LanguageSelector;