import { Products } from "@/models/product";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Newproducts } from "@/models/newproduct";

export async function GET(req: Request) {
  console.log("==== INCOMING NEW PRODUCTS REQUEST ====");

  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user_id");
    const k = searchParams.get("k");

    if (!userId || !k) {
      return NextResponse.json(
        { error: "Missing user_id or k in query params" },
        { status: 400 }
      );
    }

    // Fetch from ML API with both params
    const mlApiUrl = `http://127.0.0.1:8000/new_user_recommendations?user_id=${encodeURIComponent(
      userId
    )}&k=${encodeURIComponent(k)}`;

    const mlResponse = await fetch(mlApiUrl);

    if (!mlResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from ML API" },
        { status: mlResponse.status }
      );
    }

    const mlProducts = await mlResponse.json(); // Expect array of products

    // Prepare products to store with k included
    const productsToSave = mlProducts.map((product: any) => ({
      user_id: userId,
      k,
      item_id: product.item_id,
      title: product.title,
      image_url: product.image_url || "https://via.placeholder.com/150",
    }));

    // Remove old entries for this user_id + k combo
    await Newproducts.deleteMany({ user_id: userId, k });

    // Insert new ones
    await Newproducts.insertMany(productsToSave);

    // Return products to user
    return NextResponse.json(productsToSave, { status: 200 });
  } catch (error) {
    console.error("Error handling products request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
