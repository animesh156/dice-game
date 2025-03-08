import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiceGame from "../components/DiceGame";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthorize = localStorage.getItem("isAuthenticated") === "true"; // Convert to boolean
    if (!isAuthorize) {
      navigate("/login");
    }
  }, [navigate]);

  const isAuthorize = localStorage.getItem("isAuthenticated") === "true"; // Ensure boolean check

  return isAuthorize ? <DiceGame /> : null;
}

export default Home;
