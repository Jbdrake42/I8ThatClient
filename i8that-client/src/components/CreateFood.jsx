import React, { useState } from 'react';
import APIURL from '../helpers/environment';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';
let greatEmoji = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/smiling-face-with-smiling-eyes_1f60a.png"
let goodEmoji ="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/slightly-smiling-face_1f642.png"
let disgusted ="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/unamused-face_1f612.png"
let gross = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/nauseated-face_1f922.png"


const CreateFood = (props) => {
  const [food, setFood] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [emoji, setEmoji] = useState('');
  const [feelings, setFeelings] = useState('');
  const [calories, setCalories] = useState('');
  const [photo, setPhoto] = useState('');

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${APIURL}/food/create`, {
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
        toggle();
        window.location.href = '/';
      });
  };

  function setEmojo(e){
    setEmoji(e.target.value); 
    //toggle()
  }

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
      <a class="nav" onClick={toggle}>
        Track Food
      </a>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><h3>Track Food</h3></ModalHeader>
        <ModalBody>
      <Form onSubmit={handleSubmit}>
      {loading ? (
            <h3>Loading...</h3>
          ) : (
            <center><img src={image} style={{ width: '300px' }} /></center>
          )}
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
          <br />
        <FormGroup>
          <Input
            type="file"
            name="file"
            className="photoupload"
            placeholder="Upload your file here"
            onChange={UploadImage}
          />
        </FormGroup>
      </Container>
        </FormGroup>
        <FormGroup tag="fieldset">
              <legend>Summerize Your Food Experience</legend>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    value="great"
                    onChange={(e) => setEmoji(e.target.value)}
                  />{' '}
                  <img src={greatEmoji} style={{ width: '50px' }} />
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    value="good"
                    onChange={(e) => setEmoji(e.target.value)}
                  />{' '}
                  <img src={goodEmoji} style={{ width: '50px' }} />
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    value="disgusted"
                    onChange={(e) => setEmoji(e.target.value)}
                  />{' '}
                  <img src={disgusted} style={{ width: '50px' }} />
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    value="gross"
                    onChange={(e) => setEmoji(e.target.value)}
                  />{' '}
                  <img src={gross} style={{ width: '50px' }} />
                </Label>
              </FormGroup>
            </FormGroup>
            <Button className="button" type="submit">Submit</Button>
      </Form>
      </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateFood;
