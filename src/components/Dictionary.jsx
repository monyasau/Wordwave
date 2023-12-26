import { useState, useEffect } from "react";
import axios from "axios";

let Dictionary = () => {
  const [userInput, setUserInput] = useState("hello");
  const [inputValue, setInputValue] = useState("");
  const [dictData, setDictData] = useState(null);

  const updateUserInput = (event) => {
    if (event.keyCode === 13 || event.type === "click") {
      setUserInput(event.target.value);
    }else {
        //for button
        setInputValue(event.target.value)
    }
  };
  const buttonUpdateDict = ()=>{
    setUserInput(inputValue);
  }
  
  const fetchDictionaryData=()=>{
    axios
    .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`)
    .then(function (response) {
      setDictData(response.data);
      console.log(dictData);
    })
    .catch(function (error) {
      setDictData(null)
    })
  }
  useEffect(() => {
    fetchDictionaryData()
  }, [userInput]);

  return (
    <>
      <div className="">
        <div className="max-w-screen-sm mx-auto py-12">
          <div className="w-full border rounded h-16 md:text-3xl text-2xl">
            <input
            placeholder="Enter a word here to search"
              className="bg-[#f4f4f4] md:w-[96%] w-[85%]  h-full px-4"
              type="text"
              autoFocus
              onKeyUp={updateUserInput}
            />
            <button className="md:w-[4%] w-[15%] " onClick={buttonUpdateDict}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#b9b9b9"
                className="w-6 mx-auto h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <h1 className="text-[#a2a2a2] mb-3 text-3xl font-bold text-center">
            {userInput.toLocaleUpperCase()}
          </h1>

          {dictData ? (
            <div className="">
              <p className="pl-6">Definitions, Phonetics & Usage Examples of {userInput} :</p>
              {dictData[0].meanings.map((meaning, i) => (
  <div key={i} className="border my-2 p-6">
    <h4 >({(dictData[0].meanings[i].partOfSpeech).toUpperCase()})</h4>
    
    {dictData[0].meanings[i].definitions.map((definition, j) => (
      <div key={j} className="border my-4 grid grid-cols-2">
        <div className="border px-1  flex flex-wrap items-center justify-center">

            <p><strong>Definition: </strong>{definition.definition}</p>
            {definition.example && <p> <strong>Usage Example: </strong>{definition.example}</p>}
        </div>
        <div className="border px-1 flex flex-wrap items-center justify-center">
            <p><strong>Phonetic: </strong>: {dictData[0].phonetic}</p>
            <audio controls className="w-[80%]">
            <source src={dictData[0].phonetics[0].audio} type="audio/mp3" />
            Your browser does not support or has disabled playing audio
            </audio>
        </div>
      </div>
    ))}
  </div>
))}


            </div>
          ) : (
            <>
            <div className="text-center border text-4xl">Sorry, definition not found 🥺</div>
            <div className="md:text-1xl md:my-8 w-[90%] mx-auto text-center text-base">Try checking your internet connection, if that doesn't work, try again later</div>
            </>
          )}
        </div>
        {/* <pre>{JSON.stringify(dictData, null, 2)}</pre> */}
      </div>
    </>
  );
};

export default Dictionary;
