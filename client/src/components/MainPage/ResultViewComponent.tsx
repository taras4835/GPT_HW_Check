import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ky from 'ky';
import { ReactComponent as ArrowRight } from '../../utils/icons/arrow-right.svg';  // Import as a React component
import { ReactComponent as ArrowLeft } from '../../utils/icons/arrow-left.svg';  // Import as a React component
import { ReactComponent as ArrowSoutheast } from '../../utils/icons/arrow-southeast.svg';  // Import as a React component
import { ReactComponent as DropDownArrow } from '../../utils/icons/dropdown-arrow.svg';  // Import as a React component
import { ReactComponent as Send } from '../../utils/icons/send.svg';  // Import as a React component
import { ReactComponent as LogoStars } from '../../utils/icons/logo-stars.svg';  // Import as a React component
import { setSelectedCheck } from '../../slices/selectedCheck';
import { RootState } from "../../store/store";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Подключаем стили KaTeX

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
    />
  );
};  

const formatMathExpressions = (text: string) => {
  const new_text = text
  .replace(/\\\[/g, "$$") // Заменяем \[ на $$
  .replace(/\\\]/g, "$$") // Заменяем \] на $$
  .replace(/\\\(/g, "$")  // Заменяем \( на $
  .replace(/\\\)/g, "$"); // Заменяем \) на $
    console.log(text, new_text)
  return new_text
};

function Report({ selected_check }: { selected_check: any }) {
  return (
    <>
      {/*<ReactMarkdown>{selected_check?.data?.result || "Нет данных"}</ReactMarkdown>
          <MarkdownRenderer content={"Вот формула: $E=mc^2$ \n\n А вот блочная формула: \n\n $$ a^2 + b^2 = c^2 $$"} />

      */}
      
      <MarkdownRenderer content={formatMathExpressions(selected_check?.data?.result || "Нет данных")} />
    </>
  );
}

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

interface ResultProps{

  }

export default function ResultView ({}: ResultProps) {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const selected_check = useSelector((state:RootState)=> state.selectedCheck);

  const [enlargeTask, setEnlargeTask] = useState(0);

  // Typing logic goes here
  const hash_id = urlParams.get('hash_id');


  
  

  return <>
  
  <div  className='drawer-screen appear-with-shift-left'>
      {selected_check?.id? 
      <div className='main-list-menu'>


        <div className='task-card'>
        <div className={enlargeTask ? 'body' : 'body shrinked'}>
          
        <p>{selected_check?.data?.input_text}</p>
        <div className={enlargeTask? 'enlarge-btn display-none': 'enlarge-btn'} onClick={() => setEnlargeTask(1)}>Развернуть <DropDownArrow className='inline-svg'/></div>
        </div>
          
        </div>

        <div className='task-card result'>
            <div className='header'>Ответ <LogoStars className='inline-svg-large'/>

            </div>
            <div className='body'>
              {Report({selected_check})}

              {/* 
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
      */}      
            </div>
                
        </div>
      </div>
      :
      <div className='main-list-menu'>


      <div className='task-card'>
      <div className={enlargeTask ? 'body' : 'body shrinked'}>
        
      <p className="inactive">Загружаем данные по задаче...</p>
      </div>
        
      </div>

      </div>
      }
    </div>

  </>;
};
