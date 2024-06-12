import { useEffect, useState } from 'react';
import './App.css'

import { Button, CircularProgress } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faRocket, faCoins } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [tokenCount, setTokenCount] = useState(980);

  var i = 0;
  var limit = 99;

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

  return (
    <>
      <div>
        {loading ?
          <div className={"flex flex-col items-center"}>
            <CircularProgress size="lg" value={progress} showValueLabel></CircularProgress>
            <p className='mt-10 text-center'>We seek to end the suffering. Why you must persist?</p>
          </div>
          :
          <div className={"flex flex-col items-center"}>
            <div className={"flex flex-row justify-center items-center gap-5"}>
              <div className={"w-6 h-6 rounded-full bg-red-600"}></div>
              <h3 className={"text-4xl font-bold text-white"}>{tokenCount}</h3>
            </div>
            <Button disableRipple className={"w-40 h-40 rounded-full mt-20"} onClick={() => setTokenCount((tokenCount) => tokenCount + 1)}>
              <p className={"text-5xl font-bold"}>+</p>
            </Button>
            <div className={"flex flex-row justify-between w-60 bg-slate-800 mt-5 rounded-md"}>
              
                <Button disableAnimation className={"bg-transparent"}>
                  <div className={"flex flex-col"}>
                    <FontAwesomeIcon icon={faRocket} color='white' />
                    <p className={"text-white font-semibold"}>Boosts</p>
                  </div>
                </Button>
                <Button className={"bg-transparent"}>
                  <div className={"flex flex-col"}>
                    <FontAwesomeIcon icon={faCoins} color='white' />
                    <p className={"text-white font-semibold"}>Earn</p>
                  </div>
                </Button>
                <Button className={"bg-transparent"}>
                  <div className={"flex flex-col"}>
                    <FontAwesomeIcon icon={faUserGroup} color='white' />
                    <p className={"text-white font-semibold"}>Frens</p>
                  </div>
                </Button>
              </div>
            </div>
        }

      </div>
    </>
  )
}

export default App
