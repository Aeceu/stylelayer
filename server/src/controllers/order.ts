import { error } from "console";
import prisma from "../utils/prisma";
import { Request, Response } from "express";
import { TOrder, TUpdateOrder } from "../types/order";

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                productImage: true,
              },
            },
          },
        },
        trackingInfo: true,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to order item!",
      error,
    });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { cartItem, address }: TOrder = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user)
      return res.status(403).json({
        message: "User not found!",
      });

    const totalAmount = cartItem
      .map((item) => parseFloat(item.product.price) * parseFloat(item.quantity))
      .reduce((partial, val) => partial + val, 0);

    const newOrder = await prisma.$transaction(async (prisma) => {
      // Create the new order
      const order = await prisma.order.create({
        data: {
          userId,
          status: "PENDING",
          totalAmount,

          trackingInfo: {
            create: {
              currentStatus: "preparing your package",
              location: "Pasig City",
            },
          },
          orderItems: {
            createMany: {
              data: cartItem.map((item) => ({
                productId: item.product.id,
                quantity: Number(item.quantity),
                variants: item.variants,
              })),
            },
          },
          region: address.region,
          province: address.province,
          city: address.city,
          baranggay: address.baranggay,
          street: address.street,
          other: address.other,
        },
      });

      // Update the product quantities
      await Promise.all(
        cartItem.map((item) =>
          prisma.product.update({
            where: {
              id: item.product.id,
            },
            data: {
              stock: {
                decrement: Number(item.quantity),
              },
            },
          })
        )
      );

      // Delete cart items
      await Promise.all(
        cartItem.map((item) =>
          prisma.cartItem.delete({
            where: {
              id: item.id,
            },
          })
        )
      );

      return order;
    });

    res.status(200).json({
      message: "Order successfully!",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to order item!",
      error,
    });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const { status, trackingInfo }: TUpdateOrder = req.body;
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
        trackingInfo: {
          update: {
            currentStatus: trackingInfo.currentStatus,
            location: trackingInfo.location,
          },
        },
      },
    });
    res.status(200).json({
      message: "Order updated successfully!",
      updatedOrder: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update order!",
    });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;

    const canceledOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "CANCELLED",
        trackingInfo: undefined,
        region: "",
        province: "",
        city: "",
        baranggay: "",
        street: "",
        other: "",
      },
    });

    res.status(200).json({
      message: "Order cancel successfully!",
      error,
      canceledOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to cancel order.",
      error,
    });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                productImage: true,
              },
            },
          },
        },
        trackingInfo: true,
      },
    });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to order item!",
      error,
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const status = req.query.status as
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "ALL";
  try {
    let orders;
    let totalOrders;
    let totalPages;

    if (status && status !== "ALL") {
      orders = await prisma.order.findMany({
        where: {
          status,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          orderItems: {
            include: {
              product: {
                include: {
                  productImage: true,
                },
              },
            },
          },
          trackingInfo: true,
        },
      });
    } else {
      orders = await prisma.order.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          orderItems: {
            include: {
              product: {
                include: {
                  productImage: true,
                },
              },
            },
          },
          trackingInfo: true,
        },
      });
    }
    totalOrders = await prisma.product.count();
    totalPages = Math.ceil(totalOrders / pageSize);
    res.status(200).json({ orders, totalOrders, currentPage: page });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get all orders",
    });
  }
};

export const getOrderByStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { status } = req.body;
    const orderByStatus = await prisma.order.findMany({
      where: {
        status,
        userId,
      },
      include: {
        trackingInfo: true,
        orderItems: {
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
    res.status(200).json(orderByStatus);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get pending orders",
      error,
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
      include: {
        trackingInfo: true,
        orderItems: {
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
    res.status(200).json({
      message: "Order updated successfully!",
      updatedOrder: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update order!",
    });
  }
};
