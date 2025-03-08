const crypto = require("node:crypto");
const User = require("../models/userModel");
const { error } = require("node:console");

// @desc get user balance
// @route GET /api/balance
// @access Private

const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({ balance: user.balance });
  } catch (error) {
    res.status({ error: "Server error" });
  }
};

// @desc add or dedut balcne of user based on dice number
// @route POST /api/roll
// @access Private

const rollDice = async (req, res) => {
  const { bet } = req.body;

  if (bet <= 0) return res.status(400).json({ error: "Invalid bet amount" });

  try {
    const user = await User.findById(req.user.id);

    if (user.balance < bet) {
      return res.status(401).json({ error: "Insufficient balance" });
    }

    const serverSeed = crypto.randomBytes(16).toString("hex");
    const roll =
      (parseInt(
        crypto
          .createHash("sha256")
          .update(serverSeed)
          .digest("hex")
          .slice(0, 8),
        16
      ) %
        6) +
      1;

    let newBalance = user.balance - bet;

    if (roll >= 4) newBalance += bet * 2;

    await User.findByIdAndUpdate(user._id, { balance: newBalance });

    res.json({
      roll,
      newBalance,
      hash: crypto.createHash("sha256").update(serverSeed),
    });
  } catch (error) {
    res.status(500).json({ error: "Server errorr" });
  }
};

module.exports = {
  getBalance,
  rollDice
};
