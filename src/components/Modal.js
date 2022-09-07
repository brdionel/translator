import { useState } from "react"

const Modal = ({ setShowModal }) => {
    
    const [searchedLanguage, setSearchedLanguage] = useState('')
    const handleChange = (e) => {
        setSearchedLanguage(e.target.value)
    }

    return (
        <div className="option-list">
            <div className="search-bar">
                <input value={searchedLanguage} onChange={handleChange}/>
                <div className="close-button" onClick={() => setShowModal(null)}>X</div>
            </div>
            Modal
        </div>
    )
}

export default Modal