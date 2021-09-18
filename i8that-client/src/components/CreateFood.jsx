import React, { useState } from 'react';

import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';

const CreateFood = (props) => {
  const [food, setFood] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [emoji, setEmoji] = useState("");
  const [feelings, setFeelings] = useState("");
  const [calories, setCalories] = useState("");
  const [photo, setPhoto] = useState("");

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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


  const UploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'i8Images');
    setLoading(true);
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dounpk3nt/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const File = await res.json();
    console.log(File.secure_url);
    setImage(File.secure_url);
    setPhoto(File.secure_url);
    setLoading(false);
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>Track Food</Button>
      <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Track Food</ModalHeader>
        <ModalBody>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="food">Food</Label>
          <Input
            name="food"
            value={food}
            onChange={(e) => setFood(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="location">Location</Label>
          <Input
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="emoji">Emoji</Label>
          <Input
            name="emoji"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="feelings">Feelings</Label>
          <Input
            name="feelings"
            value={feelings}
            onChange={(e) => setFeelings(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="calories">Calories</Label>
          <Input
            name="calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="photo">Photo</Label>
          <Input
            name="photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        <Container>
        <h1>Upload your image here</h1>
        <FormGroup>
          <Input
            type="file"
            name="file"
            placeholder="Upload your file here"
            onChange={UploadImage}
          />
          <br />
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <img src={image} style={{ width: '300px' }} />
          )}
        </FormGroup>
      </Container>
        </FormGroup>
        <Button type="submit">Click to Submit</Button>
      </Form>
      </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateFood;