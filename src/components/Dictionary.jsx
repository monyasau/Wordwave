import React, { useState, useEffect  } from 'react';
import axios from 'axios';

let Dictionary = ()=> {
const [userInput, setUserInput] = useState("hello");
const [dictData, setDictData] = useState(null)

const updateUserInput = (event)=>{
    setUserInput(event.target.value)
}

    return (
        <div>
<p>count: {userInput} </p>
{/* <button onClick={updateDict()}></button> */}
<input className='border-b' type="text" autoFocus onKeyUp={updateUserInput}/>


        </div>
    );
}

export default Dictionary;


