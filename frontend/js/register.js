const form = document.getElementById("register-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email, password
            })
        }
    );

    const data = await response.json();

    const message = document.getElementById("message");

    if (response.ok) {
        message.textContent = 
        "Registration successful!";
    } else {
        message.textContent = data.detail || "Registration Failed!";

    }
});