import { Request, Response } from "express";
import prisma from "../utils/prisma";
import cloudinary from "../utils/cloudinary";
import { TNewProduct, TNewProductImages } from "../types/product";

export const createProduct = async (req: Request, res: Response) => {
  const data: TNewProduct = req.body;
  try {
    const productImages: TNewProductImages = await Promise.all(
      data.productImages.map(async (image) => {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "stylelayer/productImage",
          transformation: [{ quality: "auto" }],
        });
        return {
          imageId: uploadResponse.public_id,
          imageUrl: uploadResponse.secure_url,
        };
      })
    );

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        stock: Number(data.stock),
        variants: data.variants,
        productImage: {
          createMany: {
            data: productImages,
          },
        },
      },
    });
    res.status(200).json({
      message: "New product created successfully!",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create product!",
      error,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
      include: {
        productImage: true,
      },
    });

    if (!product) {
      return res.status(400).json("Product not found!");
    }

    for (const item of product.productImage) {
      await cloudinary.uploader.destroy(item.imageId);
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    res.status(200).json({
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to delete product!",
      error,
    });
  }
};

export const updateProductInformation = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const { data } = req.body;

  try {
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...data,
      },
    });

    res.status(200).json({
      message: "Product information updated succesfully!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update product information!",
      error,
    });
  }
};

export const updateProductStock = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const { stock } = req.body;
  try {
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        stock,
      },
      include: {
        productImage: true,
      },
    });
    res.status(200).json({
      message: "Product updated succesfully!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update product stock!",
      error,
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const category = req.query.category as string;

  try {
    let products;
    let totalProducts;
    let totalPages;

    if (category) {
      products = await prisma.product.findMany({
        where: {
          category,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          productImage: true,
        },
      });
    } else {
      products = await prisma.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          productImage: true,
        },
      });
    }

    totalProducts = await prisma.product.count();
    totalPages = Math.ceil(totalProducts / pageSize);

    res.status(200).json({
      products,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get all the products",
      error,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
      include: {
        productImage: true,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get the product!",
      error,
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.product.findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
    });

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get categories!",
      error,
    });
  }
};

export const getSearchByCategory = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const category = req.query.category as string;
    let products;

    if (category) {
      products = await prisma.product.findMany({
        where: {
          category,
          name: {
            contains: search,
          },
        },
        include: {
          productImage: true,
        },
      });
    } else {
      products = await prisma.product.findMany({
        where: {
          name: {
            contains: search,
          },
        },
        include: {
          productImage: true,
        },
      });
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get the products!",
      error,
    });
  }
};
