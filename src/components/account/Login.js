
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    axios.post('https://localhost:7029/api/Account/login', formData)
      .then(response => {
        console.log(response);
        const { message, token } = response.data;

        // Parse the message to extract user session information if needed
        const userSession = {
          id: message.match(/Id = ([^,]+)/)[1],
          name: message.match(/Name = ([^,]+)/)[1],
          email: message.match(/Email = ([^,]+)/)[1],
          role: message.match(/Role = ([^}]+)/)[1]
        };

        // Retrieve existing user sessions from local storage
        const existingUserSessions = JSON.parse(localStorage.getItem('userSessions')) || [];

        // Add the new user session to the array
        const updatedUserSessions = [...existingUserSessions, userSession];

        // Store the updated user sessions array in local storage
        localStorage.setItem('userSessions', JSON.stringify(updatedUserSessions));
        localStorage.setItem('token', token);

        console.log('User Session:', userSession);
        console.log('Token:', token);

        setLoginSuccessMessage('Login successful! Redirecting to Home...');
        navigate('/home');
      })
      .catch(error => {
        console.error(error);
        setErrors({ general: 'Failed to login. Please check your credentials.' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <section style={{ backgroundColor: '#f0f0f0' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="typeEmailX-2"
                        className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="typePasswordX-2"
                        className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="form-check d-flex justify-content-start mb-4">
                      <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                      <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
                    </div>
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  </form>
                  {loginSuccessMessage && <p className="text-success mt-3">{loginSuccessMessage}</p>}
                  {errors.general && <p className="text-danger mt-3">{errors.general}</p>}
                  <hr className="my-4" />
                  <button
                    className="btn btn-lg btn-block mb-2"
                    style={{ backgroundColor: '#dd4b39', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
                    type="button"
                    onClick={() => window.location.href = 'https://accounts.google.com/signin'}
                  >
                    <i className="fab fa-google me-2" style={{ color: 'white' }}></i> Sign in with Google
                  </button>
                  <button
                    className="btn btn-lg btn-block"
                    style={{ backgroundColor: '#3b5998', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
                    type="button"
                    onClick={() => window.location.href = 'https://www.facebook.com/login'}
                  >
                    <i className="fab fa-facebook-f me-2" style={{ color: 'white' }}></i> Sign in with Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
