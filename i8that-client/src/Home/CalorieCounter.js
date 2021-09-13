import React, { useState, useEffect } from 'react';


const CalorieCounter = () => {


    const [basecalories, setbasecalories] = useState(2800);
    
    let calculateCalories = () =>{

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        console.log(today)
    }

    return ( 
        <div>
            hello from calory CalorieCounter
            <p>{basecalories}</p>
        <button onClick={calculateCalories}>Click Me</button>
        </div>
     );
}
 
export default CalorieCounter;