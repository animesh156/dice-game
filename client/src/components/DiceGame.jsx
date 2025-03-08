import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after logout
import API from "../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DiceGame = () => {
  const [balance, setBalance] = useState(null);
  const [bet, setBet] = useState("");
  const [rollResult, setRollResult] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [animatedRoll, setAnimatedRoll] = useState(1); // Temporary rolling dice face
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await API.get("/balance", { withCredentials: true });
        setBalance(response.data.balance);
      } catch (error) {
        toast.error("Failed to load balance");
        console.log(error);
      }
    };

    fetchBalance();
  }, []);

  const handleRollDice = async () => {
    if (bet <= 0 || bet > balance) {
      toast.error("Invalid bet amount!");
      return;
    }

    setRolling(true);
    setRollResult(null); // Hide previous result

    // Animate rolling dice effect
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setAnimatedRoll((prev) => (prev % 6) + 1);
      rollCount++;
      if (rollCount > 10) clearInterval(rollInterval);
    }, 100); // Change dice face every 100ms

    try {
      const response = await API.post(
        "/roll-dice",
        { bet },
        { withCredentials: true }
      );

      setTimeout(() => {
        clearInterval(rollInterval); // Stop rolling effect
        setRollResult(response.data.roll);
        setBalance(response.data.newBalance);
        if (response.data.roll >= 4) {
          // Win case (4, 5, 6) → Green success toast
          toast.success(
            `🎲 You rolled a ${response.data.roll}! New Balance: $${response.data.newBalance}`,
            {
              style: { background: "#22c55e", color: "white" }, // Green color
            }
          );
        } else {
          // Lose case (1, 2, 3) → Red error toast
          toast.error(
            `💀 You rolled a ${response.data.roll}. You lost $${bet}! New Balance: $${response.data.newBalance}`,
            {
              style: { background: "#ef4444", color: "white" }, // Red color
            }
          );
        }
        setRolling(false);
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
      clearInterval(rollInterval);
      setRolling(false);
    }
  };

  const userName = localStorage.getItem("userName") || "guest";

  // Logout function
  const handleLogout = async () => {
    await API.post("/user/logout", {}, { withCredentials: true });
    toast.success("Logged out successfully");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAuthenticated");

    setTimeout(() => {
      navigate("/login"); // Redirect to login page
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 hover:cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg transition"
      >
        Logout
      </button>

      {/* Welcome Message */}
      <h1 className="mb-12 -mt-16 text-pink-500 font-bold text-lg">
        Welcome, <span className="uppercase">{userName}</span>
      </h1>

      {/* Dice Rolling Effect */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div
            key={num}
            className={`w-14 h-14 flex items-center justify-center rounded-lg text-2xl font-bold transition-all duration-300 ${
              (rolling ? animatedRoll : rollResult) === num
                ? "bg-green-500 scale-110 shadow-lg"
                : "bg-gray-800"
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Game Box */}
      <div className="w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-400">
          🎲 Provably Fair Dice Game
        </h1>

        <p className="text-lg mb-4">
          <span className="text-gray-400">Balance:</span>
          <span className="text-green-400 font-bold"> ${balance}</span>
        </p>

        <input
          type="number"
          placeholder="Enter bet amount"
          value={bet}
          onChange={(e) =>
            setBet(
              e.target.value === "" ? "" : e.target.value.replace(/^0+/, "")
            )
          }
          className="w-full p-3 text-lg bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />

        <button
          onClick={handleRollDice}
          disabled={rolling}
          className={`w-full mt-4 px-6 py-3 text-lg font-semibold rounded-lg transition-all ${
            rolling
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:scale-95"
          } text-white shadow-md`}
        >
          {rolling ? "Rolling..." : "Roll Dice 🎲"}
        </button>

        {rollResult !== null && (
          <p className="mt-6 text-2xl font-semibold">
            <span className={`text-${rollResult >= 4 ? "green" : "red"}-400`}>
              🎲 {rollResult}
            </span>
          </p>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default DiceGame;
