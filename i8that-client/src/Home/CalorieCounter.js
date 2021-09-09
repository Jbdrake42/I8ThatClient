import React, { useState, useEffect } from 'react';


const CalorieCounter = () => {


    const [basecalories, setbasecalories] = useState(2800);


    return ( 
        <div>


        <button onClick={calculateCalories}>Click Me</button>
        </div>
     );
}
 
export default CalorieCounter;