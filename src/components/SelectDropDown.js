const SelectDropDown = ({ selectedLanguage, setShowModal, style}) => {
    return (
        <div className="select-drop-down">
            <input value={selectedLanguage} onClick={() => setShowModal(style)}/>
            <div className="down-arrow">
                ⌄
            </div>
        </div>
    )
}

export default SelectDropDown