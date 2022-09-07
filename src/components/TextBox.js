import SelectDropDown from "./SelectDropDown"

const TextBox = ({ style, selectedLanguage, setShowModal }) => {
    return (
        <div className={style}>
            <SelectDropDown 
                style={style}
                selectedLanguage={selectedLanguage} 
                setShowModal={setShowModal}
            />
            <textarea
                placeholder={ style === 'input' ? 'Enter text': 'Translation' }
                disabled={ style === 'output' ? true : false }
            />
        </div>
    )
}

export default TextBox