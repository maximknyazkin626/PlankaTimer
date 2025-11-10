import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function MainScreen({toggleIsOpen}) {
  return(
    <div className='mainScreen'>
      <img src="/src/assets/plank1.jpg" alt="plank" style={{width: '320px'}}/>
      <span style={{fontSize: '40px', fontWeight: '300'}}>Plank Timer</span>
      <button onClick={toggleIsOpen} style={{width: "150px", fontSize: '18px'}}>Begin</button>
    </div>
  );
}

function Condition({cond, style}) {
  return (
    <div className={style} style={{fontSize: '20px',
  fontWeight: '700', marginBottom: '15%'}}>{cond}</div>
  );
}

function TimerTitle({minutes, seconds, style}) {
  return (
    <h1 id="timer" className={style}>
      Таймер: {minutes}:{seconds.toString().padStart(2, '0')}</h1>
  );
}

function TimerComponent() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);

  const rank = minutes === 0 && seconds >= 30 && seconds < 60 ? "noob" :
    minutes === 1 && seconds < 30 ? "begginer" :
    minutes === 1 ? "normal" :
    minutes === 2 && seconds < 30 ? "intermediate" :
    minutes === 2 ? "high" :
    minutes === 3 && seconds < 30 ? "pro" :
    minutes === 3 ? "machine" :
    minutes >= 4 ? "god" : "";


  useEffect(() => {
    let timer;


    if (isRunning) {
      // Устанавливаем таймер, если он включён
      timer = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= 60) {
            // если достигнем 60 секунд, увеличиваем минуты и сбрасываем секунды
            setMinutes((m) => m + 1);
            return 0;
          }
          return s + 1;
        });
      }, 1000);
    }


    // Функция очистки таймера
    return () => {
      if (timer) {
        console.log("Cleaning up the timer");
        clearInterval(timer);
      }
    };
  }, [isRunning]); // Таймер обновляется при изменении isRunning

  const reset = () => {
    setMinutes(0);
    setSeconds(0);
  };



  return (
    <div className="mainContent">

        <TimerTitle minutes={minutes} seconds={seconds} style={rank}/>
        
        {/* { minutes === 0 && seconds === 0 ? 
          <>
            <TimerTitle minutes={minutes} seconds={seconds}/>
          </> : null
        }

        { minutes === 0 && (seconds > 0 && seconds < 30) ? 
          <>
            <TimerTitle minutes={minutes} seconds={seconds}/>
          </> : null
        } */}

        {rank === "noob" && (
          <Condition cond="Твоё звание: Червячок!" style="noob" />
        )}

        {rank === "begginer" && (
          <Condition cond='Твоё звание: Новичок!' style='begginer'/>
        )}

        {rank === "normal" && (
          <Condition cond='Твоё звание: Нормис!' style='normal'/>
        )}

        {rank === "intermediate" && (
          <Condition cond='Твоё звание: Продвинутый!' style='intermediate'/>
        )}

        {rank === "high" && (
          <Condition cond='Твоё звание: Мощный!' style='high'/>
        )}

        {rank === "pro" && (
          <Condition cond='Твоё звание: Профессионал!' style='pro'/>
        )}

        {rank === "machine" && (
          <Condition cond={`Твоё звание: Машина!`} style='machine'/>
        )}

        {rank === "god" && (
          <Condition cond={`Твоё звание: Бог!`} style='god'/>
        )}


      <div className="buttons">
        <button onClick={() => setIsRunning((prev) => !prev)} style={{marginRight: "px"}}>
          {isRunning ? "Стоп" : "Старт"}
        </button>
        <button onClick={reset} disabled={isRunning}>
          Обновить
        </button>
      </div>
    </div>
  );
}

function App() {

  const [isOpen, setIsOpen] = useState(true);
  

  function toggleIsOpen() {
    setIsOpen((prev) => !prev);
  }
  

  return (
    <>
      {isOpen ? <MainScreen toggleIsOpen={toggleIsOpen} /> : <TimerComponent />}
      
      
    </>
  )
}


export default App
