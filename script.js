const chat = document.getElementById("chat");

function addMessage(text, type) {
  const wrapper = document.createElement("div");
  wrapper.className = "message-wrapper " + type;

  const msg = document.createElement("div");
  msg.className = "message " + type;

  if (type === "bot") {
    msg.innerHTML = `<span class="bot-label">Bot</span>${text}`;
  } else {
    msg.innerText = text;
  }

  wrapper.appendChild(msg);
  chat.appendChild(wrapper);

  // smooth scroll
  chat.scrollTo({
    top: chat.scrollHeight,
    behavior: "smooth"
  });
}

function showTyping() {
  const wrapper = document.createElement("div");
  wrapper.className = "message-wrapper bot";
  wrapper.id = "typing";

  const typing = document.createElement("div");
  typing.className = "message bot";

  typing.innerHTML = `
    <div class="typing">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `;

  wrapper.appendChild(typing);
  chat.appendChild(wrapper);
}function showTyping() {
  const wrapper = document.createElement("div");
  wrapper.className = "message-wrapper bot";
  wrapper.id = "typing";

  const typing = document.createElement("div");
  typing.className = "message bot";

  typing.innerHTML = `
    <div class="typing">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `;

  wrapper.appendChild(typing);
  chat.appendChild(wrapper);
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

async function sendMessage() {
  const input = document.getElementById("message");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  showTyping();

  try {
    const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sender: "user",
        message: text
      })
    });

    const data = await response.json();

    removeTyping();

    if (data.length === 0) {
      addMessage("I focus on AI topics. Try asking about AI 🙂", "bot");
      return;
    }

    data.forEach(msg => {
      addMessage(msg.text, "bot");
    });

  } catch (error) {
    removeTyping();
    addMessage("⚠️ Server error. Check Rasa backend.", "bot");
  }
}

/* ENTER KEY */
document.getElementById("message").addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});