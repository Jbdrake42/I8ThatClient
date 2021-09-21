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
                <li>{food.location}</li>
                <li>{food.date}</li>
                <li>{food.calories}</li>
                <li>{food.emoji}</li>
                <li>{food.feelings}</li>
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
        item={foodToUpdate.food}
      />
      <FoodEdit
        modal={modal}
        setModal={setModal}
        foodToUpdate={setFoodToUpdate}
      />
    </div>
  );
};

export default Home;
