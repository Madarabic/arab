// ضع رابط Web App الخاص بـ Google Apps Script في المتغير أدناه
const API_URL = "ضع رابط Web App الخاص بـ Google Apps Script هنا";

async function apiCall(action, payload = {}, method = "POST") {
  try {
    const token = localStorage.getItem("MADARABIC_TOKEN");
    payload.token = token;
    payload.action = action;

    let response;
    if (method === "GET") {
      const queryParams = new URLSearchParams(payload).toString();
      response = await fetch(`${API_URL}?${queryParams}`);
    } else {
      response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
    }

    const res = await response.json();
    if (!res.success && res.message === "جلسة غير صالحة أو منتهية") {
      localStorage.clear();
      window.location.href = "/login.html";
    }
    return res;
  } catch (err) {
    console.error("API Error:", err);
    return { success: false, message: "تعذر الاتصال بالخادم" };
  }
}