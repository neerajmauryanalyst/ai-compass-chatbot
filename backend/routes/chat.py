from flask import Blueprint, request, jsonify
from services.rasa_service import get_rasa_response

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message")

    if not message:
        return jsonify({"response": "Empty message"}), 400

    bot_response = get_rasa_response(message)

    return jsonify({"response": bot_response})
