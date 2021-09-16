import React, { useState, useEffect } from 'react';


const CalorieCounter = (props) => {


    const [basecalories, setbasecalories] = useState(2800);
    const [dailyCalorie, setDailyCalorie] = useState(0)
    const [remainingCalorie, setRemainingCalorie] = useState(0)
    let calculateCalories = () =>{
        let calorieIngested = 0
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        console.log(today)
        
        fetch('http://localhost:3000/food/get', {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: props.token,
          }),
        })
          .then((res) => res.json())
          .then((logData) => {
              
            for(let i = 0; i < logData.length; i++){
                console.log(logData[1].date)
                if(logData[i].date === today){
                    let added = logData[i].calories
                    calorieIngested = calorieIngested + added
                    setDailyCalorie(calorieIngested)
                    
                }
                
            }
            setRemainingCalorie(basecalories - dailyCalorie)
          })          
      };
      
    return ( 
        <div>
            hello from calory CalorieCounter
            <p>{basecalories}</p>
            <p>{dailyCalorie}</p>
            <p>{remainingCalorie}</p> 
        <button onClick={calculateCalories}>Click Me</button>
        </div>
     );
}
 
export default CalorieCounter;