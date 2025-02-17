import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ky from 'ky';
import {IForm, User as IUser, iLoginResult} from '../../models/types'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {setUser} from '../../slices/userSlice'
import locales from '../../utils/locales/locales'

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

export default function AuthPage():JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<IForm>({login: '', password:'', email:'', role: 'user', company: '', token: ''})

  function handleChange(event: { target: { name: string; value: string; }; }) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }


    async function formSubmitHandler() {
        try {
            if (location.pathname.includes('signin')) {
                try {
                    const user: IUser = await ky.post(`${API_BASE_URL}/user/login`, {
                        json: formData,
                        credentials: 'include'
                    }).json()
                    if (user) {

                        // The server should now set a HttpOnly cookie with the token.
                        dispatch(setUser(user))
                        setFormData({login: '', email: '', password: '', token: ''});
                        navigate('/');
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const user: IUser = await ky.post(`${API_BASE_URL}/user/registration`, {
                        json: formData,
                        credentials: 'include'
                    }).json()
                    if (user) {
                        // The server should now set a HttpOnly cookie with the token.
                        dispatch(setUser(user))
                        setFormData({login: '', email: '', password: '', role: 'user', company: ''});
                        navigate('/');
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
  <>
    {location.pathname.includes('signin')
    ?
    <div className="login-page">
      <form name="loginform" className="login-form">
        <input onChange={handleChange} name="login" type="text" placeholder="login" value={formData.login}/>
        <input onChange={handleChange}  name="password" type="password" placeholder="password" value={formData.password}/>
        <button onClick={formSubmitHandler} type="button">log in</button>
          <a href={`${API_BASE_URL}/google/login`}>
              <button type="button">continue withgoogle</button>
          </a>
        <Link to='/signup'>sign up</Link>
      </form>
  </div>
  :
  <div className="login-page">
    <form name="regform" className="login-form">
      <input onChange={handleChange}  name="login" type="text" placeholder="username" value={formData.login} />
      <input onChange={handleChange} name="password" type="password" placeholder="password" value={formData.password} />
      <input onChange={handleChange} name="email" type="email" placeholder="email" value={formData.email}/>
      <b style={{color: "#fff"}}>Choose a role</b>
      <select name="role" onChange={handleChange} value={formData.role}>
        <option value="user">user</option>
        <option value="founder">founder</option>
      </select>

      {formData.role==='founder'
      ?
      <input onChange={handleChange}  name="company" type="text" placeholder="company" value={formData.company} />
      :
      <input onChange={handleChange}  name="token" type="text" placeholder="invite token" value={formData.token} />}

      <button onClick={formSubmitHandler} type="button">sign up</button>
      <Link to='/signin'>already have account</Link>

        <a href={`${API_BASE_URL}/google/login`}>
            <button type="button">continue with google</button>
        </a>

        <a href={`${API_BASE_URL}/git/login`}>
            <button type="button">Continue with Git</button>
        </a>

    </form>
  </div> }
  </>



  )
}
