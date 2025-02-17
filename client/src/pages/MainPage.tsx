import React, { useRef, useState, useEffect, useMemo } from 'react';
import Typewriter from "../components/MainPage/Typewriter";
import DescriptionAppear from "../components/MainPage/DescriptionAppear";
import ky from 'ky';
import locales from '../utils/locales/locales'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store/store";
import './App.css'
// import styles from "./About.module.css"
import { DoubleSide } from 'three'
import { useNavigate } from "react-router-dom";

import {setUser} from '../slices/userSlice';

import { ReactComponent as ArrowRight } from '../utils/icons/arrow-right.svg';  // Import as a React component
import { ReactComponent as ArrowLeft } from '../utils/icons/arrow-left.svg';  // Import as a React component
import { ReactComponent as ArrowSoutheast } from '../utils/icons/arrow-southeast.svg';  // Import as a React component

const TIME_LIMIT = 10
const API_BASE_URL = process.env.REACT_APP_BASE_URL;


function VibrateOnClick(){
  // Check if vibration is supported by the browser
  if (navigator.vibrate) {
    navigator.vibrate(200);  // Vibrate for 200 milliseconds
  } else {
    console.log("Vibration API is not supported in this browser.");
  }
};


export default function Voyage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [mainScreenOn, setMainScreenOn] = useState(1)
  const [specialOptionsMenuOn, setSpecialOptionsMenuOn] = useState(0)

  const [optionsTab, setOptionsTab] = useState(0)
  const user = useSelector((state:RootState)=> state.user);
  //const [counter, setCounter] = useState(TIME_LIMIT);

  //const actvie_event = useSelector((state:RootState)=> state.activeEvent);
  const urlParams = new URLSearchParams(window.location.search);
  const hash_id = urlParams.get('hash_id');

  useEffect(() => {
    //fetchUser();
  }, [dispatch]);


  let repair_count = 0

  async function fetchUser() {
    try {
      // Add hash_id to the fetch request URL
      const requestUrl = `${API_BASE_URL}/players/get_user?hash_id=${hash_id}`;

      const result = await ky.get(requestUrl, { credentials: 'include' }).json();
      dispatch(setUser(result));
    } catch (error) {
      console.error('Could not fetch user:', error);
    }
  };




  //if(lala == 'active'){
  //    navigate('/battle' + `/?hash_id=${hash_id}`)
  //}

  /*
  React.useEffect(() => {

    let counter_time_left = -1

    if(smth){
      counter_time_left = Math.floor(((new Date(team?.voyage?.fight?.ending_search_at)).getTime() -(new Date()).getTime() )/1000)
    }
        
    if(smth){
      if (lastCounterResponse != counter){
        if(counter && counter < -1){
            console.log('otrpravka')
              fightSearchStatus()
              setLastCounterResponse(counter)
              setTimeout(() => setCounter(counter_time_left - 1), 1000);
        }else{
            if(counter % 10 == 0){
              setLastCounterResponse(counter)
              console.log('fightcheck', counter)
              fightSearchStatus()
            }
            setTimeout(() => setCounter(counter_time_left - 1), 1000);
        }
      }
    }
  }, [user, counter]);
  */

  async function selectSpecialOption() {
    try {

      const requestUrl = `${API_BASE_URL}/some_path/?hash_id=${hash_id}`;
      const result = await ky.put(requestUrl, { json: {option_id: 1},  credentials: 'include' }).json();
      if(result){
        fetchUser()
      }
      else{
        console.log('error selectedOption', result)
      }
    } catch (error) {
      console.error('Could not send command:', error);
    }
  };

  //const memoizedComponent = useMemo(() => {
  //  return <SomeComponent args={1}/>
  //}, [dispatch]);




  return (
  <>
  {
    user.id > 0 || true?
    <>

    <div  className='main-screen'>

    </div>


    <div className={true ? 'hud no-opacity display-none': 'hud no-opacity'}>

        <div className={specialOptionsMenuOn? 'bottom-drawer open-voyage-hat': 'bottom-drawer hidden open-voyage-hat'}>

              <div className="command-order-btns-row">
                <div className="next-target-btn"  onClick={() => setSpecialOptionsMenuOn(0)}>ОТМЕНА</div>  
                <div className="order-btn"  onClick={() => {selectSpecialOption(); setSpecialOptionsMenuOn(0)}}>ПОДТВЕРДИТЬ</div>
              </div>       
        </div>

        <div className={optionsTab? 'bottom-drawer open-voyage-hat': 'bottom-drawer open-voyage-hat hidden'}>
        {
          <>
          </>
        }
        </div>

      </div>
      </>

    : 
    <>
    пользователь не найден
    </>
  }
  </>
  )
}
