import { login } from './auth.js';

// Função para obter o identificador da página
function getPageKey() {
    // Use o nome do arquivo sem extensão como chave
    const path = window.location.pathname;
    const file = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
    return file; // Ex: 'legislacao' ou 'portugues_geral'
}

// Função para salvar progresso no Supabase
export async function saveProgressSupabase(userId, checkboxesSelector = 'input[type="checkbox"]') {
    if (!userId) return; // Não salva progresso se não logado

    const pageKey = getPageKey();
    const checkboxes = document.querySelectorAll(checkboxesSelector);
    const progressData = {};
    checkboxes.forEach(cb => {
        progressData[cb.id] = cb.checked;
    });

    // Busca o progresso atual
    let { data, error } = await supabase
        .from('progresso')
        .select('data')
        .eq('user_id', userId)
        .single();

    let allProgress = {};
    if (data && data.data) {
        allProgress = data.data;
    }

    // Atualiza apenas o progresso desta página
    allProgress[pageKey] = progressData;

    await supabase
        .from('progresso')
        .upsert([{ user_id: userId, data: allProgress }]);
}

// Função para carregar progresso do Supabase
export async function loadProgressSupabase(userId, checkboxesSelector = 'input[type="checkbox"]') {
    if (!userId) return; // Não carrega progresso se não logado

    const pageKey = getPageKey();
    const { data, error } = await supabase
        .from('progresso')
        .select('data')
        .eq('user_id', userId)
        .single();

    if (data && data.data && data.data[pageKey]) {
        const checkboxes = document.querySelectorAll(checkboxesSelector);
        checkboxes.forEach(cb => {
            cb.checked = !!data.data[pageKey][cb.id];
        });
    }
}

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

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

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            alert('Erro ao cadastrar: ' + error.message);
        } else {
            alert('Cadastro bem-sucedido! Verifique seu e-mail.');
        }
    });
}
