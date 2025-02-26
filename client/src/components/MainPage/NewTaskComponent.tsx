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

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

interface ResultProps{

  }

export default function NewTask ({}: ResultProps) {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);

  const [currentText, setCurrentText] = useState('');
  const [lastLetter, setLastLetter] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<{ name: string; base64: string }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return; // ✅ Prevents error
  
    const files = Array.from(event.target.files); // ✅ Now safely iterable
  
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          setAttachments((prev) => [
            ...prev,
            { name: file.name, base64: reader.result as string },
          ]);
        }
      };
    });
  };
  


  async function handleSubmit() {
    try {
      // Add hash_id to the fetch request URL
      const requestUrl = `${API_BASE_URL}/players/get_result?hash_id=${1}`;
      const payload = {
        message,
        attachments, // array of { name, base64 }
      };
      console.log("Sending JSON:", payload);

      const result = await ky.post(requestUrl, { credentials: 'include', body: JSON.stringify(payload)}).json();

      setMessage("");
      setAttachments([]);
      //dispatch(setResultView(result));
    } catch (error) {
      console.error('Could not fetch user:', error);
    }
  };



  return <>
  
  <div  className='drawer-screen'>
      <div className='main-list-menu'>

        <div className='new-task-help-message'>
          <Document />
          <h2>Опишите задачу, добавьте снимки или документы</h2>
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
                <img src={file.base64} alt={file.name} className="attachment-image" />
                      
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



