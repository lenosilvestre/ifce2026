document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede enviar o formulário normalmente

    const email = document.getElementById("login-email").value;
    const senha = document.getElementById("login-password").value;

    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // login deu certo — aqui está o token
            console.log("Token:", data.token);

            // salva o token no localStorage
            localStorage.setItem("token", data.token);
            window.location.href = "index.html"; 
            alert("Login bem-sucedido!");
        } else {
            alert("Erro: " + (data.error || "Não foi possível logar"));
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
        console.error("Erro na requisição:", error);
    }
});