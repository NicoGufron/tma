import { NextUIProvider } from "@nextui-org/react";
import { Route, Routes, useNavigate } from "react-router-dom"
import Homepage from "./pages/homepage";
import Friends from "./pages/friends";

function App() {

  const navigate = useNavigate();

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route path='/tma/' element={<Homepage></Homepage>}></Route>
          <Route path='/tma/friends/' element={<Friends></Friends>}></Route>
        </Routes>
      </NextUIProvider>
    </>
  )
}

export default App
