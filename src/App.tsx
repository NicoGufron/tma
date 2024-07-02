import { useEffect, useState } from 'react';
import './App.css'
import './index.css';

import { CircularProgress } from '@nextui-org/react';

import notcoin from './assets/notcoin.png';

import WebApp from '@twa-dev/sdk';

function App() {

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [points, setPoints] = useState(0.00000);
  // const [energy, setEnergy] = useState(800);
  // const [maxEnergy, setMaxEnergy] = useState(6500);
  // const [clicks, setClicks] = useState<{ id: Number, x: number, y: number }[]>([]);
  // const pointsToAdd = 12;
  // const energyToReduce = 12;

  // const [tokenCount, setTokenCount] = useState(980);

  var i = 0;
  var limit = 99;

  // const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if (energy - energyToReduce < 0) {
  //     return;
  //   }

  //   const rect = e.currentTarget.getBoundingClientRect();
  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;

  //   setPoints(points + pointsToAdd);
  //   setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
  //   setClicks([...clicks, { id: Date.now(), x, y }]);
  // }

  // const handleAnimationEnd = (id: number) => {
  //   setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  // }

  useEffect(() => {
    setLoading(true);

    setInterval(() => {
      if (i <= limit) {
        i += 1;
        setProgress(i);
      } else {
        setTimeout(function () {
          setLoading(false);
        }, 1000)
      }
    }, 100)
  }, [])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setEnergy((prevEnergy) => Math.min(prevEnergy + 1, maxEnergy));
  //   }, 100);

  //   return () => clearInterval(interval);

  // })

  useEffect(() => {
    if (!loading) {

      const interval = setInterval(() => {
        setPoints((prevPoints) => Math.min(prevPoints + 0.00001, 999999));   
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [])

  return (
    <>
      <div>
        {loading ?
          <div className={"flex flex-col min-h-screen items-center justify-center"}>
            <CircularProgress size="lg" value={progress} showValueLabel></CircularProgress>
            <p className='mt-10 text-center text-lg'>Loading...</p>
          </div>
          :
          <div className={"bg-gradient-main min-h-screen px-4 flex flex-col items-center justify-between text-white"}>
            <div className={"absolute inset-0 h-1/2 bg-gradient-overlay z-0"}></div>
            <div className={"absolute inset-0 flex items-center justify-center z-0"}>
              <div className={'radial-gradient-overlay'}></div>
            </div>

            <div className={"w-full z-10 flex flex-col items-center text-white"}>
              <div className={"fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white"}>
                <div className={"w-full"}>
                    <p className={"text-sm font-bold"}>In Storage: </p>
                </div>
                <div className="mt-2 text-4xl font-bold flex items-center">
                  <img src={notcoin} width={24} height={24}></img>
                  <span className="ml-2">{points.toFixed(5)}</span>
                </div>
                <div className="text-base mt-2 flex items-center text-sm font-bold">
                  <div onClick={(() => {WebApp.showAlert("YAY")})}>Balance: 2.00000</div>
                </div>
              </div>
            </div>
            <div className={"flex-grow flex items-center justify-center"}>
              <div className={"relative mt-10"}>
                <img src={notcoin} width={180} height={180} />
                {/* {clicks.map((click) => (
                  <div
                    // key={click.id}
                    className={"absolute text-5xl font-bold opacity-0"}
                    style={{
                      top: `${click.y - 42}px`,
                      left: `${click.x - 28}px`,
                      animation: `float 1s ease-out`
                    }}
                  // onAnimationEnd={() => handleAnimationEnd(click.id)}
                  >
                    12
                  </div>
                ))} */}
              </div>
            </div>
            <div className={"fixed bottom-2 left-0 w-full px-4 pb-4 z-10"}>
              <div className={"w-full flex justify-between gap-2"}>
                {/* <div className={"w-1/3 flex items-center justify-start max-w-32"}>
                  <div className={"flex items-center justify-center"}>
                    <div className={"ml-2 text-left"}>
                      <span className={"text-white text-sm font-bold block"}>{energy}</span>
                      <span className={"text-white text-sm opacity-75"}>/ {maxEnergy} </span>
                    </div>
                  </div>
                </div> */}
                <div className={"flex-grow flex items-center w-full text-md"}>
                  <div className={"w-full bg-[#fba007] py-4 rounded-2xl flex justify-around"} style={{border: "1px solid black", boxShadow: "1px 3px black"}}>
                    <button className={"flex flex-col items-center gap-1"}>
                      <span>Frens</span>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                      {/* <img src={coin} width={24} height={24} alt="High Voltage" /> */}
                      <span>Earn</span>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                      {/* <img src={rocket} width={24} height={24} alt="High Voltage" /> */}
                      <span>Boosts</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={"w-full bg-[#f9c035] rounded-full mt-4"}>
              <div className="{bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full}" style={{ width: `${(energy / maxEnergy) * 100}%` }}></div>
            </div> */}
          </div>
        }

      </div>
    </>
  )
}

export default App
