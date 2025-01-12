import admin from "firebase-admin";

// Firebase Admin SDK の初期化
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // 改行を修正
    }),
  });
}

/**
 * Firebase IDトークンを検証
 * @param token - クライアントから送信されたJWTトークン
 * @returns トークンが有効ならトークンのペイロード情報を返す
 */
export const verifyIdToken = async (token: string) => {
  return admin.auth().verifyIdToken(token);
};
