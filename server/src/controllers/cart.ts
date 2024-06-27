import { Response, Request } from "express";
import prisma from "../utils/prisma";

export const getCartByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const userCart = await prisma.cart.findFirst({
      where: {
        userId,
      },
      include: {
        cartItem: {
          include: {
            product: {
              include: {
                productImage: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(userCart);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const addToCart = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { productId, color, size, quantity } = req.body;

  try {
    let cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: { cartItem: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          user: { connect: { id: userId } },
        },
        include: { cartItem: true },
      });
    }

    const existingCartItem = cart.cartItem.find(
      (item) => item.productId === productId && item.size === size && item.color === color
    );

    let newCartItem;
    if (existingCartItem) {
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      newCartItem = await prisma.cartItem.create({
        data: {
          Cart: { connect: { id: cart.id } },
          product: { connect: { id: productId } },
          quantity,
          size,
          color,
        },
      });
    }

    const updatedCartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    });

    const subtotal = updatedCartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );

    await prisma.cart.update({
      where: { id: cart.id },
      data: { subtotal },
    });

    res.status(200).json({
      message: "Item added to cart successfully!",
      cartItem: newCartItem,
      subtotal,
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({
      message: "Error adding item to cart",
      error: error,
    });
  }
};

export const deleteFromCart = async (req: Request, res: Response) => {
  try {
    const cartItemId = req.params.cartItemId;
    const cartId = req.params.cartId;

    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    let cart = await prisma.cart.findFirst({
      where: {
        id: cartId,
      },
      include: {
        cartItem: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(400).json({ message: "User doesn't have a cart!" });
    }

    const newSubTotal = cart.cartItem.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );

    await prisma.cart.update({
      where: { id: cart.id },
      data: { subtotal: newSubTotal },
    });

    res.status(200).json({
      message: "Item deleted from cart!",
      subtotal: newSubTotal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Item failed to delete from cart",
    });
  }
};
