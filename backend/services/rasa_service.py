import requests

RASA_URL = "http://localhost:5005/webhooks/rest/webhook"

def get_rasa_response(message):
    payload = {
        "sender": "user",
        "message": message
    }

    try:
        res = requests.post(RASA_URL, json=payload)
        data = res.json()

        if data:
            return data[0].get("text", "No response")

        return "I didn't understand that."

    except Exception:
        return "Error connecting to chatbot server."
