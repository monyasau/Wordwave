import { useState, useEffect } from "react";
import axios from "axios";

let Dictionary = () => {
  const [userInput, setUserInput] = useState();
  const [dictData, setDictData] = useState(null);

  const updateUserInput = (event) => {
    if (event.keyCode === 13) {
      setUserInput(event.target.value);
    }
  };

  useEffect(() => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`)
      .then(function (response) {
        setDictData(response.data);
        console.log(dictData);
      });
    //   .catch(function (error) {
    //     setDictData(error.data.title)
    //   })
    {
      setDictData(null);
    }
  }, [userInput]);

  return (
    <>
      <div className="">
        <div className="max-w-screen-sm mx-auto md:py-36 py-12">
          <div className="w-full border rounded h-16 text-3xl">
            <input
              className="bg-[#f4f4f4] w-[96%] h-full px-4"
              type="text"
              autoFocus
              onKeyUp={updateUserInput}
            />
            <button className="w-[4%]" onClick={updateUserInput}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#b9b9b9"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <h1 className="text-darkGray mb-3 text-3xl font-bold">
            Word:{userInput}{" "}
          </h1>

          {dictData ? (
            <div className="">
              Definitions :{" "}
              {dictData[0].meanings.map((meaning, i) => (
                <div key={i}>
                  <li> {dictData[0].meanings[i].definitions[0].definition}</li>
                </div>
              ))}
            </div>
          ) : (
            <div>Sorry, definition not found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dictionary;
