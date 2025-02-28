import React, { useEffect, useState } from 'react';
import ky from 'ky';
import {Routes, Route, useNavigate, redirect} from 'react-router-dom';
import { publicRoutes, /*userRoutes,*/} from '../routes';
import { isMobile } from 'react-device-detect';
import MainPage from '../pages/MainPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/store";
import { setUser } from '../slices/userSlice';
import {User} from '../models/types'

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id?: string;
          };
        };
      };
    };
  }
}


function AppRouter(): React.ReactElement {
    const user = useSelector((state:RootState)=> state.user)
    let userId = user.id;
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    const API_BASE_URL = 'https://poreshai-xax5k.ondigitalocean.app/api'//process.env.REACT_APP_BASE_URL;



    useEffect(() => {
        const fetchUser = async () => {
          try {
            // Extract the hash_id from the URL query parameters
            const urlParams = new URLSearchParams(window.location.search);
            const hash_id = urlParams.get('hash_id');

            // Headers required for the request
            const headers = {
              "Accept": "application/json",
              "X-CSRFTOKEN": "", // Make sure this token is valid
              "telegram_id": window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "", // Adjust if Telegram ID is stored differently
              "telegram_data": window.Telegram?.WebApp?.initData || "", // Adjust if Telegram data is structured differently
            };


            // Construct request URL
            const requestUrl = `${API_BASE_URL}/users/users/`;

            // Fetch user data
            const result: any = await ky.get(requestUrl, {
              headers,
              credentials: "include", // If authentication is needed
            }).json();

            console.log("User info:", result);
            dispatch(setUser(result));
          } catch (error) {
            console.error('Could not fetch user:', error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchUser();
      }, [dispatch, navigate]);
      


    if (isLoading) {
        return(
            <>
                </>
        )
    }

    return (
        <>
            <Routes>
                { publicRoutes.map(({ path, element }) => (
                        <Route path={path} element={element} key={Math.ceil(Math.random() * 99999)} />
                    ))}
                
                <Route path='/main' element={<MainPage />} />
            </Routes>
        </>
    );
}

export default AppRouter;
