"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, username, password } = req.body;
        const existingUser = yield prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
        if (existingUser) {
            return res.status(409).json({ message: "Email or username already in use" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                username,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Registration failed", error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identifier, password } = req.body;
        const user = yield prisma.user.findFirst({
            where: {
                OR: [{ email: identifier }, { username: identifier }],
            },
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const passwordsMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordsMatch) {
            return res.status(401).json({ message: "Wrong password" });
        }
        const { password: _password } = user, userDetails = __rest(user, ["password"]);
        const token = jsonwebtoken_1.default.sign(userDetails, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie("authenticationToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        res.json(userDetails);
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Login was unsuccessful", error: error.message });
    }
});
exports.loginUser = loginUser;
