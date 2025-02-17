import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ky from 'ky';
import { ReactComponent as ArrowRight } from '../../utils/icons/arrow-right.svg';  // Import as a React component
import { ReactComponent as ArrowLeft } from '../../utils/icons/arrow-left.svg';  // Import as a React component
import { ReactComponent as ArrowSoutheast } from '../../utils/icons/arrow-southeast.svg';  // Import as a React component

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

interface ResultProps{

  }

export default function ResultView ({}: ResultProps) {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);

  const [currentText, setCurrentText] = useState('');
  const [lastLetter, setLastLetter] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Typing logic goes here
  const hash_id = urlParams.get('hash_id');


  async function fetchResult() {
    try {
      // Add hash_id to the fetch request URL
      const requestUrl = `${API_BASE_URL}/players/get_result?hash_id=${1}`;

      const result = await ky.get(requestUrl, { credentials: 'include' }).json();
      //dispatch(setResultView(result));
    } catch (error) {
      console.error('Could not fetch user:', error);
    }
  };
    useEffect(() => {
      //fetchResult();
    }, [dispatch]);
  

  return <>
  
  <div  className='drawer-screen'>
      <div className='main-list-menu'>


      <div className='accent-card'>
      <div className='body'>
        
      <p className='inactive'>09 Апреля 2025</p>
      <p>Домашнее задание</p>
      
      </div>
        
      </div>

      <div className='accent-card'>
      <div className='header'>3214</div>
      <div className='body'>Домашнее задание</div>
        
        </div>
      </div>
    </div>

  </>;
};
