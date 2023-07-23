import React, { useState } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProductBanner = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const apiUrl = process.env.REACT_APP_ADMIN_API_URL;

  const handleInputChange = (event) => {
    const files = event.target.files;
    setImage(files[0]);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (name === '') {
      setErrorMessage('Please enter a valid username!');
    }
    else if(image === null)
      setErrorMessage('Please upload image!');
     else {
      let formData = new FormData();
      formData.append('navigateUrl', name);
      formData.append('image', image);

      // Make the POST request
      axios
        .post(`${apiUrl}api/v1/admin/addProductBanner`, formData, { withCredentials: true })
        .then((response) => {
          setName('');
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.log(error.response);
          setErrorMessage(error.response.data.message);
        });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div
        style={{
          width: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
          background: 'white',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          height: '60vh',
        }}
      >
        <div style={{ width: '350px', marginLeft: 'auto', marginRight: 'auto' }}>
          <form>
            <FormGroup>
              <div style={{ textAlign: 'center', fontSize: '30px', marginBottom: '30px' }}>
                <Label>Add Product Banner</Label>
              </div>
              <Label for="fname">Navigate Url</Label>
              <div>
                <Input
                  type="text"
                  placeholder="Category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <br />
              <Label for="fname">Choose Image</Label>
              <div>
                <Input type="file" onChange={handleInputChange} />
              </div>
            </FormGroup>
            <div style={{ color: 'red', marginBottom: '10px', marginTop: '-10px', height: '20px' }}>
              {errorMessage && <div>{errorMessage}</div>}
            </div>
            <Button type="submit" color="primary" style={{ width: '100%' }} onClick={handleClick}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductBanner;
