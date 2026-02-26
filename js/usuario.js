import { usuario } from '../routes/usuarios.js';

export async function getUsuarioId() {
    const {data, error} = await usuario.get('/me');
