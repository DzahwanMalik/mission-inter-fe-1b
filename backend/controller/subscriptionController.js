import { User, Subscription } from "../models/indexModel.js";
import dotenv from "dotenv";

dotenv.config();

const getSubscriptions = async (req, res) => {
  try {
    const subscription = await Subscription.findAll();
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getSubscriptions,
  getSubscription,
}
