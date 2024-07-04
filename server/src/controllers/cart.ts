import { Response, Request } from "express";
import prisma from "../utils/prisma";
import { TAddToCartBody } from "../types/cart";

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
  const { productId, variants, quantity }: TAddToCartBody = req.body;

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

    const newCartItem = await prisma.cartItem.create({
      data: {
        Cart: { connect: { id: cart.id } },
        product: { connect: { id: productId } },
        quantity: Number(quantity),
        variants,
      },
      include: {
        product: {
          include: {
            productImage: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Item added to cart successfully!",
      cartItem: newCartItem,
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

    const deletedItem = await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    res.status(200).json({
      message: "Item deleted from cart!",
      cartItem: deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Item failed to delete from cart",
    });
  }
};
