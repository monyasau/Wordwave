import React, { useState, useEffect  } from 'react';
import axios from 'axios';

let Dictionary = ()=> {
const [userInput, setUserInput] = useState("hello");
const [dictData, setDictData] = useState(null)

const updateUserInput = (event)=>{
    setUserInput(event.target.value)
}


useEffect(()=>{
 axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`)
  .then(function (response) {
    
    setDictData(response.data)
  })
  .catch(function (error) {
    console.log(error);
  })

}
,[userInput])

    return (
        <div>
<p>count: {userInput} </p>
{/* <button onClick={updateDict()}></button> */}
<input className='border-b' type="text" autoFocus onKeyUp={updateUserInput}/>
{dictData?<div>{dictData[0].word}</div>
:<div>not found</div>
}

        </div>
    );
}

export default Dictionary;


