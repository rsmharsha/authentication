document.addEventListener("DOMContentLoaded", () => {
    checkAuth();

    document.getElementById("logoutBtn").addEventListener("click", handleLogout);
});

async function checkAuth() {
    try {
        const res = await fetch("http://localhost:5000/auth/me", {
            method: "GET",
            credentials: "include"
        });

        if (!res.ok) {
            // Not authenticated, redirect to login
            window.location.href = "/index.html";
            return;
        }

        const data = await res.json();
        const user = data.user;

        // Populate user data
        document.getElementById("userName").textContent = user.name || "User";
        document.getElementById("userUsername").textContent = user.username || "-";
        document.getElementById("userEmail").textContent = user.email || "-";

    } catch (err) {
        console.error("Auth check failed:", err);
        window.location.href = "/index.html";
    }
}

async function handleLogout() {
    try {
        const res = await fetch("http://localhost:5000/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) {
            window.location.href = "/index.html";
        } else {
            alert("Logout failed");
        }
    } catch (err) {
        console.error("Logout error:", err);
        alert("An error occurred during logout");
    }
}
