const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJuazE3MDZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNjk0MywiaWF0IjoxNzc3NzA2MDQzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZmMzZDQxMGQtMTNkYS00NTAwLWI3MDItYjIyZjQ4NGI4NTY0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibml0eWFuYW5kIGt1bWFyIiwic3ViIjoiMzUwNThmNmMtZjUzMS00MDFlLWIwNjgtZjJkYTUyNjBiMTU1In0sImVtYWlsIjoibmsxNzA2QHNybWlzdC5lZHUuaW4iLCJuYW1lIjoibml0eWFuYW5kIGt1bWFyIiwicm9sbE5vIjoicmEyMzExMDAzMDEwOTU0IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiMzUwNThmNmMtZjUzMS00MDFlLWIwNjgtZjJkYTUyNjBiMTU1IiwiY2xpZW50U2VjcmV0IjoiWHBZclRtWUdTa2tlc21ubiJ9.2BRn0v25vNj2vWKYfhwAdN_F1mETiY-Bf1Ta-BHw2zA";

export const fetchNotifications = async (page = 1, limit = 10, type = "") => {
  try {
    let url = `http://20.244.56.144/evaluation-service/notifications?page=${page}&limit=${limit}`;

    if (type) {
      url += `&notification_type=${type}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      throw new Error("Unauthorized or API error");
    }

    return await res.json();

  } catch (err) {
    console.error("FETCH ERROR:", err);
    return { notifications: [] }; // prevents crash
  }
};