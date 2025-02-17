import React, { useState, useEffect } from 'react';

interface DescriptionAppearProps {
    text: string;
  }

export default function DescriptionAppear ({ text}: DescriptionAppearProps) {
  const [currentText, setCurrentText] = useState('');
  const [transparentText, setTransparentText] = useState(text.slice(1));
  const [lastLetter, setLastLetter] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);


  return <>
      <div className='event description-appear' dangerouslySetInnerHTML={{__html: text}}/>
  </>;
};
