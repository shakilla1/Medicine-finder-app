function showLogin() {
    document.getElementById("signup-box").style.display = "none";
    document.getElementById("login-box").style.display = "block";
}


function showSignup() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("signup-box").style.display = "block";
}


function signup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (!name || !email || !password) {
        document.getElementById("signup-error").innerText =
            "All fields are required.";
        return;
    }

    let user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully!");
    showLogin();
}


function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user || email !== user.email || password !== user.password) {
        document.getElementById("login-error").innerText =
            "Invalid email or password.";
        return;
    }

    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
}


function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}


async function findMedicine() {
    const query = document.getElementById("searchInput").value.trim();
    const resultBox = document.getElementById("result-box");

    if (!query) {
        resultBox.innerHTML = "<p>Please enter a medicine name.</p>";
        return;
    }

    resultBox.innerHTML = "<p>Searching...</p>";

    const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}+openfda.generic_name:${query}&limit=1`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            resultBox.innerHTML = "<p>Medicine not found in OpenFDA database.</p>";
            return;
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            resultBox.innerHTML = "<p>No results found.</p>";
            return;
        }

        const drug = data.results[0];

        resultBox.innerHTML = `
            <h2>${query.toUpperCase()}</h2>
            <p><strong>Brand Name:</strong> ${drug.openfda.brand_name ? drug.openfda.brand_name.join(", ") : "N/A"}</p>
            <p><strong>Generic Name:</strong> ${drug.openfda.generic_name ? drug.openfda.generic_name.join(", ") : "N/A"}</p>
            <p><strong>Purpose:</strong> ${drug.purpose ? drug.purpose.join("<br>") : "N/A"}</p>
            <p><strong>Indications & Usage:</strong> ${drug.indications_and_usage ? drug.indications_and_usage.join("<br>") : "N/A"}</p>
        `;
    } catch (error) {
        resultBox.innerHTML = "<p>Error fetching data. Try another medicine name.</p>";
    }
}


if (window.location.pathname.includes("dashboard.html")) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("welcome-text").innerText = "Welcome, " + user.name;
    }
}

