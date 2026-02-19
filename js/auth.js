require('dotenv').config();

import { supabase } from './script.js';

// Função para obter o user_id do usuário autenticado
export async function getUserId() {
    const { data, error } = await supabase.auth.getUser();
    if (data && data.user) {
        return data.user.id;
    } else {
       // window.location.href = "login.html";        
       return null; // Permite acesso sem login
    }
}

const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
    // Verifica se o usuário está logado para mostrar ou ocultar o botão
    supabase.auth.getUser().then(({ data }) => {
        if (!data.user) {
           // logoutBtn.style.display = 'none'; // Oculta o botão se não logado
           logoutBtn.disabled  = true; // Desabilita o botão se não logado
        }
    });

    logoutBtn.addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = "login.html";
    });
}


