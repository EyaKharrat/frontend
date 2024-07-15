import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registre = () => {
  const initialFormData = {
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.Name.trim()) {
      errors.Name = 'Name is required';
    }
    if (!formData.Email.trim()) {
      errors.Email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      errors.Email = 'Email is invalid';
    }
    if (!formData.Password) {
      errors.Password = 'Password is required';
    } else if (formData.Password.length < 6) {
      errors.Password = 'Password must be at least 6 characters';
    }
    if (!formData.ConfirmPassword) {
      errors.ConfirmPassword = 'Confirm Password is required';
    } else if (formData.ConfirmPassword !== formData.Password) {
      errors.ConfirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const save = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const requestData = {
        Name: formData.Name,
        Email: formData.Email,
        Password: formData.Password,
        ConfirmPassword: formData.ConfirmPassword
      };

      const response = await axios.post("https://localhost:7029/api/Account/register", requestData);

      if (response.status === 200) {
        alert("Registration Successful");
        setFormData(initialFormData);
        setErrors({});
        navigate('/login');
      } else {
        setError("Registration Failed");
      }
    } catch (err) {
      setError(err.message || 'Error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Registre</h5>
          <form onSubmit={save}>
            <div className="form-group mb-4">
              <label htmlFor="Name">Your Name</label>
              <input
                type="text"
                id="Name"
                className={`form-control ${errors.Name ? 'is-invalid' : ''}`}
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
              {errors.Name && <div className="invalid-feedback">{errors.Name}</div>}
            </div>

            <div className="form-group mb-4">
              <label htmlFor="Email">Your Email</label>
              <input
                type="email"
                id="Email"
                className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
              {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
            </div>

            <div className="form-group mb-4">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                id="Password"
                className={`form-control ${errors.Password ? 'is-invalid' : ''}`}
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
              />
              {errors.Password && <div className="invalid-feedback">{errors.Password}</div>}
            </div>

            <div className="form-group mb-4">
              <label htmlFor="ConfirmPassword">Repeat your password</label>
              <input
                type="password"
                id="ConfirmPassword"
                className={`form-control ${errors.ConfirmPassword ? 'is-invalid' : ''}`}
                name="ConfirmPassword"
                value={formData.ConfirmPassword}
                onChange={handleChange}
                required
              />
              {errors.ConfirmPassword && <div className="invalid-feedback">{errors.ConfirmPassword}</div>}
            </div>

            <div className="form-check mb-4">
              <input className="form-check-input" type="checkbox" value="" id="form2Example3cg" required />
              <label className="form-check-label" htmlFor="form2Example3cg">
                I agree to all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-success btn-lg"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Register'}
              </button>
            </div>

            {error && <p className="text-danger mt-3">{error}</p>}

            <p className="text-center text-muted mt-4 mb-0">
              Already have an account?{' '}
              <a href="#!" onClick={() => navigate('/login')} className="fw-bold text-body">
                <u>Login here</u>
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registre;
