const API_URL = "http://localhost:8000";

export async function sendChatMessage(message: string, ageGroup: string) {


const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify({
        message: message,
        age_group: ageGroup,
        history: [],
    }),
});

const data = await response.json()
return data.reply;
}

