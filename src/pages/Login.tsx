import { useTonConnectUI } from "@tonconnect/ui-react";

interface LoginProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function Login({ setIsLoggedIn }: LoginProps) {
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const handleLogin = () => {
    tonConnectUI.openModal();
    setIsLoggedIn(true);
    setOptions({});
  };

  return (
    <div className="flex flex-col gap-10 px-10 py-20 justify-end bg-[#d3aeff] text-black h-screen w-screen font-brice-regular">
      <img
        src="/starsquare.png"
        className="absolute w-[60px] h-[60px] top-[60px] left-[60px]"
      />
      <img
        src="/star2.png"
        className="absolute w-[60px] h-[60px] top-[250px] left-[20px] transform rotate-[40deg]"
      />
      <img
        src="/flower.png"
        className="absolute w-[160px] h-[160px] top-[350px] left-[100px]"
      />
      <img
        src="/star3.png"
        className="absolute w-[200px] h-[200px] top-[100px] right-[50px]"
      />
      <div className="">
        <h1 className="text-5xl">Join. Predict. Connect.</h1>
        <p className="text-sm">
          Bet on outcomes, join exclusive discussions, and connect with a
          community. <br /> Powered by TON Blockchain.
        </p>
      </div>
      <div className="bg-black w-fit h-fit rounded-lg">
        <button
          onClick={handleLogin}
          className="bg-[#fede64] px-6 py-2 text-2xl border-black border-2 rounded-lg -translate-y-1 -translate-x-1 active:translate-y-0 active:translate-x-0 transition-all"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
