import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from 'reactstrap';
import FoodEdit from './EditFoods';

let greatEmoji =
  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/smiling-face-with-smiling-eyes_1f60a.png';
let goodEmoji =
  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/slightly-smiling-face_1f642.png';
let disgusted =
  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/unamused-face_1f612.png';
let gross =
  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/nauseated-face_1f922.png';

const ModalTestA = (props) => {
  const toggle2 = () => props.setModal2(!props.modal2);
  const [editFood, setEditFood] = useState(props.itemFood);
  const [editLocation, setEditLocation] = useState(props.itemLocation);
  const [editDate, setEditDate] = useState(props.itemDate);
  //   const [editEmoji, setEditEmoji] = useState('');
  const [editFeelings, setEditFeelings] = useState(props.itemFeeling);
  const [editCalories, setEditCalories] = useState(props.itemCalories);
  const [editPhoto, setEditPhoto] = useState(props.itemPhoto);

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const foodUpdate = (event, food) => {
    event.preventDefault();
    fetch(`http://localhost:3000/food/update/${props.itemId}`, {
      method: 'PUT',
      body: JSON.stringify({
        food: {
          food: editFood,
          location: editLocation,
          date: editDate,
          // emoji: editEmoji,
          feelings: editFeelings,
          calories: Number(editCalories),
          photo: editPhoto,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: props.token,
      }),
    }).then((res) => {
      props.fetchFoodEntries();
      toggle2();
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
    setEditPhoto(File.secure_url);
    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={props.modal2} toggle={toggle2}>
        <ModalHeader toggle={toggle2}>Edit Food</ModalHeader>
        <ModalBody>
          <Form onSubmit={foodUpdate}>
            <FormGroup>
              <Label htmlFor="food">Edit Food</Label>
              <Input
                name="food"
                defaultValue={props.itemFood}
                onChange={(e) => setEditFood(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="location">Edit Location</Label>
              <Input
                name="location"
                defaultValue={props.itemLocation}
                onChange={(e) => setEditLocation(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="date">Edit Date</Label>
              <Input
                name="date"
                type="date"
                defaultValue={props.itemDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </FormGroup>
            {/* <FormGroup>
              <Label htmlFor="emoji">Edit Emoji</Label>
              <Input
                name="emoji"
                defaultValue={editEmoji}
                onChange={(e) => setEditEmoji(e.target.value)}
              />
            </FormGroup> */}
            <FormGroup>
              <Label htmlFor="feelings">Edit Feelings</Label>
              <Input
                name="feelings"
                defaultValue={props.itemFeeling}
                onChange={(e) => setEditFeelings(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="calories">Edit Calories</Label>
              <Input
                name="calories"
                defaultValue={props.itemCalories}
                onChange={(e) => setEditCalories(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="photo">Edit Photo</Label>
              <Input
                name="photo"
                defaultValue={props.itemPhoto}
                onChange={(e) => setEditPhoto(e.target.value)}
              />
              <Container>
                <h1>Upload your photo here</h1>
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

            {/* <FormGroup tag="fieldset">
              <legend>Summerize Your Food Experience</legend>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    value="great"
                    onChange={(e) => setEditEmoji(e.target.value)}
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
                    onChange={(e) => setEditEmoji(e.target.value)}
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
                    onChange={(e) => setEditEmoji(e.target.value)}
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
                    onChange={(e) => setEditEmoji(e.target.value)}
                  />{' '}
                  <img src={gross} style={{ width: '50px' }} />
                </Label>
              </FormGroup>
            </FormGroup> */}

            <Button type="submit">Edit</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalTestA;
