import { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    const loginData = {
      email, 
      password
    };

    try {
      const loginAPI = process.env.REACT_APP_MOZILOR_API_URL + "api/login";
      const response = await fetch(loginAPI, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Login success:', jsonResponse);
        Cookies.set('authToken', jsonResponse.token, {expires: 1});
        navigate('/home');
      } else if (response.status === 401) {
        setErrorMessage("Invalid credentials! Please try again.");
      } else {
        console.error('Login failed: ', response.status);
        setErrorMessage("An error occured! Please try again later.");
      }
    } catch (error) {
      console.error("Error during login: ", error);
      setErrorMessage("An error occured! Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email"
                className="form-control" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
            <div>New user? <a href="/signup">Sign up here.</a></div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
