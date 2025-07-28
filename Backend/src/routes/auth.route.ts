import { Router } from "express";

import verifyUserInformation from "../middlewares/verifyUserInformation";
import validatePasswordStrength from "../middlewares/validatePasswordstrength";
import CheckUserNameAndEmail from "../middlewares/checkUsernameAndEmail";
import { registerUser , loginUser} from "../controllers/auth.controllers";

const router: Router = Router();

router.post(
  "/register",
  verifyUserInformation,
  CheckUserNameAndEmail,
  validatePasswordStrength,
  registerUser,
);

router.post("/login",
loginUser,
);


export default router;
