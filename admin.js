document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const passwordInput = document.getElementById("password");
  const togglePasswordBtn = document.getElementById("toggle-password");

  // User Accounts Configuration
  const adminUsers = {
    "ellainejc": {
      password: "adminhost12",
      name: "Ellaine",
      role: "Approver",
      initials: "EL"
    },
    "arvin123": {
      password: "Warehouse12",
      name: "Arvin",
      role: "Warehouse",
      initials: "AR"
    },
    "marianga": {
      password: "IOhost12",
      name: "Marian",
      role: "Input order",
      initials: "MA"
    }
  };

  // Password Visibility Toggle
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const isPassword = passwordInput.getAttribute("type") === "password";
      passwordInput.setAttribute("type", isPassword ? "text" : "password");

      const icon = togglePasswordBtn.querySelector("i");
      if (icon) {
        icon.className = isPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
      }
    });
  }

  // Submit Handler
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const usernameInput = document.getElementById("username").value.trim().toLowerCase();
      const passwordInputValue = document.getElementById("password").value;

      const user = adminUsers[usernameInput];

      if (user && user.password === passwordInputValue) {
        localStorage.setItem("admin_name", user.name);
        localStorage.setItem("admin_role", user.role);
        localStorage.setItem("admin_initials", user.initials);

        window.location.href = "dashboard.html";
      } else {
        alert("Invalid Username or Password!");
      }
    });
  }
});