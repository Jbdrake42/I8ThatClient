import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardColumns,
  CardSubtitle,
  CardBody,
} from 'reactstrap';
import APIURL from '../helpers/environment';
import ModalTestA from '../Components/ModalTestA';

const Home = (props) => {
  const [foodEntries, setFoodEntries] = useState([]);

  const fetchFoodEntries = () => {
    fetch(`${APIURL}/food/get`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        setFoodEntries(logData);
        console.info(logData);
      });
  };
  useEffect(() => {
    fetchFoodEntries();
  }, []);

  // ========== Example 1a
  const [foodToUpdate, setFoodToUpdate] = useState([]);
  const editUpdateFood = (food) => {
    setFoodToUpdate(food);
    console.info(food);
    console.info(food.id);
    // console.info({ food.food });
  };

  // ========== Start final
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  // ========== End final

  const name = 'Yippee';

  // ===== Example 2

  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);

  // ==============End Example 2

  const updateOff = () => {
    setModal(false);
  };

  function emojiDisplayer(e) {
    if (e.emoji === 'great') {
      return (
        <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/smiling-face-with-smiling-eyes_1f60a.png" />
      );
    } else if (e.emoji === 'good') {
      return (
        <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/slightly-smiling-face_1f642.png" />
      );
    } else if (e.emoji === 'disgusted') {
      return (
        <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/unamused-face_1f612.png" />
      );
    } else if (e.emoji === 'gross') {
      return (
        <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/nauseated-face_1f922.png" />
      );
    } else {
      console.log("no emogi for you")
    }
  }

  const deleteFoodEntry = (food) => {
    fetch(`${APIURL}/food/delete/${food.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: props.token,
      }),
    }).then(() => fetchFoodEntries());
    console.log({ food });
  };

  const foodMapper = () => {
    return foodEntries.map((food, index) => {
      return (
        <Card key={index}>
          <CardImg top width="100%" src={food.photo} alt="Card image cap" />
          <CardBody>
            <CardTitle tag="h1">{food.food}</CardTitle>
            <CardText>
              <ul type="none">
                <li>Place: {food.location}</li>
                <li>Total Calories: {food.calories}</li>
                <li>Feelings: {food.feelings}</li>
                </ul>
                <p class="emojiright">{emojiDisplayer(food)}</p>
            </CardText>

            {/* <Button color="warning" onClick={() => {props.edit(workout); props.updateOn()}}>Update</Button> */}


            {/* <Button
              color="warning"
              onClick={() => {
                toggle();
                editUpdateFood(food);
                // props.updateOn();
              }}
            >
              Edit
            </Button> */}

            <Button
              className="button2"
              onClick={(event) => {
                toggle2();
                editUpdateFood(food);
              }}
            >
              Edit
            </Button>


            <Button className="button1"
              onClick={() => {
                deleteFoodEntry(food);
              }}
            >
              Delete
            </Button>
            <br /><br /><br />
            <h2>{food.date}</h2>
          </CardBody>
        </Card>
      );
    });
  };

  return (
    <div class="main">
      <CardColumns> {foodMapper()}</CardColumns>

      <ModalTestA
        modal2={modal2}
        setModal2={setModal2}
        info={name}
        itemId={foodToUpdate.id}
        itemFood={foodToUpdate.food}
        itemLocation={foodToUpdate.location}
        itemDate={foodToUpdate.date}
        itemFeeling={foodToUpdate.feelings}
        itemCalories={foodToUpdate.calories}
        itemPhoto={foodToUpdate.photo}
        token={props.token}
        fetchFoodEntries={fetchFoodEntries}
        updateOff={updateOff}
      />
    </div>
  );
};

export default Home;
