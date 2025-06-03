document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const loginButton = document.getElementById("login-btn");
  const logoutButton = document.getElementById("logout-btn");
  const loginError = document.getElementById("login-error");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    loginButton.style.display = "none";
    logoutButton.style.display = "inline-block";
    loginError.textContent = `Ești deja logat ca: ${loggedInUser}`;
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const usernameRegex = /^[A-Za-z0-9]{3,}$/;
    const passwordRegex = /^.{4,}$/;

    if (!usernameRegex.test(username)) {
      loginError.textContent = "Username invalid! Min 3 caractere.";
      return;
    }

    if (!passwordRegex.test(password)) {
      loginError.textContent = "Parola prea scurtă! Minim 4 caractere.";
      return;
    }

    localStorage.setItem("loggedInUser", username);
    alert("Te-ai logat cu succes!");
    loginError.textContent = "";

    loginButton.style.display = "none";
    logoutButton.style.display = "inline-block";
  });

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    alert("Te-ai delogat!");

    loginButton.style.display = "inline-block";
    logoutButton.style.display = "none";
    loginForm.reset();
    loginError.textContent = "";
  });

  usernameInput.addEventListener("keyup", () => {
    usernameInput.value = usernameInput.value.toUpperCase();
  });
});
