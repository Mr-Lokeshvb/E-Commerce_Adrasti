const BASE_URL = "https://e-commerce-adrasti.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const customerFormOpenBtn = document.querySelector("#customer-form-open");
  const sellerFormOpenBtn = document.querySelector("#seller-form-open");
  const home = document.querySelector(".home");
  const formContainer = document.querySelector(".form_container");
  const formCloseBtn = document.querySelector(".form_close");

  const customerSignupBtn = document.querySelector("#customer_signup");
  const customerLoginBtn = document.querySelector("#customer_login");
  const sellerSignupBtn = document.querySelector("#seller_signup");
  const sellerLoginBtn = document.querySelector("#seller_login");

  const pwShowHide = document.querySelectorAll(".pw_hide");

  function hideAllForms() {
    document.querySelectorAll(".form").forEach((form) => {
      form.style.display = "none";
    });
  }

  // UI Form Controls
  customerFormOpenBtn?.addEventListener("click", () => {
    home.classList.add("show");
    hideAllForms();
    document.querySelector(".login_form").style.display = "block";
  });

  sellerFormOpenBtn?.addEventListener("click", () => {
    home.classList.add("show");
    hideAllForms();
    document.querySelector(".seller_login_form").style.display = "block";
  });

  formCloseBtn?.addEventListener("click", () => {
    home.classList.remove("show");
    hideAllForms();
  });

  customerSignupBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllForms();
    document.querySelector(".customer_signup_form").style.display = "block";
  });

  customerLoginBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllForms();
    document.querySelector(".login_form").style.display = "block";
  });

  sellerSignupBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllForms();
    document.querySelector(".seller_signup_form").style.display = "block";
  });

  sellerLoginBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllForms();
    document.querySelector(".seller_login_form").style.display = "block";
  });

  // Show/Hide Password
  pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
      const pwInput = icon.parentElement.querySelector("input");
      if (pwInput.type === "password") {
        pwInput.type = "text";
        icon.classList.replace("uil-eye-slash", "uil-eye");
      } else {
        pwInput.type = "password";
        icon.classList.replace("uil-eye", "uil-eye-slash");
      }
    });
  });

  // ===== Customer Login =====
  const customerLoginForm = document.getElementById("customerLoginForm");
  customerLoginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = customerLoginForm.querySelector("input[name='email']").value.trim();
    const password = customerLoginForm.querySelector("input[name='password']").value;

    try {
      const res = await fetch(`${BASE_URL}/api/customer/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("username", data.username || data.email);
        window.location.href = "/cozastore/index.html";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Customer login error:", err);
      alert("Server error. Please try again.");
    }
  });

  // ===== Customer Signup =====
  const customerSignupForm = document.getElementById("customerSignupForm");
  customerSignupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = customerSignupForm.querySelector("input[name='username']").value.trim();
    const email = customerSignupForm.querySelector("input[name='email']").value.trim();
    const password = customerSignupForm.querySelector("input[name='password']").value;
    const confirmPassword = customerSignupForm.querySelector("input[name='confirmPassword']").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/customer/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Customer registered successfully");
        customerSignupForm.reset();
        hideAllForms();
        document.querySelector(".login_form").style.display = "block";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Customer signup error:", err);
      alert("Server error. Please try again.");
    }
  });

  // ===== Seller Signup =====
  const sellerSignupForm = document.getElementById("sellerSignupForm");
  sellerSignupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = sellerSignupForm.querySelectorAll("input[name], select[name]");
    const payload = {};
    inputs.forEach((input) => {
      payload[input.name] = input.value.trim();
    });

    if (payload.password !== payload.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!sellerSignupForm.querySelector("input[name='terms']").checked) {
      alert("You must agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/business/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Seller registered successfully");
        sellerSignupForm.reset();
        hideAllForms();
        document.querySelector(".seller_login_form").style.display = "block";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Seller signup error:", err);
      alert("Server error. Please try again.");
    }
  });

  // ===== Seller Login =====
  const sellerLoginForm = document.getElementById("sellerLoginForm");
  sellerLoginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = sellerLoginForm.querySelector("input[name='email']").value.trim();
    const password = sellerLoginForm.querySelector("input[name='password']").value;

    try {
      const res = await fetch(`${BASE_URL}/api/business/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("username", data.username || data.email);
        window.location.href = "/cozastore/index.html";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Seller login error:", err);
      alert("Server error. Please try again.");
    }
  });
});
