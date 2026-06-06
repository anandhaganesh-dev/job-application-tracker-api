const form = document.getElementById("login-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const formData = new URLSearchParams();
    formData.append("username",email);
    formData.append("password",password);

    const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
                body:formData
            }
        
    );

    const data = await response.json();

    const message = document.getElementById("message");

    if (response.ok) {
        localStorage.setItem(
            "access_token",
            data.access_token
        );
        message.textContent = "Login Successful!";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    }else {
        message.textContent = data.detail || "Login Failed!";
    }
});