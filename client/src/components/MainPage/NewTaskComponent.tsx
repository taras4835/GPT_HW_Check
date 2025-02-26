import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ky from 'ky';
import { ReactComponent as ArrowRight } from '../../utils/icons/arrow-right.svg';  // Import as a React component
import { ReactComponent as ArrowLeft } from '../../utils/icons/arrow-left.svg';  // Import as a React component
import { ReactComponent as ArrowSoutheast } from '../../utils/icons/arrow-southeast.svg';  // Import as a React component
import { ReactComponent as ArrowNorth } from '../../utils/icons/arrow-down.svg';  // Import as a React component
import { ReactComponent as Plus } from '../../utils/icons/plus.svg';  // Import as a React component
import { ReactComponent as Attachment } from '../../utils/icons/attachment.svg';  // Import as a React component
import { ReactComponent as ArrowBack } from '../../utils/icons/arrow-back.svg';  // Import as a React component
import { ReactComponent as Send } from '../../utils/icons/send.svg';  // Import as a React component
import { ReactComponent as Document } from '../../utils/icons/document.svg';  // Import as a React component

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

interface ResultProps{

  }

export default function NewTask ({}: ResultProps) {
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

        <div className='new-task-help-message'>
          <Document />
          <h2>Опишите задачу, добавьте снимки или документы</h2>
        </div>

        
      </div>
      <div className='text-input-panel appear-with-shift'>
      <div className='text-input-field'>Описание задачи</div>
      <div className='icons-field'>
        <div className='icon-plus'><h2><Attachment className='inline-svg'/></h2></div>
        <div className='icon-send'><h2><Send className='inline-svg'/></h2></div>
      </div>


      </div>
  </div>

  </>;
};
