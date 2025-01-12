import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

// APIルートのGET/POSTハンドラ
export async function GET() {
  try {
    const collectionName = "task"; // Firestoreコレクション名
    const snapshot = await db.collection(collectionName).get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const collectionName = "task"; // Firestoreコレクション名
    const newData = await req.json();

    if (!newData || Object.keys(newData).length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    // Firestoreにデータを追加
    const docRef = await db.collection(collectionName).add(newData);

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save data" },
      { status: 500 }
    );
  }
}
