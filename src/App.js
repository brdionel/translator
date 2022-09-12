import { useState, useEffect } from "react";
import TextBox from "./components/TextBox";
import Arrow from "./components/Arrow";
import Button from "./components/Button";
import Modal from "./components/Modal";
import axios from "axios";

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [inputLanguage, setInputLanguage] = useState('Portuguese')
  const [outputLanguage, setOutputLanguage] = useState('English')
  const [languages, setLanguages] = useState(null)
  const [textToTranslate, setTextToTranslate] = useState('')
  const [translatedText, setTranslatedText] = useState('')

  const getLanguages = async () => {
    const response = await axios('http://local.lentesplus.com:8080/languages')
    setLanguages(response.data)
  }

  const translateText = async () => {
    const data = { textToTranslate, outputLanguage, inputLanguage }
    const response = await axios('http://local.lentesplus.com:8080/translation', {
      params: data
    })
    setTranslatedText(response.data)
  }

  useEffect(() => {
    getLanguages()
  }, [])

  const handleClick = () => {
    setInputLanguage(outputLanguage)
    setOutputLanguage(inputLanguage)
    setTextToTranslate(translatedText)
    setTranslatedText(textToTranslate)
    console.log({translatedText})
    console.log({textToTranslate})
  }

  return (
    <div className="app">
      {
        !showModal &&  
          <>
            <TextBox
              style="input"
              selectedLanguage={inputLanguage}
              setShowModal={setShowModal}
              setTextToTranslate={setTextToTranslate}
              textToTranslate={textToTranslate}
              setTranslatedText={setTranslatedText}
            />
            <div className="arrowContainer" onClick={handleClick}>
              <Arrow />
            </div>
            <TextBox
              style="output"
              selectedLanguage={outputLanguage}
              setShowModal={setShowModal}
              translatedText={translatedText}
            />
            <div className="button-container" onClick={translateText}>
              <Button />
            </div>
          </>
      }
      { showModal && 
        <Modal 
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={showModal === 'input' ? inputLanguage : outputLanguage}
          setChosenLanguage={showModal === 'input' ? setInputLanguage : setOutputLanguage}
        /> 
      }
    </div>
  );
}

export default App;
