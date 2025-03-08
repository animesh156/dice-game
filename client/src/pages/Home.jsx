import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import DiceGame from "../components/DiceGame";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthorize = localStorage.getItem("isAuthenticated");

    if (!isAuthorize) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [navigate]);

  const isAuthorize = localStorage.getItem("isAuthenticated");

  return (
    <>
      <ToastContainer />
      {!isAuthorize ? null : (
        <>
          <DiceGame />
        </>
      )}
    </>
  );
}

export default Home;
