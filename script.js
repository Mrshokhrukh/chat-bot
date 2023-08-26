const sendChatBtn = document.querySelector(".chat_input span");
const chatInput = document.querySelector(".chat_input textarea");
let chatbox = document.querySelector(".chat_box");

let userMsg;

function createChatLi(msg, className) {
  const li = document.createElement("li");
  li.classList.add("chat", className);
  let chatContent =
    className === "bot_outgoing"
      ? `<p>${msg}</p> <span><ion-icon name="person-circle-outline"></ion-icon></span> `
      : ` <span class="chat_icon">
      <lottie-player
        src="https://lottie.host/eef81657-ed96-413c-8cf1-9b722ed1baac/6dHauPLm28.json"
        background="transparent"
        speed="1"
        style="width: 50px; height: 50px"
        loop
        autoplay
      ></lottie-player>
    </span> <p>${msg}</p>`;

  li.innerHTML = chatContent;

  return li;
}

function generateRes() {
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authentication:
        "Bearer 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",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMsg }],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

sendChatBtn.addEventListener("click", () => {
  userMsg = chatInput.value;

  if (!userMsg) return;
  chatbox.appendChild(createChatLi(userMsg, "bot_outgoing"));

  setTimeout(() => {
    chatbox.appendChild(createChatLi("waiting...", "bot_incoming"));
    generateRes();
  }, 600);

  chatInput.focus();

  chatInput.value = "";
});

window.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && chatInput.value != "") {
    userMsg = chatInput.value;
    chatbox.appendChild(createChatLi(userMsg, "bot_outgoing"));
    chatInput.focus();
    chatInput.value = "";
  }
});
