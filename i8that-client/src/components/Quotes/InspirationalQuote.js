import React, { useState } from 'react';
import {QuoteArray} from './quoteArray'


const Quote = () => {
    const [inspiration, setinspiration] = useState("");
    const [quoteActivate, setQuoteActivate] = useState(false)
    
  
    function randomNumber(min, max) {
        let step1 = max - min + 1;
        let step2 = Math.random() * step1;
        let result = Math.floor(step2) + min
        return result
      }

      let num = randomNumber(0,9)

      function QuoteatizeMeCaptain(){
          console.log("yo")
          setinspiration(QuoteArray[randomNumber(0,16)])
        setQuoteActivate(true)
      }
  


    return ( 
        <div>
            <a class="nav" onClick={QuoteatizeMeCaptain}>Inspire Me</a>
            {quoteActivate ? <p class="quote"><h3>Inspiration</h3>{inspiration}</p> : <></> }
        </div>
     );
}
 
export default Quote;