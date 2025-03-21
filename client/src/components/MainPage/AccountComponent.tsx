import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ky from 'ky';
import { ReactComponent as ArrowRight } from '../../utils/icons/arrow-right.svg';  // Import as a React component
import { ReactComponent as ArrowLeft } from '../../utils/icons/arrow-left.svg';  // Import as a React component
import { ReactComponent as ArrowSoutheast } from '../../utils/icons/arrow-southeast.svg';  // Import as a React component
import { ReactComponent as ArrowNorth } from '../../utils/icons/arrow-down.svg';  // Import as a React component
import { ReactComponent as Plus } from '../../utils/icons/plus.svg';  // Import as a React component
import { ReactComponent as Fire } from '../../utils/icons/fire.svg';  // Import as a React component
import { RootState } from "../../store/store";
import { setScreenState } from '../../slices/screenState';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

interface ResultProps{

  }

export default function AccountComponent ({}: ResultProps) {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const user = useSelector((state:RootState)=> state.user)

  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [purchaseCreenOn, setPurchseScreenOn] = useState(0);
  // Typing logic goes here
  const hash_id = urlParams.get('hash_id');
  const [plans, setPlans] = useState([]);


  const openPayment = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.append("plan_id", selectedPack.id); // Добавляем тариф в параметры запроса


    const headers = {
      "Accept": "application/json",
      "telegram-id": window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "1",
      "telegram-data": window.Telegram?.WebApp?.initData || "2",
    };

    //const requestUrl = `${API_BASE_URL}/fintech/get_invoice`;
    const requestUrl = `${API_BASE_URL}/fintech/get_invoice?${urlParams.toString()}`;
    /*
    const result: any = await ky.get(requestUrl, { headers }).json();

    console.log("Invoice payload:", result);

    if (result.payload) {
      (window.Telegram.WebApp as any).openInvoice(result.payload); // Используем openInvoice
    }
  */
    try {
      const result: any = await ky.get(requestUrl, { headers }).json();

      console.log("Invoice payload:", result);

      if (result.payload) {
          (window.Telegram.WebApp as any).openInvoice(result.payload, (status: string) => {
              console.log("Payment Status:", status);

              if (status === "paid") {
                  console.log("✅ Payment successful!");
                  dispatch(setScreenState("main")); // Navigate to success screen
              } else if (status === "cancelled") {
                  console.log("❌ Payment was cancelled");
                  dispatch(setScreenState("main")); // Navigate back to main screen
              } else {
                  console.log("⚠️ Payment status unknown:", status);
              }
          });
      }
  } catch (error) {
      console.error("Error fetching invoice:", error);
  }

    
    dispatch(setScreenState('main'))
  };

  const openPayment_old = async () => {


      // Extract the hash_id from the URL query parameters
      const urlParams = new URLSearchParams(window.location.search);

      // Headers required for the request
      const headers = {
        "Accept": "application/json",
        "telegram-id": window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "1", // Adjust if Telegram ID is stored differently
        "telegram-data": window.Telegram?.WebApp?.initData || "2", // Adjust if Telegram data is structured differently
      };


      // Construct request URL
      const requestUrl = `${API_BASE_URL}/fintech/get_invoice`;

      const result :any = await ky.get(requestUrl, {
        headers
      }).json();

      console.log("Invoice url:", result);


    if (result.invoice_url) {
      (window.Telegram.WebApp as any).openLink(result.invoice_url);
    }
  };

  const fetchPlans = async () => {
    try {
      // Extract the hash_id from the URL query parameters
      const urlParams = new URLSearchParams(window.location.search);

      // Headers required for the request
      const headers = {
        "Accept": "application/json",
        "telegram-id": window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "1", // Adjust if Telegram ID is stored differently
        "telegram-data": window.Telegram?.WebApp?.initData || "2", // Adjust if Telegram data is structured differently
      };


      // Construct request URL
      const requestUrl = `${API_BASE_URL}/fintech/plans/`;

      const result :any = await ky.get(requestUrl, {
        headers

      }).json();

      console.log("Plans:", result);
      const sorted_result : any = result.sort((a:any, b:any) => a?.price > b?.price ? 1 : -1)
      setPlans(sorted_result)

      //dispatch(setUser(result));
    } catch (error) {
      console.error('Could not fetch user:', error);
    } finally {
      //setIsLoading(false);
    }
  };

  useEffect(() => {

    fetchPlans()
  
  }, [dispatch]);
  



  return <>
  
  <div  className='drawer-screen appear-with-shift-left'>
      <div className='main-list-menu'>
        <div className='short-gap-block'>
          <p className='inactive'>Доступно проверок</p>
          <h2>{user?.balance || 0}</h2>
        </div>
        <div className='tariff-list-block'>
          <h3>Купить проверки</h3>
          <div className='tariff-list'>
            {
              plans && plans.length > 0 ?
              <>
                {
                  plans?.map((p :any, index)=>{
                    return(<>
                    <div className={selectedPack?.id == p?.id ? 'tariff selected': 'tariff'} onClick={()=>setSelectedPack(p)}> 
                      <div className='offer'>{p?.name}
                        {
                          p?.description?
                          <small className='special-offer'>{p?.description}<Fire className='inline-svg'/></small>
                          :<></>
                        }
                        </div>
                      <h3>{p?.price} ₽</h3>
                    </div>
                    </>)
                  }
                    
                  )
                }
              </>
              :<></>
            }
            {/*   
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
            */}

          </div>
        </div>
        <div className='account-comment'>
          <small className='inactive'>При оплате заказа ввод реквизитов происходит в системе электронных платежей ООО «КопытаРога». Данные, которые вы предоставляете, надёжно защищены и никому не могут быть переданы.</small>
        </div>
      </div>
  </div>

  {
        selectedPack?
        <>
          <div className='navigation-panel'>
            <div className='primary-option' onClick={()=>openPayment()}>
              <h3 >Купить</h3>
              <small>{selectedPack?.name}</small>
            </div>
              
                
          </div>
        </>:
        <></>
  }

  </>;
};
