import SelectDropDown from "./SelectDropDown"

const TextBox = ({ style, selectedLanguage, setShowModal, translatedText, setTextToTranslate, textToTranslate, setTranslatedText }) => {
    
    const handleChange = (e) => {
        if(style === 'input')
            setTextToTranslate(e.target.value)
    }

    const handleClick = () => {
        setTextToTranslate('')
        setTranslatedText('')
    }
    
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
                onChange={handleChange}
                value={ style === 'output' ? translatedText : textToTranslate}
            />
            {
                style === 'input' && textToTranslate.length > 0 &&
                <div className="delete" onClick={handleClick}>
                    X
                </div>
            }
        </div>
    )
}

export default TextBox