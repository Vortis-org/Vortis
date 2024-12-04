import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import Markets from "./pages/Markets";
import Postions from "./pages/Postions";
import Profile from "./pages/Profile";
import Create from "./pages/Create";

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://localhost:5173/tonconnect-manifest.json">
      <Navbar>
        <main className="bg-[#efe7f7] text-black h-screen w-screen font-brice-regular py-20">
          Hello
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/positions" element={<Postions />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </BrowserRouter>
        </main>
      </Navbar>
    </TonConnectUIProvider>
  );
}

export default App;
