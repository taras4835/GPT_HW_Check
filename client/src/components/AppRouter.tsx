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

function AppRouter(): React.ReactElement {
    const user = useSelector((state:RootState)=> state.user)
    let userId = user.id;
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    const API_BASE_URL = process.env.REACT_APP_BASE_URL;



    useEffect(() => {
        const fetchUser = async () => {
          try {
            // Extract the hash_id from the URL query parameters
            const urlParams = new URLSearchParams(window.location.search);
            const hash_id = urlParams.get('hash_id');
            if(hash_id){
              // Add hash_id to the fetch request URL
              const requestUrl = `${API_BASE_URL}/some_path/some_hand?hash_id=${hash_id}`;
              const result :any  = await ky.get(requestUrl, { credentials: 'include' }).json();
              dispatch(setUser(result));
            }
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
