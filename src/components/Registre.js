import React, { useState } from 'react';
import axios from 'axios';

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
      // Prepare data in the format expected by your API (UserDTO)
      const requestData = {
        Name: formData.Name,
        Email: formData.Email,
        Password: formData.Password,
        ConfirmPassword: formData.ConfirmPassword
      };

      // Make POST request to your .NET Core API
      const response = await axios.post("http://localhost:5129/api/Account/register", requestData);

      // Handle success
      alert("Registration Successful");
      setFormData(initialFormData);
      setErrors({});
      // Optionally, you might want to handle the response or redirect the user
    } catch (err) {
      // Handle errors
      setError(err.message || 'Error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section style={{ backgroundColor: '#f0f0f0' }}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    <form onSubmit={save}>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="Name">Your Name</label>
                        <input
                          type="text"
                          id="Name"
                          className="form-control form-control-lg"
                          name="Name"
                          value={formData.Name}
                          onChange={handleChange}
                          required
                        />
                        {errors.Name && <div style={{ color: 'red' }}>{errors.Name}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="Email">Your Email</label>
                        <input
                          type="email"
                          id="Email"
                          className="form-control form-control-lg"
                          name="Email"
                          value={formData.Email}
                          onChange={handleChange}
                          required
                        />
                        {errors.Email && <div style={{ color: 'red' }}>{errors.Email}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="Password">Password</label>
                        <input
                          type="password"
                          id="Password"
                          className="form-control form-control-lg"
                          name="Password"
                          value={formData.Password}
                          onChange={handleChange}
                          required
                        />
                        {errors.Password && <div style={{ color: 'red' }}>{errors.Password}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="ConfirmPassword">Repeat your password</label>
                        <input
                          type="password"
                          id="ConfirmPassword"
                          className="form-control form-control-lg"
                          name="ConfirmPassword"
                          value={formData.ConfirmPassword}
                          onChange={handleChange}
                          required
                        />
                        {errors.ConfirmPassword && <div style={{ color: 'red' }}>{errors.ConfirmPassword}</div>}
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" required />
                        <label className="form-check-label" htmlFor="form2Example3cg">
                          I agree to all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          disabled={loading}
                        >
                          Register
                        </button>
                      </div>

                      {loading && <p>Loading...</p>}
                      {error && <p style={{ color: 'red' }}>{error}</p>}

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account? <a href="#!" className="fw-bold text-body"><u>Login here</u></a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registre;
