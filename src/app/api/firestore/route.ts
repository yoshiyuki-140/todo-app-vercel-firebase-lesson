import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

// APIルートのGET/POST/DELETEハンドラ
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

export async function DELETE(req: NextRequest) {
  try {
    const collectionName = "task"; // Firestoreコレクション名
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 }
      );
    }

    // ドキュメントの存在確認
    const docRef = db.collection(collectionName).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 }
      );
    }

    // ドキュメントを削除
    await docRef.delete();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete data" },
      { status: 500 }
    );
  }
}
