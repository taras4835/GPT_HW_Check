import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ky from 'ky';
import { ReactComponent as ArrowRight } from '../../utils/icons/arrow-right.svg';  // Import as a React component
import { ReactComponent as ArrowLeft } from '../../utils/icons/arrow-left.svg';  // Import as a React component
import { ReactComponent as ArrowSoutheast } from '../../utils/icons/arrow-southeast.svg';  // Import as a React component
import { ReactComponent as ArrowNorth } from '../../utils/icons/arrow-down.svg';  // Import as a React component
import { ReactComponent as Plus } from '../../utils/icons/plus.svg';  // Import as a React component
import { ReactComponent as Attachment } from '../../utils/icons/attachment.svg';  // Import as a React component
import { ReactComponent as Delete } from '../../utils/icons/delete.svg';  // Import as a React component
import { ReactComponent as Send } from '../../utils/icons/send.svg';  // Import as a React component
import { ReactComponent as Document } from '../../utils/icons/document.svg';  // Import as a React component
import { ReactComponent as OpenDocument } from '../../utils/icons/open-document.svg';  // Import as a React component

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

interface ResultProps{

  }

export default function NewTask ({}: ResultProps) {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);

  const [currentText, setCurrentText] = useState('');
  const [lastLetter, setLastLetter] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [waitingForResponse, setWaitingForResponse] = useState(0);
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<{ photo: string }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
  
    const files = Array.from(event.target.files);
  
    setAttachments((prev) => {
      if (prev.length >= 10) {
        alert("You can only upload up to 10 attachments.");
        return prev;
      }
  
      const remainingSlots = 10 - prev.length; // How many more can be added
      const filesToAdd = files.slice(0, remainingSlots); // Limit files
  
      filesToAdd.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (reader.result) {
            setAttachments((prev) => [
              ...prev,
              {"photo": reader.result as string },
            ]);
          }
        };
      });
  
      return prev; // Return the previous state (React requires this)
    });
  };
  


  async function handleSubmit() {
    try {
      // Add hash_id to the fetch request URL
      setWaitingForResponse(1)
      const payload = {
        input_text: message,
        //        photos: attachments, 
        photos: attachments.map((file) => ({ photo: file.photo })), 
        user: '1'
      };

      console.log("Sending JSON:", payload);

      // Headers required for the request
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json", // 👈 Добавьте это
        "telegram-id": window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "1", 
        "telegram-data": window.Telegram?.WebApp?.initData || "2", 
      };
      const requestUrl = `${API_BASE_URL}/checks/checks/`;


      const result = await ky.post(requestUrl, {headers,  body: JSON.stringify(payload)}).json();
      console.log('result', result)
      //setMessage("");
      //setAttachments([]);
      //dispatch(setResultView(result));
    } catch (error) {
      console.error('Could not fetch user:', error);
    }
  };



  return <>
  
  <div  className='drawer-screen'>
      <div className='main-list-menu'>

        <div className='new-task-help-message'>
          {!waitingForResponse? 
          <>
                    <Document />
                    <h2>Опишите задачу, добавьте снимки или документы</h2> 
          </>: 
          <>
            <OpenDocument/>
            <h2>Проверяем задание...</h2>
          </>
          }
        </div>
  
      </div>

      <div className='text-input-panel appear-with-shift'>
      <div className='text-input-field'>
      <textarea
            placeholder="Описание задачи"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
      </div>

          
          
          {/* Image Previews */}
          <div className="attachment-list">
            {attachments.map((file, index) => (
              <div key={index} className="attachment">
                <img src={file.photo} alt={'img'} className="attachment-image" />
                      
                  <button
                    className="delete-btn"
                    onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== index))}
                  >
                    <Delete />
                  </button>
              </div>
            ))}
          </div>

      <div className='icons-field'>
                
        <label htmlFor="fileInput"  className='icon-plus'>
             <h2 ><Attachment className='inline-svg'/></h2>
              <input
                id="fileInput"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="display-none"
              />
        </label>
        <div className='icon-send'><h2><Send className='inline-svg' onClick={() => handleSubmit()} /></h2></div>
      </div>


      </div>
  </div>

  </>;
};



