import { userData } from "../data/data.js";

const btnLoginElm = document.querySelector("#loginButton");

function onLogin() {
  const usernameElm = document.querySelector("#username").value;
  const passwordElm = document.querySelector("#password").value;

  const users = userData.find(
    (user) => user.username == usernameElm && user.password == passwordElm
  );

  if (users) {
    localStorage.setItem("user", JSON.stringify(users));
    window.location.href = "../home";
  } else {
    alert("username or password invalid please try again.");
  }
}

btnLoginElm.addEventListener("click", () => {
  console.log("halo");
  onLogin();
});
