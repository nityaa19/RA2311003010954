const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

const Log = async (stack, level, pkg, message) => {
  try {
    const res = await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJuazE3MDZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNDIxMywiaWF0IjoxNzc3NzAzMzEzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNzkxM2ZjZjktZDMzNS00NDU1LWIwYmQtMjQ5NDdiZjRhZDk5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibml0eWFuYW5kIGt1bWFyIiwic3ViIjoiMzUwNThmNmMtZjUzMS00MDFlLWIwNjgtZjJkYTUyNjBiMTU1In0sImVtYWlsIjoibmsxNzA2QHNybWlzdC5lZHUuaW4iLCJuYW1lIjoibml0eWFuYW5kIGt1bWFyIiwicm9sbE5vIjoicmEyMzExMDAzMDEwOTU0IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiMzUwNThmNmMtZjUzMS00MDFlLWIwNjgtZjJkYTUyNjBiMTU1IiwiY2xpZW50U2VjcmV0IjoiWHBZclRtWUdTa2tlc21ubiJ9.aTqWmRdYfavRozHFm_j5XnD1UPze9qcTiv-MhpqJa_4`
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });

    const data = await res.json();
    console.log("LOG RESPONSE:", data);

  } catch (err) {
    console.error("LOG ERROR:", err);
  }
};

module.exports = Log;