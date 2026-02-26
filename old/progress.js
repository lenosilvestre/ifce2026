import { saveProgressSupabase, loadProgressSupabase } from './script.js';
import { getUserId } from './auth.js';

// Atualiza barra de progresso e salva no Supabase
export async function updateProgressBar(userId) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    const progress = (checked.length / checkboxes.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
    document.getElementById('progress-text').textContent = progress.toFixed(2) + '%';

    await saveProgressSupabase(userId);
}

// Inicializa o progresso ao carregar a página
export async function initProgress() {
    const userId = await getUserId();
    await loadProgressSupabase(userId);
    updateProgressBar(userId);

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => updateProgressBar(userId));
    });
}



