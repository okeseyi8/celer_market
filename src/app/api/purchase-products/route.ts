import { Purchasedproducts } from "@/models/purchasedproducts";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("==== INCOMING PURCHASE PRODUCTS REQUEST ====");

  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user_id");
    const itemId = searchParams.get("item_id");

    if (!userId || !itemId) {
      return NextResponse.json(
        { error: "Missing user_id or item_id in query params" },
        { status: 400 }
      );
    }

    // Fetch from ML API with both params using POST
    const mlApiUrl = `http://127.0.0.1:8000/purchases_by_id?user_id=${encodeURIComponent(
      userId
    )}&item_id=${encodeURIComponent(itemId)}`;

    const mlResponse = await fetch(mlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!mlResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from ML API" },
        { status: mlResponse.status }
      );
    }

    const mlProducts = await mlResponse.json(); // Expect array of products

    // Prepare products to store
    const productToSave = {
      user_id: userId,
      itemId,
      item_id: mlProducts.item_id,
      title: mlProducts.title || "Unknown Product",
      image_url: mlProducts.image_url || "https://via.placeholder.com/150",
      verified_purchase: mlProducts.verified_purchase,
    };
    // Remove old entries for this user_id + itemId combo
    await Purchasedproducts.deleteMany({ user_id: userId, item_id: itemId });

    // Insert new ones
   await Purchasedproducts.insertMany([productToSave]);

    // Return products to user
    return NextResponse.json(productToSave,  { status: 200 });
  } catch (error) {
    console.error("Error handling products request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
