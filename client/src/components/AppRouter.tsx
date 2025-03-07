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
const API_BASE_URL = process.env.REACT_APP_BASE_URL;

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



    useEffect(() => {
        const fetchUser = async () => {
          try {
            // Extract the hash_id from the URL query parameters
            const urlParams = new URLSearchParams(window.location.search);

            // Headers required for the request
            const headers = {
              "Accept": "application/json",
              "telegram-id": window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "1", // Adjust if Telegram ID is stored differently
              "telegram-data": window.Telegram?.WebApp?.initData || "2", // Adjust if Telegram data is structured differently
            };


            // Construct request URL
            const requestUrl = `${API_BASE_URL}/users/users/`;


            // Construct request URL

            // Fetch user data
            const result: any = await ky.get(requestUrl, {
              headers,
            }).json();

            console.log("User info:", result);
            dispatch(setUser(result[0]));
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
        {user?.id ?
            <Routes>
                { publicRoutes.map(({ path, element }) => (
                        <Route path={path} element={element} key={Math.ceil(Math.random() * 99999)} />
                    ))}
                
                <Route path='/main' element={<MainPage />} />
            </Routes>
          :<></>}
        </>
    );
}

export default AppRouter;
