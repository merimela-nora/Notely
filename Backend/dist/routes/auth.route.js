"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyUserInformation_1 = __importDefault(require("../middlewares/verifyUserInformation"));
const validatePasswordstrength_1 = __importDefault(require("../middlewares/validatePasswordstrength"));
const checkUsernameAndEmail_1 = __importDefault(require("../middlewares/checkUsernameAndEmail"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const router = (0, express_1.Router)();
router.post("/register", verifyUserInformation_1.default, checkUsernameAndEmail_1.default, validatePasswordstrength_1.default, auth_controllers_1.registerUser);
router.post("/login", auth_controllers_1.loginUser);
exports.default = router;
