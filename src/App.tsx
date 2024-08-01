import { NextUIProvider } from "@nextui-org/react";
import { Route, Routes, useNavigate } from "react-router-dom"
import Homepage from "./pages/homepage";
import Friends from "./pages/friends";
import WebApp from "@twa-dev/sdk";
import Tasks from "./pages/tasks";

function App() {

  const navigate = useNavigate();
  WebApp.setHeaderColor('#FFFEDF');

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route path='/tma/' element={<Homepage></Homepage>}></Route>
          <Route path='/tma/friends/' element={<Friends></Friends>}></Route>
          <Route path='/tma/tasks/' element={<Tasks></Tasks>}></Route>
        </Routes>
      </NextUIProvider>
    </>
  )
}

export default App
