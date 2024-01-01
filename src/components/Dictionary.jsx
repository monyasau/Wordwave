import { useState, useEffect } from "react";
import axios from "axios";

let Dictionary = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dictData, setDictData] = useState([]);

  const updateUserInput = (event) => {
    setError(false);

    if (event.keyCode === 13 || event.type === "click") {
      fetchDictionaryData();
    } else {
      setQuery(event.target.value);
    }
  };

  const fetchDictionaryData = async () => {
    setDictData([]);
    setLoading(true);

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;
    await axios
      .get(url)
      .then(function (response) {
        const newData = response.data;
        setDictData(newData);
        console.log(newData);
      })
      .catch(function (error) {
        setError(true);
      });

    setLoading(false);
  };

  console.log(window.navigator.onLine);
  // useEffect(() => {
  //   fetchDictionaryData();
  // }, [query]);

  return (
    <div className="flex-grow p-4">
      <div className="">
        <div className="max-w-screen-sm mx-auto py-12">
          <h1 className="text-center text-xl font-medium py-4">WordWave</h1>

          <div className="w-full border rounded bg-white text-lg flex items-center overflow-hidden p-4">
            <input
              placeholder="Enter a word here to search"
              className="flex-grow h-full focus:outline-none"
              type="text"
              autoFocus
              onKeyUp={updateUserInput}
            />
            {loading ? (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-500 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ) : (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-500"
                onClick={fetchDictionaryData}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            )}
          </div>

          {dictData.length ? (
            <div className="">
              <p className="text-[#455] p-4 text-lg text-center">
                Search Results for: "{query}"
              </p>

              <p className="pl-6">
                Definitions, Synonyms, Phonetics & Usage Examples of{" "}
                <span className="font-bold"> {query}</span> :
              </p>

              {dictData[0].meanings[0].synonyms.length ? (
                <div className="border bg-white my-4 p-6">
                  {<span className="font-bold"> Synonyms:</span>}
                  {dictData[0].meanings[0].synonyms.map(
                    (synonym, synonymIteration) => (
                      <span
                        key={synonymIteration}
                        className="text-[#444] text-base"
                      >
                        {" "}
                        {synonym},
                      </span>
                    )
                  )}
                </div>
              ) : (
                <div className="border bg-white my-4 p-6">
                  <span className="font-bold">Synonyms: </span>{" "}
                  <span className="text-[#444]"> No synonyms found</span>
                </div>
              )}

              {dictData[0].meanings.map((meaning, i) => (
                <div key={i} className="border  bg-white my-2 p-6">
                  <h4>
                    ({dictData[0].meanings[i].partOfSpeech.toUpperCase()})
                  </h4>

                  {dictData[0].meanings[i].definitions.map((definition, j) => (
                    <>
                      <div key={j} className="my-4 grid md:grid-cols-2">
                        <div className="border p-4  flex flex-col justify-center">
                          <p>
                            <span className="font-bold">Definition: </span>
                            {definition.definition}
                          </p>
                          {definition.example && (
                            <p>
                              <span className="font-bold">Usage Example: </span>
                              {definition.example}
                            </p>
                          )}
                        </div>
                        <div className="border p-4 items-center justify-center">
                          <p className="text-center pb-2">
                            <span className="font-bold">Phonetic: </span>{" "}
                            {dictData[0].phonetic}
                          </p>
                          {dictData &&
                            dictData[0]?.phonetics &&
                            dictData[0]?.phonetics[0] && (
                              <audio controls className="w-2/3 mx-auto">
                                <source
                                  src={dictData[0].phonetics[0].audio}
                                  type="audio/mp3"
                                />
                                Your browser does not support or has disabled
                                playing audio
                              </audio>
                            )}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <>
              {query && error ? (
                <div className="py-4">
                  <div className="text-center text-lg">
                    Sorry, definition not found 🥺
                  </div>
                </div>
              ) : (
                <div className="text-sm text-center p-4">
                  Dive into the knowledge ocean! What are you searching for
                  today?
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
