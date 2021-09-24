import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

const CalorieCounter = (props) => {


    const [basecalories, setbasecalories] = useState(2800);
    const [dailyCalorie, setDailyCalorie] = useState(0)
    const [remainingCalorie, setRemainingCalorie] = useState(0)
    const [calorieactive, setcalorieactive] = useState(false);


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
                
                if(logData[i].date === today){
                    let added = logData[i].calories
                    calorieIngested = calorieIngested + added
                    let calorieleftover = basecalories - calorieIngested
                    setDailyCalorie(calorieIngested)
                    setRemainingCalorie(calorieleftover)
                    setcalorieactive(true)
                }
                
            }
            
          })          
      };
      useEffect(() => {
        calculateCalories()
      
      }, []);
    return ( 
        <div id="calorieMain">
          <h5>Daily Total</h5>
            <div class="calorieChild">
            <p><h4>Recommended Daily</h4> <h6>{basecalories} <sup>cal</sup></h6></p>
            </div>
            <div class="calorieChild">
            <p><h4>Consumed</h4> <h6>{dailyCalorie} <sup>cal</sup></h6></p>
            </div>
            <div class="calorieChild">
            <p><h4>Available</h4> <h6>{remainingCalorie} <sup>cal</sup></h6></p>
            </div>
        
        </div>
     );
}
 
export default CalorieCounter;