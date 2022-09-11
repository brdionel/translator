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
    const options = {
      method: 'GET',
      url: 'https://google-translate20.p.rapidapi.com/languages',
      headers: {
        'X-RapidAPI-Key': '855e41655amsh0067c35c8c51509p130899jsn62de4a5ca51e',
        'X-RapidAPI-Host': 'google-translate20.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      const arrayData = Object.keys(response.data.data).map( key => response.data.data[key])
      setLanguages(arrayData)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const translateText = () => {
    const options = {
      method: 'GET',
      url: 'https://google-translate20.p.rapidapi.com/translate',
      params: {
        text: textToTranslate,
        tl: outputLanguage,
        sl: inputLanguage
      },
      headers: {
        'X-RapidAPI-Key': '855e41655amsh0067c35c8c51509p130899jsn62de4a5ca51e',
        'X-RapidAPI-Host': 'google-translate20.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setTranslatedText(response.data.data.translation)
    }).catch(function (error) {
      console.error(error);
    });
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
