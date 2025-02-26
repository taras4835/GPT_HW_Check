import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ky from 'ky';
import { ReactComponent as ArrowRight } from '../../utils/icons/arrow-right.svg';  // Import as a React component
import { ReactComponent as ArrowLeft } from '../../utils/icons/arrow-left.svg';  // Import as a React component
import { ReactComponent as ArrowSoutheast } from '../../utils/icons/arrow-southeast.svg';  // Import as a React component
import { ReactComponent as DropDownArrow } from '../../utils/icons/dropdown-arrow.svg';  // Import as a React component
import { ReactComponent as Send } from '../../utils/icons/send.svg';  // Import as a React component
import { ReactComponent as LogoStars } from '../../utils/icons/logo-stars.svg';  // Import as a React component

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

interface ResultProps{

  }

export default function ResultView ({}: ResultProps) {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);

  const [enlargeTask, setEnlargeTask] = useState(0);

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
  
  <div  className='drawer-screen appear-with-shift-left'>
      <div className='main-list-menu'>


      <div className='task-card'>
      <div className={enlargeTask ? 'body' : 'body shrinked'}>
        
      <p>Помоги мне разобраться с круговоротом воды в природе. Опиши основные этапы: испарение, конденсация и осадки. Укажи, какие факторы влияют на скорость испарения и образование облаков. Дополнительно расскажи, почему пресная вода так важна для жизни на Земле Помоги мне разобраться с круговоротом воды в природе. Опиши основные этапы: испарение, конденсация и осадки. Укажи, какие факторы влияют на скорость испарения и образование облаков. Дополнительно расскажи, почему пресная вода так важна для жизни на Земле</p>
      <div className={enlargeTask? 'enlarge-btn display-none': 'enlarge-btn'} onClick={() => setEnlargeTask(1)}>Развернуть <DropDownArrow className='inline-svg'/></div>
      </div>
        
      </div>

      <div className='task-card result'>
      <div className='header'>Ответ <LogoStars className='inline-svg-large'/></div>
      <div className='body'>
      Круговорот воды в природе — это «путешествие» воды по Земле.

Испарение — вода из морей, рек и озёр превращается в пар из-за тепла солнца и поднимается в небо.
Конденсация — в небе водяной пар охлаждается и собирается в капельки, образуя облака.
Осадки — когда в облаках слишком много воды, она падает на землю в виде дождя, снега или града.
Что влияет на скорость испарения?

Температура — чем теплее, тем быстрее испаряется вода.
Ветер — он «сдувает» водяной пар, и новая вода испаряется быстрее.
Влажность — когда воздух уже «насыщен» водой, испарение замедляется.
Как образуются облака?
Водяной пар поднимается, охлаждается и превращается в крошечные капли, которые «цепляются» за пылинки в воздухе.

Почему пресная вода важна?
Все живые существа (люди, животные, растения) нуждаются в воде. Пресная вода помогает нам пить, выращивать еду и поддерживать жизнь на планете. Без неё никто не сможет выжить.
      </div>
        
        </div>
      </div>
    </div>

  </>;
};
