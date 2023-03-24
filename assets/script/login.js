const login = document.getElementById("Login");
const password = document.getElementById("password");
const email = document.getElementById("email");

login.addEventListener("click", () => {
  if (email.value === "pippo" && password.value === "baudo") {
    window.location.assign("index.html");
  } else {
    alert("Email/Password errati");
  }
});
