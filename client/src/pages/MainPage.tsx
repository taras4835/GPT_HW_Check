import React, { useRef, useState, useEffect, useMemo } from 'react';
import Typewriter from "../components/MainPage/Typewriter";
import DescriptionAppear from "../components/MainPage/DescriptionAppear";
import ResultView from '../components/MainPage/ResultViewComponent';
import NewTask from '../components/MainPage/NewTaskComponent';
import AccountComponent from '../components/MainPage/AccountComponent';
import ky from 'ky';
import locales from '../utils/locales/locales'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store/store";
import './App.css'
// import styles from "./About.module.css"
import { useNavigate } from "react-router-dom";
import { format, parseISO, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";
import {setUser} from '../slices/userSlice';
import { setSelectedCheck } from '../slices/selectedCheck';

import { ReactComponent as PlusNew } from '../utils/icons/plus-new.svg';  // Import as a React component
import { ReactComponent as Logo } from '../utils/icons/logo.svg';  // Import as a React component
import { ReactComponent as ArrowBack } from '../utils/icons/arrow-back.svg';  // Import as a React component

const API_BASE_URL = process.env.REACT_APP_BASE_URL;


export default function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [screenState, setScreenState] = useState('main')
  const [specialOptionsMenuOn, setSpecialOptionsMenuOn] = useState(0)

  const [optionsTab, setOptionsTab] = useState(0)
  const user = useSelector((state:RootState)=> state.user);
  const selected_check = useSelector((state:RootState)=> state.selectedCheck);
  //const [counter, setCounter] = useState(TIME_LIMIT);

  //const actvie_event = useSelector((state:RootState)=> state.activeEvent);
  const urlParams = new URLSearchParams(window.location.search);
  const hash_id = urlParams.get('hash_id');
  const [groupedChecks, setGroupedChecks] = useState<any>(null)
  const [checks, setChecks] = useState<any[]>([]);
  useEffect(() => {
    //fetchUser();
  }, [dispatch]);


  let repair_count = 0

  function groupByDate(checks: any[]) {
    return checks.reduce((acc: Record<string, any[]>, check) => {
      const date = parseISO(check.created_at);
  
      let groupLabel = format(date, "d MMMM", { locale: ru }); // "15 Февраля"
  
      if (isToday(date)) groupLabel = "Сегодня";
      if (isYesterday(date)) groupLabel = "Вчера";
  
      if (!acc[groupLabel]) acc[groupLabel] = [];
      acc[groupLabel].push(check);
  
      return acc;
    }, {});
  }

    const fetchCheck = async (selected_check_id : number) => {
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
        const requestUrl = `${API_BASE_URL}/checks/checks/`+selected_check_id;


        // Construct request URL

        // Fetch user data
        const result: any = await ky.get(requestUrl, {
          headers,
        }).json();

        console.log("Selected check:", result);
        await dispatch(setSelectedCheck({id:result.id, data:result}));
        setScreenState('result');
      } catch (error) {
        console.error('Could not fetch user:', error);
      } finally {
        //setIsLoading(false);
      }
    };


  useEffect(() => {
    const fetchChecks = async () => {
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
        const params = new URLSearchParams({ page_size: '100' });  
        const requestUrl = `${API_BASE_URL}/checks/checks/?${params.toString()};`;


        // Construct request URL

        // Fetch user data
        const result :any = await ky.get(requestUrl, {
          headers
          
        }).json();

        setChecks(result.results)
        console.log("Checks:", result);

        const tempGroupedChecks = groupByDate(result.results);
        setGroupedChecks(tempGroupedChecks)
        console.log("GroupedChecks:", tempGroupedChecks);

        //dispatch(setUser(result));
      } catch (error) {
        console.error('Could not fetch user:', error);
      } finally {
        //setIsLoading(false);
      }
    };
  
    fetchChecks();
  }, [dispatch, navigate]);



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


  //const memoizedComponent = useMemo(() => {
  //  return <SomeComponent args={1}/>
  //}, [dispatch]);




  return (
  <>
  {
    user.id > 0 || true?
    <>

    <div  className='main-screen'>


      <div className='main-screen-section'>
      { screenState == 'result'?
          <div className='main-header'  onClick={()=>setScreenState('main')}>
            <div className='icon'><ArrowBack/></div>
            <div className='title'><p>Результат проверки</p></div>
          </div>
          : screenState == 'new_task'?
          <div className='main-header'  onClick={()=>setScreenState('main')}>
            <div className='icon'><ArrowBack/></div>
            <div className='title'><p>Новая проверка</p></div>
          </div>
          :screenState == 'account_settings'?
          <div className='main-header'  onClick={()=>setScreenState('main')}>
            <div className='icon'><ArrowBack/></div>
            <div className='title'><p>Пополнить баланс</p></div>
          </div>
          :<></>
        }
        {screenState == 'main'?
          <>
            <div className='main-list-menu appear-with-shift-right scroll-bar-hide'>
                <div className='list-title' >
                    <div className='special-sign'>
                      
                        <Logo className=''/>

                    </div>

                    <div className='balance' onClick={()=>setScreenState('account_settings')}>
                    <small className='inactive'>Баланс</small>
                    <h2 className=''>12 <PlusNew className='inline-svg'/></h2>
                    
                    </div>
                </div>
                {groupedChecks && checks? 
                
                <>
                {Object.entries(groupedChecks)
                .sort(([labelA], [labelB]) => {
                  const dateA = labelA === "Сегодня" ? new Date() : labelA === "Вчера" ? new Date(Date.now() - 86400000) : parseISO(checks.find( (c: any)=> format(parseISO(c.created_at), "d MMMM", { locale: ru }) === labelA)?.created_at || "");
                  const dateB = labelB === "Сегодня" ? new Date() : labelB === "Вчера" ? new Date(Date.now() - 86400000) : parseISO(checks.find( (c: any) => format(parseISO(c.created_at), "d MMMM", { locale: ru }) === labelB)?.created_at || "");
                  
                  return dateB.getTime() - dateA.getTime(); // Sort descending
                })
                .map(([dateLabel, items] : any) => (
                  <div key={dateLabel} className='date-block'>
                    <div className='date'>
                      <h2>{dateLabel}</h2>

                    </div>
                    <>
                      {items.map((check : any) => (
                        <div key={check.id} className='task-card list-card clickable' 
                        onClick={()=>{
                          fetchCheck(check.id); //check.id                      
                        }}>
                            <div className='body'>
                              <p className="">{check.input_text || "..."}</p>
                            </div>
                        </div> 
                      ))}
                    </>
                  </div>
                ))}
                </>:
                <div className='new-task-help-message'>
                  <div>
                  <br/>
                  <br/>
                  <br/>
                  <h1>Здесь пока пусто</h1>
                  <p>Загрузите работу для проверки</p>
                </div>
                </div>
                
                }


            </div>
          
          </>
          : screenState == 'result'?
            <ResultView/>
          : screenState== 'new_task'?
            <NewTask/>
          : screenState== 'account_settings'?
            <AccountComponent/>
          :
          <></>
        }
      </div>

      {
        screenState == 'main'?
        <>
                    <div className='navigation-panel'>
              <div className='primary-option' onClick={()=>setScreenState('new_task')}>
                <h3 >Загрузить работу</h3>

              </div>
              
                
            </div>
        </>:
        <></>
      }
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
