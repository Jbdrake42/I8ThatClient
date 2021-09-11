import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const CreateFood = (props) => {
  const [food, setFood] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [emoji, setEmoji] = useState('');
  const [feelings, setFeelings] = useState('');
  const [calories, setCalories] = useState('');
  const [photo, setPhoto] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/food/create', {
      method: 'POST',
      body: JSON.stringify({
        food: {
          food: food,
          location: location,
          date: date,
          emoji: emoji,
          feelings: feelings,
          calories: calories,
          photo: photo,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        setFood('');
        setLocation('');
        setDate('');
        setEmoji('');
        setFeelings('');
        setCalories('');
        setPhoto('');
      });
  };
  return (
    <>
      <h3>Log a Workout</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="food" />
          <Input
            name="food"
            value={food}
            onChange={(e) => setFood(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="location" />
          <Input
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="date" />
          <Input
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="emoji" />
          <Input
            name="emoji"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="feelings" />
          <Input
            name="feelings"
            value={feelings}
            onChange={(e) => setFeelings(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="calories" />
          <Input
            name="calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="photo" />
          <Input
            name="photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </FormGroup>

        <Button type="submit">Click to Submit</Button>
      </Form>
    </>
  );
};

export default CreateFood;
