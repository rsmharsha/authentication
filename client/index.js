function showRegister() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const messageDiv = document.getElementById("loginMessage");

    if (email && password) {
        messageDiv.textContent = "Login successful!";
        messageDiv.className = "message success";
        messageDiv.style.display = "block";
        e.target.reset();
    } else {
        messageDiv.textContent = "Please fill in all fields";
        messageDiv.className = "message error";
        messageDiv.style.display = "block";
    }
}

async function handleRegister(e) {
    e.preventDefault();

    const messageDiv = document.getElementById("registerMessage");

    const data = {
        name: document.getElementById("registerName").value,
        username: document.getElementById("registerUserName").value,
        email: document.getElementById("registerEmail").value,
        password: document.getElementById("registerPassword").value,
    };

    try {
        const res = await fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message);
        }

        messageDiv.textContent = result.message;
        messageDiv.className = "message success";
        messageDiv.style.display = "block";
        e.target.reset();
    } catch (err) {
        messageDiv.textContent = err.message;
        messageDiv.className = "message error";
        messageDiv.style.display = "block";
    }
}
