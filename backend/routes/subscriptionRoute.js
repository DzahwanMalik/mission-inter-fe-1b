import express from "express";
import {
  getSubscriptions,
  getSubscription,
} from "../controller/subscriptionController.js";

const router = express.Router();

router.get("/subscription", getSubscriptions);
router.get("/subscription/:id", getSubscription);

export default router;
