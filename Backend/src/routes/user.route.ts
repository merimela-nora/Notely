import express from "express";
import {
//  userDetails,
} from "../controllers/user.controllers";
import { userDetails } from "../controllers/user.controllers";




const router = express.Router();


router.get("/m", userDetails);

export default router;
