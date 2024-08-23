import express from "express";
import Account from "../models/Account.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

async function executeTransaction(beneficiaryId, senderId, amount) {
  const session = await Account.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const moneyCreditedToBeneficiary = await Account.findOneAndUpdate(
      { _id: beneficiaryId },
      { $inc: { balance: amount } },
      opts
    );

    const moneyDeductedFromSender = await Account.findOneAndUpdate(
      { _id: senderId },
      { $inc: { balance: -1 * amount } },
      opts
    );

    await session.commitTransaction();
    session.endSession();
    return true;
  } catch (error) {
    // If an error occurred, abort the whole transaction and
    // undo any changes that might have happened
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const account = await Account.findOne({ user: userId });

    return res.status(200).json({ balance: account.balance / 100.0 });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const amount = req.body.amount * 100;
    const senderAccount = await Account.findOne({ user: req.userId });
    const beneficiaryAccount = await Account.findOne({ user: req.body.to });

    //Check the current amount is less than or equal to the senderAccount balance
    if (amount > senderAccount.balance) {
      res.status(400).json({
        message: "Low Balance!",
      });
    }

    const success = executeTransaction(
      beneficiaryAccount._id,
      senderAccount._id,
      amount
    );

    if (!success) {
      return res.status(400).json({ message: "Transaction Unsuccessfull" });
    }

    return res
      .status(200)
      .json({
        message: `Rs. ${amount} sent to ${beneficiaryAccount.firstName}`,
      });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

export default router;
