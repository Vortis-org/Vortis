import { useParams } from "react-router-dom";

export default function Bet() {
  const { id } = useParams();
  return <div>{id}</div>;
}
