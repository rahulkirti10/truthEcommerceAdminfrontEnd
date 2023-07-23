import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProductCategory = () => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [name, setName] = useState('');
  const apiUrl = process.env.REACT_APP_ADMIN_API_URL;

  const handleClick = (e) => {
    setErrorMessage('');
    e.preventDefault();
    if (name === '') {
      setErrorMessage('Please enter a valid username!');
    } else {
      const data = {
        categoryName: name
      };

      // Make the POST request
      axios.post(`${apiUrl}api/v1/admin/addProductCategory`, data, { withCredentials: true })
        .then(response => {
            setName('');
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_RIGHT
              });
        })
        .catch(error => {
          console.log(error.response);
          setErrorMessage(error.response.data.message);
        });
    }
  };

  return (
    <div>
        <ToastContainer />
        <div style={{width:'500px', marginLeft:'auto', marginRight:'auto', background:'white',
         padding:'10px', display: 'flex', alignItems:'center', height: '60vh'}}>

            <div style={{width:'350px', marginLeft:'auto', marginRight:'auto'}}>
    <form>
        <FormGroup>
            <div style={{textAlign:'center', fontSize:'30px', marginBottom:'30px'}}>
            <Label>Add Product Category</Label>
            </div>  
          <Label for="fname">Category Name</Label>
           
              <div>
                <Input
                  type="text"
                  placeholder="Category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  />
              </div>
        </FormGroup>
        <div style={{ color: 'red', marginBottom:'10px', marginTop:'-10px', height:'20px'}}>
            {errorMessage && <div> {errorMessage} </div>}
        </div>
        <Button type="submit" color="primary" style={{width:'100%'}} onClick={handleClick}>
          Submit
        </Button>
      </form>
      </div>
      </div>
      </div>
  );
};

export default AddProductCategory;
