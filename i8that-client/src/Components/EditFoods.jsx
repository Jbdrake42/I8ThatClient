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
  Container,
} from 'reactstrap';

let greatEmoji =
  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/smiling-face-with-smiling-eyes_1f60a.png';
let goodEmoji =
  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/slightly-smiling-face_1f642.png';
let disgusted =
  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/unamused-face_1f612.png';
let gross =
  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/nauseated-face_1f922.png';

const FoodEdit = (props) => {
  const [editFood, setEditFood] = useState(props.foodToUpdate.food);
  const [editLocation, setEditLocation] = useState(props.foodToUpdate.location);
  const [editDate, setEditDate] = useState(props.foodToUpdate.date);
  const [editEmoji, setEditEmoji] = useState(props.foodToUpdate.emoji);
  const [editFeelings, setEditFeelings] = useState(props.foodToUpdate.feelings);
  const [editCalories, setEditCalories] = useState(props.foodToUpdate.calories);
  const [editPhoto, setEditPhoto] = useState(props.foodToUpdate.photo);

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  // const [modal, setModal] = useState(false);
  const toggle = () => props.setModal(!props.modal);

  const foodUpdate = (event, food) => {
    fetch(`http://localhost:3000/update/${props.foodToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        log: {
          food: editFood,
          location: editLocation,
          date: editDate,
          emoji: editEmoji,
          feelings: editFeelings,
          calories: editCalories,
          photo: editPhoto,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: props.token,
      }),
    }).then((res) => {
      props.fetchFoodEntries();
      props.updateOff();
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
    <div>
      {/* <p>{props.itemA}</p>
      <p>{props.itemB}</p>
      <p>{props.itemC}</p>
      <p>{props.itemD}</p> */}
      {console.info(props.itemD)}
      <Modal isOpen={props.modal} toggle={toggle}>
        <ModalHeader>Edit Food</ModalHeader>
        <ModalBody>
          <Form onSubmit={foodUpdate}>
            <FormGroup>
            {loading ? (
                    <h3>Loading...</h3>
                  ) : (
                    <img src={image} style={{ width: '300px' }} />
                  )}
              <Label htmlFor="food">Edit Food</Label>
              <Input
                name="food"
                value={editFood}
                onChange={(e) => setEditFood(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="location">Edit Location</Label>
              <Input
                name="location"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="date">Edit Date</Label>
              <Input
                name="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="emoji">Date Emoji</Label>
              <Input
                name="emoji"
                value={editEmoji}
                onChange={(e) => setEditEmoji(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="feelings">Edit Feelings</Label>
              <Input
                name="feelings"
                value={editFeelings}
                onChange={(e) => setEditFeelings(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="calories">Edit Calories</Label>
              <Input
                name="calories"
                value={editCalories}
                onChange={(e) => setEditCalories(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="photo">Edit Photo</Label>
              <Input
                name="photo"
                value={editPhoto}
                onChange={(e) => setEditPhoto(e.target.value)}
              />
              <Container>
                <FormGroup>
                  <Input
                    type="file"
                    name="file"
                    placeholder="Upload your file here"
                    onChange={UploadImage}
                  />
                </FormGroup>
              </Container>
            </FormGroup>
            <Button type="submit">Edit</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FoodEdit;
