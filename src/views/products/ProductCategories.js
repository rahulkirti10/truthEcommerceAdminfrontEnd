import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Loader from 'react-loader-spinner';

const ProductCategories = () => {
  const apiUrl = process.env.REACT_APP_ADMIN_API_URL;
  const [allProducts, setProducts] = React.useState([]);
  const navigate = useNavigate();
  const [showloader, setShowLoader] = React.useState(true);
  const [showComponent, setShowComponent] = React.useState(false); 

  useEffect(() => {
    axios
      .get(`${apiUrl}api/v1/admin/getAllProductCategory?pageNo=0&pageSize=50`, { withCredentials: true })
      .then(response => {
        setProducts(response.data.data);
        setShowComponent(true);
        setShowLoader(false);
      })
      .catch(error => {
        console.log(error.response);
      });
  }, []);

  // Function to add a new product
  const addProduct = () => {
    navigate('/addProductsCategory');
  };

  return (
    <div>
  {showloader ? (
      <div style={{justifyContent:'center', marginLeft:'auto', marginRight:'auto', textAlign: 'center'}}><Loader.TailSpin color="blue" width='40px'/> 
      </div>
      ) : null}
      {showComponent ? (
      <div>
      <div
        style={{
          width: '100%',
          height: '8vh',
          padding: '10px',
          borderBottom: '1px solid silver',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p style={{ margin: 0 }}>Product Category List</p>
        <Button color="primary" onClick={addProduct}>
          Add New Category
        </Button>
      </div>
      {allProducts.length === 0 ? (
        <div style={{ width: '100%', textAlign: 'center', margin: '10px' }}>
          <p>No product categories found.</p>
        </div>
      ) : (
        <Table hover style={{ cursor: 'pointer' }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map(product => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{new Date(product.dateCreated).toDateString()}</td>
                <td>{product.name}</td>
                <td> <Button color="secondary" onClick={addProduct}>
          Update
        </Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      </div>
        ) : null}
    </div>
    
  );
};

export default ProductCategories;
