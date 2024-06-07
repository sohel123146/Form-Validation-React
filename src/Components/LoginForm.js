import React, { useState } from 'react';

export default function Form(props) {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const [previewData,setPreviewData] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updateFormData = {...formData,[name]: value}
    setFormData(updateFormData);

    // Trigger validation on field change
    validate(updateFormData);
  };

  const validate = (data) => {
    let isValid = true;
    let errors = {};

    if (data.fullname.trim() === '') {
      errors.fullname = 'Full Name is required';
      isValid = false;
    } else if (data.fullname.trim().length < 3) {
      errors.fullname = 'Full Name must contain at least 3 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email.trim() === '') {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(data.email)) {
      errors.email = 'Email is not valid';
      isValid = false;
    }

    if (data.password.trim() === '') {
      errors.password = 'Password is required';
      isValid = false;
    } else if (data.password === 'password') {
      errors.password = "Password can't be 'password'";
      isValid = false;
    } else if (data.password === data.fullname) {
      errors.password = "Password can't be the same as Full Name";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(formData)) {
      console.log(formData)
      setFormData({
        fullname: '',
        email: '',
        password: '',
      });
      setError({
        fullname: '',
        email: '',
        password: '',
      });
      setPreviewData(null)
    }
  };

  const handlePreview = () =>{
    if(validate(formData)){
      setPreviewData(formData)
    }
  }

  const myStyle = {
    color: props.mode === 'dark' ? 'white' : 'black',
  };

  return (
    <div className='container my-5'>
        <div className='themebuttons'>
            <button
            className={`btn btn-light ms-3 text-${props.mode === 'light' ? 'black' : 'grey'}`}
            style={{ border: '1px solid black' }}
            onClick={props.togglelightmode}
          >
            light
          </button>
          <button className="btn btn-success ms-3" onClick={props.toggledarkmode}>dark</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fname" className="form-label" style={myStyle}>Full Name</label>
          <input
            type="text"
            value={formData.fullname}
            onChange={handleChange}
            name="fullname"
            className="form-control"
            id="fname"
            autoComplete="current-fullname"
          />
          {error.fullname && <div className='text-danger'>{error.fullname}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={myStyle}>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            className="form-control"
            id="email"
            autoComplete="current-email"
          />
          {error.email && <div className='text-danger'>{error.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={myStyle}>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            className="form-control"
            id="password"
            autoComplete="current-password"
          />
          {error.password && <div className='text-danger'>{error.password}</div>}
        </div>
        <button disabled={formData.fullname.length === 0 || formData.email.length === 0}  type="submit" className="btn btn-primary">Submit</button>
      </form>
      <button disabled={formData.fullname.length === 0 || formData.email.length === 0} className='btn btn-primary mt-3'onClick={handlePreview}>Click to preview</button>
      {previewData &&
      <div className='preview mt-4' style={myStyle}>
        <p><strong>Full Name : </strong>{previewData.fullname}</p>
        <p><strong>Email : </strong>{previewData.email}</p>
        <p><strong>Password : </strong>{previewData.password}</p>
      </div>}
    </div>
  );
}
