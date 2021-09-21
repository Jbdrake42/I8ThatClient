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
import CreateFood from '../Components/CreateFood';
import FoodEdit from '../Components/EditFoods';
import ModalTestA from '../Components/ModalTestA';

const Home = (props) => {
  const [foodEntries, setFoodEntries] = useState([]);

  const fetchFoodEntries = () => {
    fetch('http://localhost:3000/food/get', {
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
    }
  }

  const deleteFoodEntry = (food) => {
    fetch(`http://localhost:3000/food/delete/${food.id}`, {
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
            <CardTitle tag="h5">{food.id}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {food.food}
            </CardSubtitle>
            <CardText>
              <ul>
                <li>Location: {food.location}</li>
                <li>Date: {food.date}</li>
                <li>Calories: {food.calories}</li>
                <li> {food.feelings}</li>
                <li>{emojiDisplayer(food)}</li>
              </ul>
            </CardText>

            <Button
              color="warning"
              onClick={() => {
                toggle();
                editUpdateFood(food);
                // props.updateOn();
              }}
            >
              Edit
            </Button>

            <Button
              color="danger"
              onClick={() => {
                toggle2();
                editUpdateFood(food);
              }}
            >
              Click top pop
            </Button>

            <Button
              color="danger"
              onClick={() => {
                deleteFoodEntry(food);
              }}
            >
              Delete
            </Button>
          </CardBody>
        </Card>
      );
    });
  };

  return (
    <div>
      <h3>Food History</h3>
      <CreateFood token={props.token} />
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
      />
      <FoodEdit
        modal={modal}
        setModal={setModal}
        foodToUpdate={setFoodToUpdate}
        itemA={foodToUpdate.id}
        itemB={foodToUpdate.food}
        itemC={foodToUpdate.location}
        itemD={foodToUpdate.feelings}
      />
    </div>
  );
};

export default Home;
