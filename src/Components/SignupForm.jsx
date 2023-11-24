import React, { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      // Reset password error if it was previously set
      setPasswordError('');
      // You can perform form submission logic here
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="ignup" style={{border:'solid 2px', margin:'10em', padding: '10px'}}>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </label>
      <br />
      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
      <br />
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default SignUpForm;
