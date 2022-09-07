import { useState } from "react";
import TextBox from "./components/TextBox";
import Arrow from "./components/Arrow";
import Button from "./components/Button";
import Modal from "./components/Modal";

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [inputLanguage, setInputLaguage] = useState('Portuguese')
  const [outputLanguage, setOutputLanguage] = useState('English')
  console.log({ inputLanguage })
  console.log({ outputLanguage })
  console.log({ showModal })

  const handleClick = () => {
    setInputLaguage(outputLanguage)
    setOutputLanguage(inputLanguage)
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
            />
            <div className="arrowContainer" onClick={handleClick}>
              <Arrow />
            </div>
            <TextBox
              style="output"
              selectedLanguage={outputLanguage}
              setShowModal={setShowModal}
            />
          </>
      }
      { showModal && <Modal setShowModal={setShowModal}/> }
    </div>
  );
}

export default App;
