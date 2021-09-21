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

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Edit Food</ModalHeader>
        <ModalBody>
          <Form onSubmit={foodUpdate}>
            <FormGroup>
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
            <Button type="submit">Edit</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FoodEdit;
