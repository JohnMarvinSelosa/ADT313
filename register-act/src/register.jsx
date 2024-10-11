import { useState, useRef, useCallback, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const [debounceState, setDebounceState] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const userInputDebounce = useDebounce({ name, email, password, confirmPassword }, 2000);

  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((prev) => !prev);
  }, []);

  const handleShowConfirmPassword = useCallback(() => {
    setIsShowConfirmPassword((prev) => !prev);
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsFieldsDirty(true);
    setDebounceState(false);
  };

  const handleRegister = async () => {
    const data = { name, email, password, confirmPassword };
    setStatus('loading');
    try {
      const res = await axios.post('/admin/register', data, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
      localStorage.setItem('accessToken', res.data.access_token);
      navigate('/main/dashboard');
      setStatus('idle');
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  const isPasswordValid = password === confirmPassword && password.length > 0;
  const isFormValid = name && email && password && confirmPassword && isPasswordValid;

  return (
    <div className='Register'>
      <div className='main-container'>
        <h3>Register</h3>
        <form>
          <div className='form-container'>
            <div className='form-group'>
              <label>Name:</label>
              <input
                type='text'
                name='name'
                ref={nameRef}
                onChange={handleOnChange}
              />
              {debounceState && isFieldsDirty && name === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>

            <div className='form-group'>
              <label>E-mail:</label>
              <input
                type='text'
                name='email'
                ref={emailRef}
                onChange={handleOnChange}
              />
              {debounceState && isFieldsDirty && email === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>

            <div className='form-group'>
              <label>Password:</label>
              <input
                type={isShowPassword ? 'text' : 'password'}
                name='password'
                ref={passwordRef}
                onChange={handleOnChange}
              />
              {debounceState && isFieldsDirty && password === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>

            <div className='form-group'>
              <label>Confirm Password:</label>
              <input
                type={isShowConfirmPassword ? 'text' : 'password'}
                name='confirmPassword'
                ref={confirmPasswordRef}
                onChange={handleOnChange}
              />
              {debounceState && isFieldsDirty && confirmPassword === '' && (
                <span className='errors'>This field is required</span>
              )}
              {!isPasswordValid && debounceState && isFieldsDirty && (
                <span className='errors'>Passwords must match</span>
              )}
            </div>

            <div className='show-password' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

            <div className='show-password' onClick={handleShowConfirmPassword}>
              {isShowConfirmPassword ? 'Hide' : 'Show'} Confirm Password
            </div>

            <div className='submit-container'>
              <button
                type='button'
                disabled={status === 'loading' || !isFormValid}
                onClick={() => {
                  if (status === 'loading') return;
                  if (isFormValid) {
                    handleRegister();
                  } else {
                    setIsFieldsDirty(true);
                    if (name === '') {
                      nameRef.current.focus();
                    } else if (email === '') {
                      emailRef.current.focus();
                    } else if (password === '') {
                      passwordRef.current.focus();
                    } else if (confirmPassword === '') {
                      confirmPasswordRef.current.focus();
                    }
                  }
                }}
              >
                {status === 'idle' ? 'Register' : 'Loading...'}
              </button>
            </div>

            <div className='register-container'>
              <a href='/login'>
                <small>Already have an account? Login</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
