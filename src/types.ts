interface Market {
  id: bigint;
  description: string;
  predictionX: string;
  predictionY: string;
  endTime: bigint;
  status: bigint;
  winningPrediction: bigint;
  totalPool: bigint;
  poolX: bigint;
  poolY: bigint;
  image: string;
}
