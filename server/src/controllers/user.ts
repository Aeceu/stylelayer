import { Request, Response } from "express";
import prisma from "../utils/prisma";
import exclude from "../utils/exclude";
import { TLogin, TSignup } from "../types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName }: TSignup = req.body;
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({
        message: "Email already registered!",
      });
    }

    const hashPass = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        password: hashPass,
        firstName,
        lastName,
        cart: {
          create: {},
        },
      },
    });
    res.status(200).json({
      message: "User account created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to signup!",
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: TLogin = req.body;

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExists) {
      return res.status(400).json({ message: "Email does not exists!" });
    }

    const validPass = await bcrypt.compare(password, userExists.password);

    if (!validPass) {
      return res.status(400).json({ message: "Password doesn't match!" });
    }

    const accessToken = jwt.sign({ id: userExists.id }, process.env.TOKEN_SECRET!, {
      expiresIn: "10s",
    });

    const refreshToken = jwt.sign({ id: userExists.id }, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    await prisma.user.update({
      where: {
        id: userExists.id,
      },
      data: {
        refreshToken,
      },
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const userWithoutPass = exclude(userExists, ["password", "refreshToken"]);
    res.status(200).json({
      message: `User AUTHENTICATED!`,
      accessToken,
      user: userWithoutPass,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to log in!",
      error: error,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    if (!cookies.jwt) return res.sendStatus(204); // No content;
    const refreshToken = cookies.jwt;

    const foundUser = await prisma.user.findFirst({
      where: {
        refreshToken,
      },
    });

    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
      return res.sendStatus(204);
    }

    await prisma.user.update({
      where: {
        id: foundUser.id,
      },
      data: {
        refreshToken: "",
      },
    });
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to log out!",
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = await prisma.user.findFirst({
    where: {
      refreshToken,
    },
  });

  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.TOKEN_SECRET!, (err: any, decoded: any) => {
    if (err || foundUser.id !== decoded.id) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign({ id: foundUser.id }, process.env.TOKEN_SECRET!, {
      expiresIn: "10s",
    });

    const userWithoutPass = exclude(foundUser, ["password", "refreshToken"]);

    res.status(200).json({ user: userWithoutPass, accessToken });
  });
};
