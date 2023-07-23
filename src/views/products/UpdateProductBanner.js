import React, { useState, useEffect } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const UpdateProductBanner = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const apiUrl = process.env.REACT_APP_ADMIN_API_URL;
  const [navigateUrl, setNavigateUrl] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${apiUrl}api/v1/admin/getProductBannerById?id=${id}`, { withCredentials: true })
      .then(response => {
        setNavigateUrl(response.data.data.navigateUrl);
        setImageUrl(response.data.data.imageUrl)
        toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
      })
      .catch(error => {
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
      });
  }, []);

  const handleInputChange = (event) => {
    const files = event.target.files;
  //  setImageUrl('')
    setImage(files[0]);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (navigateUrl === '') {
      setErrorMessage('Please enter a valid username!');
    }
    // else if(image === null)
    //   setErrorMessage('Please upload image!');
     else {
      let formData = new FormData();
      formData.append('navigateUrl', navigateUrl);
      if(image)
      formData.append('image', image);
      formData.append('id', id)

      // Make the POST request
      axios
        .put(`${apiUrl}api/v1/admin/updateProductBanner`, formData, { withCredentials: true })
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
          height: '75vh',
        }}
      >
        <div style={{ width: '350px', marginLeft: 'auto', marginRight: 'auto' }}>
          <form>
            <FormGroup>
              <div style={{ textAlign: 'center', fontSize: '30px', marginBottom: '30px' }}>
                <Label>Update Product Banner</Label>
              </div>
              <Label for="fname">Navigate Url</Label>
              <div>
                <Input
                  type="text"
                  placeholder="Category name"
                  value={navigateUrl}
                  onChange={(e) => setNavigateUrl(e.target.value)}
                />
              </div>
              <br />
              <Label for="fname">Choose Image</Label>
              <div>
                <Input type="file" onChange={handleInputChange} /><br></br>
                <Label for="fname">Image</Label><br></br>
               
                    <img src={imageUrl} height={150} width={250}/>
                 
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

export default UpdateProductBanner;
