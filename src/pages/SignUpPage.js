import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const signUpAPI = process.env.REACT_APP_MOZILOR_API_URL + "api/signup";
            const response = await fetch(signUpAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Signup successful: ', jsonResponse);
                setSuccessMessage('User has been registered successfully! Go to <a href="/login">Login</a>');
            } else {
                console.error('Signup failed: ', response.status);
                setErrorMessage('Signup failed! Please try again later.');
            }
        } catch (error) {
            console.error("Error during signup: ", error);
            setErrorMessage('Signup failed! Please try again later.');
        }
    };

    return (
        <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text"
                className="form-control" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email"
                className="form-control" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>
            {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
            {successMessage && <div className='alert alert-success' dangerouslySetInnerHTML={{__html: successMessage}}></div>}
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
    );
}

export default SignUp;