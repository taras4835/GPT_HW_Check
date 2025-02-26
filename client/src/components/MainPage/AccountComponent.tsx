import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ky from 'ky';
import { ReactComponent as ArrowRight } from '../../utils/icons/arrow-right.svg';  // Import as a React component
import { ReactComponent as ArrowLeft } from '../../utils/icons/arrow-left.svg';  // Import as a React component
import { ReactComponent as ArrowSoutheast } from '../../utils/icons/arrow-southeast.svg';  // Import as a React component
import { ReactComponent as ArrowNorth } from '../../utils/icons/arrow-down.svg';  // Import as a React component
import { ReactComponent as Plus } from '../../utils/icons/plus.svg';  // Import as a React component
import { ReactComponent as Fire } from '../../utils/icons/fire.svg';  // Import as a React component

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

interface ResultProps{

  }

export default function AccountComponent ({}: ResultProps) {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);

  const [selectedPack, setSelectedPack] = useState(0);
  const [purchaseCreenOn, setPurchseScreenOn] = useState(0);
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
        <div className='short-gap-block'>
          <p className='inactive'>Доступно проверок</p>
          <h2>12</h2>
        </div>
        <div className='tariff-list-block'>
          <h3>Купить проверки</h3>
          <div className='tariff-list'>
            <div className={selectedPack == 1 ? 'tariff selected': 'tariff'} onClick={()=>setSelectedPack(1)}> 
              <div className='offer'>5 проверок</div>
              <h3>150 ₽</h3>
            </div>
            <div className={selectedPack == 2 ? 'tariff selected': 'tariff'} onClick={()=>setSelectedPack(2)}> 
              <div className='offer'>10 проверок</div>
              <h3>250 ₽</h3>
            </div>
            <div className={selectedPack == 3 ? 'tariff selected': 'tariff'} onClick={()=>setSelectedPack(3)}> 
              <div className='offer'>10 проверок <small className='special-offer'>-33%<Fire className='inline-svg'/></small></div>
              <h3>250 ₽</h3>
            </div>
            <div className={selectedPack == 4 ? 'tariff selected': 'tariff'} onClick={()=>setSelectedPack(4)}> 
              <div className='offer'>10 проверок</div>
              <h3>250 ₽</h3>
            </div>
          </div>
        </div>
        <div className='account-comment'>
          <small className='inactive'>При оплате заказа ввод реквизитов происходит в системе электронных платежей ООО «КопытаРога». Данные, которые вы предоставляете, надёжно защищены и никому не могут быть переданы.</small>
        </div>
      </div>
  </div>

  {
        selectedPack != 0?
        <>
          <div className='navigation-panel'>
            <div className='primary-option' onClick={()=>setPurchseScreenOn(1)}>
              <h3 >Купить</h3>
              <small>25 проверок</small>
            </div>
              
                
          </div>
        </>:
        <></>
  }

  </>;
};
