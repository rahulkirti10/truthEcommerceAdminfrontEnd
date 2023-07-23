import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Loader from 'react-loader-spinner';

const ProductBanners = () => {
  const apiUrl = process.env.REACT_APP_ADMIN_API_URL;
  const [allProducts, setProducts] = useState([]);
  const navigate = useNavigate();
  const [showloader, setShowLoader] = useState(true);
  const [showComponent, setShowComponent] = useState(false);

  // Function to add a new product
  const addProduct = () => {
    navigate('/addProductBanners');
  };

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  const updateHandleClick = (id) => {
     navigate("/updateProductBanners/" + id)
  }

  useEffect(() => {
    axios
      .get(`${apiUrl}api/v1/admin/getProductBanner`, { withCredentials: true })
      .then(response => {
        setProducts(response.data.data);
        setShowComponent(true);
        setShowLoader(false);
      })
      .catch(error => {
        console.log(error.response);
      });
  }, []);

  return (
    <div>
      {showloader ? (
        <div style={{ justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          <Loader.TailSpin color="blue" width='40px' />
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
            <p style={{ margin: 0 }}>Products List</p>
            <Button color="primary" onClick={addProduct}>
              Add New Banner
            </Button>
          </div>
          {allProducts.length === 0 ? (
            <div style={{ width: '100%', textAlign: 'center', margin: '10px' }}>
              <p>No product found.</p>
            </div>
          ) : (
            <Table hover style={{ cursor: 'pointer' }}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Navigate Url</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map(product => (
                  <tr key={product.id}>
                    <th scope="row">{product.id}</th>
                    <td>{product.navigateUrl}</td>
                    <td>
                      <img src={product.imageUrl} height={120} width={250} onClick={() => openImageInNewTab(product.imageUrl)} />
                    </td>
                    <td>
                      <Button color="secondary" onClick={() => updateHandleClick(product.id)}>
                        Update
                      </Button>
                    </td>
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

export default ProductBanners;
