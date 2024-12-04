import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import Markets from "./pages/Markets";
import Postions from "./pages/Postions";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import Login from "./pages/Login";
import { useState } from "react";
import Bet from "./pages/Bet";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }
  return (
    <Navbar>
      <main className="bg-[#efe7f7] text-black font-brice-regular py-20">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/positions" element={<Postions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<Create />} />
            <Route path="/bet/:id" element={<Bet />} />
          </Routes>
        </BrowserRouter>
      </main>
    </Navbar>
  );
}

export default App;
