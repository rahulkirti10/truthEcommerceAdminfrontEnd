import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Loader from 'react-loader-spinner';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';


const Login = () => {
  
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showComponent, setShowComponent] = useState(false); // New state variable
  const [showloader, setShowLoader] = useState(true);
  const [showLoginLoader, setshowLoginLoader] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const apiUrl = process.env.REACT_APP_ADMIN_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}api/v1/admin/getProfile`, { withCredentials: true })
      .then(response => {
        navigate('/dashboard');
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response);
        setShowLoader(false)
        setShowComponent(true); // Set showComponent to true if the API call fails
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (username === '') {
      setErrorMessage('Please enter a valid username!');
    } else if (password === '') {
      setErrorMessage('Please enter a valid password!');
    } else {
      setshowLoginLoader(true)
      setButtonDisabled(true)
      const data = {
        email: username,
        password: password
      };

      // Make the POST request
      axios.post(`${apiUrl}api/v1/admin/login`, data, { withCredentials: true })
        .then(response => {
          navigate('/dashboard');
        })
        .catch(error => {
          setButtonDisabled(false)
          console.log(error.response);
          setshowLoginLoader(false)
          setErrorMessage(error.response.data.message);
        });
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
       {showloader ? (
      <div style={{justifyContent:'center', marginLeft:'auto', marginRight:'auto', textAlign: 'center', fontSize:'20px'}}><Loader.TailSpin color="black" width='250px'/> 
      <p>Loading your dashboard...</p>
      </div>
      ) : null}
      {showComponent ? (
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          autoComplete="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol>
                          <div style={{ color: 'red', margin: '0px 0px 15px 0px' }}>
                            {errorMessage && <div> {errorMessage} </div>}
                          </div>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs={6}>
                          <div>
                          <CButton disabled={isButtonDisabled} type="submit" color="primary" className="px-4" onClick={handleClick}>
                            Login
                          </CButton>
                          {showLoginLoader ? (
                          <div style={{display:'flex', float:'right', marginTop:'-22px', marginRight:'40px'}}>
                            <Loader.TailSpin  color="black" width='30px'/> 
                          </div>
                            ) : null}
                          </div>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                 
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Login</h2>
                    <p>Admin login. Only for authenticated people. If you have admin credentials, please login.</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
       ) : null}
    </div>
  );
};

export default Login;
