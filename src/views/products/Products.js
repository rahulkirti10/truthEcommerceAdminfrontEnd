import React, {useEffect} from 'react';
import { Table } from 'reactstrap';
import { Button } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Loader from 'react-loader-spinner';
import { useDispatch } from 'react-redux';

const Products = () => {
  const apiUrl = process.env.REACT_APP_ADMIN_API_URL;
   const [allProducts, setProducts] = React.useState([]);
   const navigate = useNavigate();
    //Function to add a new product
    const addProduct = () => {
        navigate('/addProducts');
    };

    const openImageInNewTab = (imageUrl) => {
      window.open(imageUrl, '_blank');
    };

  const [showloader, setShowLoader] = React.useState(true);
  const [showComponent, setShowComponent] = React.useState(false); 

    useEffect(() => {
      axios
        .get(`${apiUrl}api/v1/admin/getAllProduct?pageNo=0&pageSize=50`, { withCredentials: true })
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
                    <p style={{ margin: 0 }}>Products List</p>
                    <Button color="primary" onClick={addProduct}>
                      Add New Product
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
                        <th>Date</th>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Discounted Price</th>
                        <th>Original Price</th>
                        <th>Color</th>
                        <th>Description</th>
                        <th>Material & Care</th>
                        <th>Images</th>
                        <th>Sizes & available units</th>
                        <th>Action</th>
                       
                        </tr>
                      </thead>
                      <tbody>
                        {allProducts.map(product => (
                           <tr key={product.id}>
                           <th scope="row">{product.id}</th>
                           <td>{new Date(product.dateCreated).toDateString()}</td>
                           <td>{product.status}</td>
                           <td>{product.name}</td>
                           <td>{product.discountedPrice}</td>
                           <td>{product.originalPrice}</td>
                           <td>{product.color}</td>
                           <td><div>{product.description}</div></td>
                           <td><div>{product.materialAndCare}</div></td>
                           <td>
                           {product.productImages.map(image => (
                            <td key={image.id}>
                              <img src = {image.imageUrl} onClick={() => openImageInNewTab(image.imageUrl)} height={50} width={50} />
                            </td>
                           
                        ))}
                        </td>
                        <td>
                           {product.productsSizes.map(sizes => (
                            <td key={sizes.id}>
                             [ {sizes.size}, {sizes.sizesAvailable}] 
                            </td>
                           
                        ))}
                        </td>
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

export default Products;
