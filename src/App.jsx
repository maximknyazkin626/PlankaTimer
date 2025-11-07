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
    <div className={style} style={{fontSize: '18px',
  fontWeight: '700'}}>{cond}</div>
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
        <TimerTitle minutes={minutes} seconds={seconds}/>
        { minutes === 0 && (seconds > 29 && seconds < 60) ? 
          <>
            <TimerTitle minutes={minutes} seconds={seconds} style='noob'/>
            <Condition cond='Ты NOOB!' style='noob'/>
          </> : null
        }

        { minutes === 1 && (seconds > 0 && seconds < 30) ? 
          <>
            <TimerTitle minutes={minutes} seconds={seconds} style='begginer'/>
            <Condition cond='Ты Begginer!' style='begginer'/>
          </> : null
        }

        { minutes === 1 && (seconds > 30 && seconds < 60) ? 
          <>
            <TimerTitle minutes={minutes} seconds={seconds} style='normal'/>
            <Condition cond='Ты Normal!' style='normal'/>
          </> : null
        }

        { minutes === 2 && (seconds > 0 && seconds < 30) ? 
          <>
            <TimerTitle minutes={minutes} seconds={seconds} style='intermediate'/>
            <Condition cond='Ты Intermediate!' style='intermediate'/>
          </> : null
        }

        { minutes === 2 && (seconds > 30 && seconds < 60) ? 
          <>
            <TimerTitle minutes={minutes} seconds={seconds} style='high'/>
            <Condition cond='Ты High!' style='high'/>
          </> : null
        }

        { minutes === 3 && (seconds > 0 && seconds < 30) ? 
          <>
            <TimerTitle minutes={minutes} seconds={seconds} style='pro'/>
            <Condition cond='Ты Pro!' style='pro'/>
          </> : null
        }

        { minutes === 3 && (seconds > 30 && seconds < 60) ? 
          <>
            <TimerTitle minutes={minutes} seconds={seconds} style='machine'/>
            <Condition cond='Ты Machine!' style='machine'/>
          </> : null
        }


      <div className="buttons">
        <button onClick={() => setIsRunning((prev) => !prev)} style={{marginRight: "px"}}>
          {isRunning ? "Стоп" : "Старт"}
        </button>
        <button onClick={reset} disabled={isRunning}>
          Обновить
        </button>
      </div>
      {minutes === 2 ? 
        <div style={{color: 'red', marginTop: 15, fontSize: '3.2em;', fontWeight: '700'}}>Your are god!</div> : <></>
      }
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
