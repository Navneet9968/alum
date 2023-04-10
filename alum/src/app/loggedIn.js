import { cookies } from "next/headers";
import CryptoJS from "crypto-js";

export default function LoggedIn() {
  const cookieStore = cookies();
  try {
    const data = CryptoJS.AES.decrypt(
      cookieStore.get("User").value,
      process.env.SECRET
    );
    const middleData = data.toString(CryptoJS.enc.Utf8);
    const payload = JSON.parse(middleData);
    payload.verified = Boolean(payload.verified == "true");
    if (payload) {
      return { loggedIn: true, data: payload };
    } else {
      return { loggedIn: false };
    }
  } catch {
    return { loggedIn: false };
  }
}
