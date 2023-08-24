const sendChatBtn = document.querySelector(".chat_input span");
const chatInput = document.querySelector(".chat_input textarea");

let userMsg;

function createChatLi(msg, className) {
  const li = document.createElement("li");
  li.classList.add("chat", className);
  let chatContent =
    className === "bot_outgoing"
      ? `<p>${msg}</p>`
      : `<p>${msg}</p>  <span><ion-icon name="person-circle-outline"></ion-icon></span>`;
}

sendChatBtn.addEventListener("click", () => {
  userMsg = chatInput.value;
  if (!userMsg) {
    return;
  }
  createChatLi(userMsg, "bot_outgoing");
});
