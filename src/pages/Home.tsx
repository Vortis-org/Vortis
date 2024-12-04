import { Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  PanInfo,
} from "framer-motion";
import { useState } from "react";

interface Market {
  id: BigInt;
  description: string;
  predictionX: string;
  predictionY: string;
  endTime: BigInt;
  status: BigInt;
  winningPrediction: BigInt;
  totalPool: BigInt;
  poolX: BigInt;
  poolY: BigInt;
  image: string;
}

const dummyMarketDataArray: Market[] = [
  {
    id: BigInt(1),
    description: "Will it rain tomorrow?",
    predictionX: "Yes",
    predictionY: "No",
    endTime: BigInt(1733310646),
    status: BigInt(0),
    winningPrediction: BigInt(0),
    totalPool: BigInt(1000),
    poolX: BigInt(600),
    poolY: BigInt(400),
    image: "/default-image.jpeg",
  },
  {
    id: BigInt(2),
    description: "Is the stock market going up?",
    predictionX: "Yes",
    predictionY: "No",
    endTime: BigInt(1733310746),
    status: BigInt(1),
    winningPrediction: BigInt(1),
    totalPool: BigInt(2000),
    poolX: BigInt(800),
    poolY: BigInt(1200),
    image: "/default-image.jpeg",
  },
  {
    id: BigInt(3),
    description: "Will the next iPhone have a notch?",
    predictionX: "Yes",
    predictionY: "No",
    endTime: BigInt(1733310846),
    status: BigInt(0),
    winningPrediction: BigInt(0),
    totalPool: BigInt(1500),
    poolX: BigInt(900),
    poolY: BigInt(600),
    image: "/default-image.jpeg",
  },
];

const SwipeableCard = ({
  market,
  onSwipe,
}: {
  market: Market;
  onSwipe: (direction: "left" | "right") => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const yesOpacity = useTransform(x, [-200, 0, 100], [0, 0, 1]);
  const noOpacity = useTransform(x, [-100, 0, 200], [1, 0, 0]);
  const controls = useAnimation();

  const handleDragEnd = async (_: never, info: PanInfo) => {
    const swipeThreshold = 100;

    if (Math.abs(info.offset.x) > swipeThreshold) {
      await controls.start({
        x: info.offset.x > 0 ? 1000 : -1000,
        transition: { duration: 0.3 },
      });

      onSwipe(info.offset.x > 0 ? "right" : "left");

      x.set(0);
      y.set(0);
      controls.set({ x: 0, y: 0 });
    } else {
      controls.start({
        x: 0,
        y: 0,
        transition: { type: "spring", duration: 0.5 },
      });
    }
  };

  const handleButtonClick = async (direction: "left" | "right") => {
    await controls.start({
      x: direction === "right" ? 1000 : -1000,
      transition: { duration: 0.3 },
    });
    onSwipe(direction);
  };

  return (
    <motion.div
      className="absolute w-full"
      style={{ x, y, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      animate={controls}
    >
      <div className="relative h-fit border-black border-4 rounded-2xl touch-none">
        <motion.div
          className="absolute top-8 right-8 bg-[#99ff88] p-4 rounded-full border-2 border-black"
          style={{ opacity: yesOpacity }}
        >
          <Check color="black" size={40} />
        </motion.div>

        <motion.div
          className="absolute top-8 left-8 bg-[#ff6961] p-4 rounded-full border-2 border-black"
          style={{ opacity: noOpacity }}
        >
          <X color="white" size={40} />
        </motion.div>

        <img
          src={market.image}
          alt="market"
          className="w-full h-[75vh] object-cover rounded-xl select-none"
          draggable="false"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="absolute flex flex-row justify-center gap-28 bottom-0 left-0 right-0 translate-y-1/2">
          <button
            className="p-4 rounded-full bg-[#ff6961] border-black border-2"
            onClick={() => handleButtonClick("left")}
          >
            <X color="white" size={30} />
          </button>
          <button
            className="p-4 rounded-full bg-[#99ff88] border-black border-2"
            onClick={() => handleButtonClick("right")}
          >
            <Check color="black" size={30} />
          </button>
        </div>

        <div className="absolute bottom-14 left-4 flex flex-col gap-4 text-white">
          <h2 className="font-brice-semibold text-2xl">{market.description}</h2>
          <div className="flex flex-col gap-2">
            <p>{market.predictionX}</p>
            <Progress
              value={(Number(market.poolX) / Number(market.totalPool)) * 100}
            />
            <p>
              {(
                (Number(market.poolX) / Number(market.totalPool)) *
                100
              ).toFixed(1)}
              % Chance
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    console.log(`Swiped ${direction}`);
    setCurrentIndex((prevIndex) => {
      if (prevIndex < dummyMarketDataArray.length - 1) {
        return prevIndex + 1;
      }
      return 0;
    });
  };

  return (
    <div className="px-4 pb-14">
      <div className="relative h-[90vh]">
        {dummyMarketDataArray.map((market, index) => {
          if (index < currentIndex || index > currentIndex + 1) return null;

          return (
            <SwipeableCard
              key={Number(market.id)}
              market={market}
              onSwipe={handleSwipe}
            />
          );
        })}
      </div>
    </div>
  );
}
