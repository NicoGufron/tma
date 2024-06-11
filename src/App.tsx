import './App.css'

import { CircularProgress } from '@nextui-org/react';

function App() {

  return (
    <>
      <div className={"flex flex-col items-center"}>
        {/* <Card>
          <CardBody>
            <div className={"flex flex-row gap-5"}>
              <span className='flex flex-column'>
              </span>
            </div>
          </CardBody>
        </Card> */}
        <CircularProgress></CircularProgress>
        <p className='pt-10'>We seek to end the suffering. Why you must persist?</p>
      </div>
    </>
  )
}

export default App
