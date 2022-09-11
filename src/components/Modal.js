import { useState } from "react"

const Modal = ({ setShowModal, languages, chosenLanguage, setChosenLanguage }) => {
    
    const [searchedLanguage, setSearchedLanguage] = useState('')
    
    const filteredLangauges = languages.filter( (language) => language.toLowerCase().startsWith(searchedLanguage.toLowerCase()))
    
    const handleChange = (e) => {
        setSearchedLanguage(e.target.value)
    }

    const handleClick = (e) => {
        setChosenLanguage(e.target.textContent)
        setShowModal(null)
    }

    return (
        <div className="option-list">
            <div className="search-bar">
                <input value={searchedLanguage} onChange={handleChange}/>
                <div className="close-button" onClick={() => setShowModal(null)}>X</div>
            </div>
            <div className="option-container">
                <ul>
                    {filteredLangauges?.map((filterLanguage, _index) => (
                        <div className="list-item">
                            <div className="icon">
                                {chosenLanguage === filterLanguage ? '✓' : ''}
                            </div>
                            <li 
                                key={_index}
                                onClick={handleClick}
                                style={{color: chosenLanguage === filterLanguage ? '#8ab4f8' : null }}
                            >
                                {filterLanguage}
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Modal