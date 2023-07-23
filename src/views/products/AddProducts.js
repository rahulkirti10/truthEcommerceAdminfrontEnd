import React, { useState, useEffect } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddProducts = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageSizes, setErrorMessageSizes] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [ogPrice, setOgPrice] = useState('');
  const [dPrice, setDPrice] = useState('');

  const apiUrl = process.env.REACT_APP_ADMIN_API_URL;
  let [materialData, setMaterialData ] = useState('');
  let [descriptionData, setDescriptionData ] = useState('');

  const [options, setOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inputs, setInputs] = useState(['']); // State to store input values
  const [image, setImage] = useState([]);
  const [isModalOpenDescription, setIsModalOpenDescription] = useState(false);
  const [isModalOpenMaterial, setIsModalOpenMaterial] = useState(false);
  const [isModalOpenSize, setIsModalOpenSize] = useState(false);
  const [checkedS, setCheckedS] = React.useState(false);
  const [checkedM, setCheckedM] = React.useState(false);
  const [checkedL, setCheckedL] = React.useState(false);
  const [checkedXL, setCheckedXL] = React.useState(false);

  const [isDisabledS, setIsDisabledS] = React.useState(true);
  const [isDisabledM, setIsDisabledM] = React.useState(true);
  const [isDisabledL, setIsDisabledL] = React.useState(true);
  const [isDisabledXL, setIsDisabledXL] = React.useState(true);

  const [smallUnits, setSmallUnits] = React.useState('');
  const [largeUnits, setLargeUnits] = React.useState('');
  const [mediumUnits, setMediumUnits] = React.useState('');
  const [xLargeUnits, setXLargeUnits] = React.useState('');

  const [selectedCategoryValue, setSelectedCategoryValue] = useState('');

  const handleChangesmallUnits = (e) => {
    setSmallUnits(e.target.value)
  };
  const handleChangelargeUnits = (e) => {
   setLargeUnits(e.target.value)
  };
  const handleChangemediumUnits = (e) => {
   setMediumUnits(e.target.value)
  };
  const handleChangexLargeUnits = (e) => {
   setXLargeUnits(e.target.value)
  };

  const handleCategoryChange = (event) => {
    setSelectedCategoryValue(event.target.value);
  };

  const handleChangeSmallSize = () => {
    setCheckedS(!checkedS);
    if(checkedS == true)
      setIsDisabledS(true);
      else setIsDisabledS(false);
  };
  const handleChangeMediumSize = () => {
    setCheckedM(!checkedM);
    if(checkedM == true) 
      setIsDisabledM(true);
      else setIsDisabledM(false);
  };
  const handleChangeLargeSize = () => {
    setCheckedL(!checkedL);
    if(checkedL == true)
      setIsDisabledL(true);
      else setIsDisabledL(false);
  };
  const handleChangeExtraLargeSize = () => {
    setCheckedXL(!checkedXL);
    if(checkedXL == true)
      setIsDisabledXL(true);
      else setIsDisabledXL(false);
  };

  const handleInputChange = (index, event) => {
    const files = event.target.files;
    const newImage = { index, file: files[0] };
    const updatedImage = [...image];
    updatedImage[index] = newImage;
    setImage(updatedImage);

    const values = [...inputs];
    values[index] = event.target.value;
    setInputs(values);
  };

  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  const handleRemoveInput = (index) => {
    const values = [...inputs];
    values.splice(index, 1);
    setInputs(values);

    const updatedImage = [...image];
    updatedImage.splice(index, 0);
    setImage(updatedImage);
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}api/v1/admin/getAllProductCategory?pageNo=0&pageSize=50`, { withCredentials: true })
      .then(response => {
        setOptions(response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (name === '') {
      setErrorMessage('Please enter a valid Product name!');
    } 
    else if(ogPrice === '')
      setErrorMessage('Please enter a valid original price!');
    else if(dPrice === '')
      setErrorMessage('Please enter a valid discounted price!');
    else if(color === '')
      setErrorMessage('Please enter a valid color!');
    else if(selectedCategoryValue === '')
      setErrorMessage('Please choose a category!');
    else if(image.length === 0)
      setErrorMessage('Please upload product images!');
    else if(descriptionData === '')
      setErrorMessage('Please add description!');
    else if(materialData === '')
      setErrorMessage('Please upload Material and care!');
    else
    {
    if(checkedS === false&&checkedM === false&&checkedL === false&&checkedXL === false){
      setErrorMessage('Please upload product Sizes!');
    }
    let isChecked = false
    if(checkedS === true && !isChecked){
      if(smallUnits === ''){
        setErrorMessage('Please add small units!');
        isChecked = true;
      }
    }
    if(checkedM === true && !isChecked){
      if(mediumUnits === ''){
        setErrorMessage('Please add medium units!');
        isChecked = true;
      }
    }
    if(checkedL === true && !isChecked){
      if(largeUnits === ''){
        setErrorMessage('Please add large units!');
        isChecked = true;
      }
    }
    if(checkedXL === true && !isChecked){
      if(xLargeUnits === ''){
        setErrorMessage('Please add extra large units!');
        isChecked = true;
      }
    }
    if(!isChecked) {
      let formData =  new FormData();
      formData.append("color", name)
      formData.append("description", descriptionData)
      formData.append("discountedPrice", name)
      formData.append("originalPrice", name)
      formData.append("productCategoryId", selectedCategoryValue)
      formData.append("materialAndCare", materialData)
      formData.append("name", name)
      for(let i = 0; i < image.length; i++){
        formData.append("productImages[" + i + "].images", image[i].file);
      }
      formData.append("productsSizes[0].size ", "S")
      formData.append("productsSizes[0].sizesAvailable ", smallUnits)
      formData.append("productsSizes[1].size ", "M")
      formData.append("productsSizes[1].sizesAvailable ", mediumUnits)
      formData.append("productsSizes[2].size ", "L")
      formData.append("productsSizes[2].sizesAvailable ", largeUnits)
      formData.append("productsSizes[3].size ", "XL")
      formData.append("productsSizes[3].sizesAvailable ", xLargeUnits)
      // Make the POST request
        axios
          .post(`${apiUrl}api/v1/admin/addProduct`, formData, { withCredentials: true })
          .then((response) => {
            console.log(response.data)
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_RIGHT
            });
          })
          .catch((error) => {
            console.log(error.response);
            setErrorMessage(error.response.data.message);
          });
    }
  }
  }
  
  const savedSizes = () => {
    let isChecked = false
    if(checkedS === true && !isChecked){
      if(smallUnits === ''){
        setErrorMessageSizes('Please add small units!');
        isChecked = true;
      }
    }
    if(checkedM === true && !isChecked){
      if(mediumUnits === ''){
      setErrorMessageSizes('Please add medium units!');
      isChecked = true;
      }
    }
    if(checkedL === true && !isChecked){
      if(largeUnits === ''){
      setErrorMessageSizes('Please add large units!');
      isChecked = true;
      }
    }
  if(checkedXL === true && !isChecked){
      if(xLargeUnits === ''){
      setErrorMessageSizes('Please add extra large units!');
      isChecked = true;
      }
    }
    closeModalSize();
  };


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalDescription = () => {
    setIsModalOpenDescription(true);
  };

  const closeModalDescription = () => {
    setIsModalOpenDescription(false);
  };

  const openModalMaterial = () => {
    setIsModalOpenMaterial(true);
  };

  const closeModalMaterial = () => {
    setIsModalOpenMaterial(false);
  };

  const openModalSize = () => {
    setIsModalOpenSize(true);
  };

  const closeModalSize = () => {
    setIsModalOpenSize(false);
  };
  

  return (
    <div>
      <ToastContainer />
      <div style={{ width: '100%', background: 'white', padding: '15px' }}>
        <div style={{ width: '100%', margin: '0 auto' }}>
          <form>
            <FormGroup>
              <table>
                <thead>
                  <tr>
                    <th style={{ padding: '10px 20px' }}>
                      <Label for="fname">Product Name</Label>
                      <div>
                        <Input
                          type="text"
                          placeholder="Product name"
                          value={name}
                          style={{ width: '300px', padding: '10px' }}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </th>
                    <th style={{ padding: '10px 20px' }}>
                      <Label for="fname">Product Color</Label>
                      <div>
                        <Input
                          type="text"
                          placeholder="Product color"
                          value={color}
                          style={{ width: '300px', padding: '10px' }}
                          onChange={(e) => setColor(e.target.value)}
                        />
                      </div>
                    </th>
                    <th style={{ padding: '10px 20px' }}>
                      <Label for="fname">Product Category</Label>
                      <div>
                        <select value={selectedCategoryValue} onChange={handleCategoryChange}
                          style={{ width: '300px', height: '47px', borderRadius: '5px', border: '1px solid silver', padding: '10px' }}
                        >
                          <option value="">Choose category</option>
                          {options.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th style={{ padding: '10px 20px' }}>
                      <Label for="fname">Original Price</Label>
                      <div>
                        <Input
                          type="text"
                          placeholder="Original Price"
                          value={ogPrice}
                          style={{ width: '300px', padding: '10px' }}
                          onChange={(e) => setOgPrice(e.target.value)}
                        />
                      </div>
                    </th>
                    <th style={{ padding: '10px 20px' }}>
                      <Label for="fname">Discounted Price</Label>
                      <div>
                        <Input
                          type="text"
                          placeholder="Discounted Price"
                          value={dPrice}
                          style={{ width: '300px', padding: '10px' }}
                          onChange={(e) => setDPrice(e.target.value)}
                        />
                      </div>
                    </th>
                    <th style={{ padding: '10px 20px' }}>
                      <Label for="fname">Add Product Images</Label>
                      <div>
                        <Button type="button" style={{ width: '100%', background: '#1B4B66', height: '45px', color: 'white' }} onClick={openModal}>
                          Add Images
                        </Button>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th style={{ padding: '10px 20px' }}>
                    <Label for="fname">Add Description</Label>
                      <div>
                        <Button type="button" style={{ width: '100%', background: '#347E47', height: '45px', color: 'white' }} onClick={openModalDescription}>
                          Add Description...
                        </Button>
                      </div>
                    </th>
                    <th style={{ padding: '10px 20px' }}>
                    <Label for="fname">Add Material and care</Label>
                      <div>
                        <Button type="button" style={{ width: '100%', background: '#901760', height: '45px', color: 'white' }} onClick={openModalMaterial}>
                          Add Material and care
                        </Button>
                      </div>
                    </th>
                    <th style={{ padding: '10px 20px' }}>
                      <Label for="fname">Add Product Sizes</Label>
                      <div>
                        <Button type="button" style={{ width: '100%', background: '#901E17', height: '45px', color: 'white' }} onClick={setIsModalOpenSize}>
                          Add Sizes
                        </Button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="3" style={{ padding: '10px 20px' }}>
                      <div style={{ color: 'red', marginBottom: '10px', marginTop: '-10px', height: '25px', fontSize:'18px' }}>
                        {errorMessage && <div>{errorMessage}</div>}
                      </div>
                      <Button type="submit" color="primary" style={{ width: '100%' }} onClick={handleClick}>
                        Submit
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FormGroup>
          </form>
        </div>
      </div>
      <Modal isOpen={isModalOpen} toggle={closeModal} backdrop="static">
        <ModalHeader toggle={closeModal}>Add Product Images</ModalHeader>
        <ModalBody>
          {inputs.map((input, index) => (
            <div key={index}>
              <div>
                <span>
                  <Input type="file" onChange={(event) => handleInputChange(index, event)} style={{ marginTop: '15px', width: '100%' }}></Input>
                  {image[index] && (
                    <img alt="preview image" src={URL.createObjectURL(image[index].file)} height={200} width={200} />
                  )}
                </span><br/>
                {index !== inputs.length - 1 && (
                  <CIcon icon={cilTrash} onClick={() => handleRemoveInput(index)} style={{ cursor: 'pointer', float: 'right', height: '30px', width: '25px', color: 'red', marginLeft: '10px', marginTop: '12px' }} />
                )}

              </div>
              <div>
                {index === inputs.length - 1 && (
                  <Button color="warning" onClick={handleAddInput} style={{ marginTop: '10px', float: 'right' }}>Add more</Button>
                )}
              </div>
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeModal}>Save</Button>
          <Button color="secondary" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

{/* description modal */}
      <Modal isOpen={isModalOpenDescription} toggle={closeModalDescription} backdrop="static">
        <ModalHeader toggle={closeModalDescription}>Add Product Description</ModalHeader>
        <ModalBody>
        <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                       console.log( editor.getData() );
                    } }
                    onBlur={ ( event, editor ) => {
                      setDescriptionData(editor.getData());
                    } }
                    onFocus={ ( event, editor ) => {
                      
                        console.log( 'Focus.', editor );
                    } }
                />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeModalDescription}>Save</Button>
          <Button color="secondary" onClick={closeModalDescription}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Material and care modal */}
      <Modal isOpen={isModalOpenMaterial} toggle={closeModalMaterial} backdrop="static" style={{height:'500px'}}>
        <ModalHeader toggle={closeModalMaterial}>Add Product Material and care</ModalHeader>
        <ModalBody>
        <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                      
                    } }
                    onBlur={ ( event, editor ) => {
                      setMaterialData(editor.getData())
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeModalMaterial}>Save</Button>
          <Button color="secondary" onClick={closeModalMaterial}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Product size modal */}
      <Modal isOpen={isModalOpenSize} toggle={closeModalSize} backdrop="static" style={{height:'500px'}}>
        <ModalHeader toggle={closeModalSize}>Add Product Sizes</ModalHeader>
        <ModalBody>
        <div>
          <p>Choose Product Sizes</p>
        </div>
        <div>
          <input type="checkbox" onClick={handleChangeSmallSize} checked={checkedS} style={{height:'20px', width:'20px'}}/>
          <div onClick={handleChangeSmallSize} style={{background:'silver', height:'50px', width:'11%', borderRadius:'50%',
          textAlign:'center', alignItems:'center', display: 'inline-block',  background: '#EAEAEA', fontSize:'20px', margin:'5px', cursor:'pointer'}}>
            <p style={{marginTop:'18%'}}>S</p>
          </div>
          <div style={{float:'right', marginRight:'35%' ,marginTop:'12px'}}>
            <Input type='text' placeholder='Enter Units' value={smallUnits} onChange={handleChangesmallUnits} disabled={isDisabledS}/>
          </div>
          <br/>
          <input type="checkbox" checked={checkedM} onClick={handleChangeMediumSize} style={{height:'20px', width:'20px'}}/>
          <div onClick={handleChangeMediumSize} style={{background:'silver', height:'50px', width:'11%', borderRadius:'50%',
          textAlign:'center', alignItems:'center', display: 'inline-block',  background: '#EAEAEA', fontSize:'20px', margin:'5px', cursor:'pointer'}}>
            <p style={{marginTop:'18%'}}>M</p>
          </div>
          <div style={{float:'right', marginRight:'35%' ,marginTop:'12px'}}>
            <Input type='text' placeholder='Enter Units' value={mediumUnits} onChange={handleChangemediumUnits}  disabled={isDisabledM}/>
          </div>
          <br/>
          <input type="checkbox" checked={checkedL} onClick={handleChangeLargeSize} style={{height:'20px', width:'20px'}}/>
          <div onClick={handleChangeLargeSize} style={{background:'silver', height:'50px', width:'11%', borderRadius:'50%',
          textAlign:'center', alignItems:'center', display: 'inline-block',  background: '#EAEAEA', fontSize:'20px', margin:'5px', cursor:'pointer'}}>
            <p style={{marginTop:'18%'}}>L</p>
          </div> <div style={{float:'right', marginRight:'35%' ,marginTop:'12px'}}>
            <Input type='text' placeholder='Enter Units' value={largeUnits} onChange={handleChangelargeUnits}  disabled={isDisabledL}/>
          </div>
          <br/>
          <input type="checkbox" checked={checkedXL} onClick={handleChangeExtraLargeSize} style={{height:'20px', width:'20px'}}/>
          <div onClick={handleChangeExtraLargeSize} style={{background:'silver', height:'50px', width:'11%', borderRadius:'50%',
          textAlign:'center', alignItems:'center', display: 'inline-block',  background: '#EAEAEA', fontSize:'20px', margin:'5px', cursor:'pointer'}}>
            <p style={{marginTop:'18%'}}>XL</p>
          </div>
          <div style={{float:'right', marginRight:'35%' ,marginTop:'12px'}}>
            <Input type='text' placeholder='Enter Units' value={xLargeUnits} onChange={handleChangexLargeUnits}  disabled={isDisabledXL}/>
          </div>
        </div>
        </ModalBody>
        <ModalFooter>
         <div style={{ color: 'red', marginBottom: '10px', marginTop: '-10px', height: '25px', fontSize:'18px' }}></div>
            {errorMessageSizes && <div>{errorMessageSizes}
            </div>}
          <Button color="primary" onClick={savedSizes}>Save</Button>
          <Button color="secondary" onClick={closeModalSize}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddProducts;
