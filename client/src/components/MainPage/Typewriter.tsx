import React, { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    delay: number;
  }

export default function Typewriter ({ text, delay }: TypewriterProps) {
  const [currentText, setCurrentText] = useState('');
  const [transparentText, setTransparentText] = useState(text.slice(1));
  const [lastLetter, setLastLetter] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Typing logic goes here
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        if (currentIndex < text.length - 1){
          setCurrentText(prevText => prevText + text[currentIndex]);
          setTransparentText(prevText => prevText.slice(1));
          setLastLetter(text[currentIndex + 1]);
        }
        else{
          setCurrentText(prevText => prevText + text[currentIndex]);
          setTransparentText('');
          setLastLetter('');
        }
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);


  return <><span>{currentText}</span><span className='white-highlight'>{lastLetter}</span><span className='transparent-text'>{transparentText}</span></>;
};
