import {authMiddleware} from "./middleware/auth.js";
import { login } from "./routes/auth.js";

const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        console.log('Tentando login com:', email, password);
        try {
            await login(email, password);
            alert('Login bem-sucedido!');
            // Recupera o parâmetro redirect da URL, se existir
            const params = new URLSearchParams(window.location.search);
            const redirect = params.get('redirect');
            if (redirect) {
                window.location.href = redirect;
            } else {
                window.location.href = "index.html";
            }
        } catch (error) {
            alert('Erro ao fazer login: ' + error.message);
        }
    });
}