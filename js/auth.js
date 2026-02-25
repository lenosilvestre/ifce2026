// Função de login: envia email e senha para o servidor e armazena token
export async function login(email, password) {
    console.log('Iniciando login para:', email);
	try {
		const res = await fetch('/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, senha: password }),
		});

		const data = await res.json();

		if (!res.ok) {
			const msg = data && data.message ? data.message : 'Erro ao efetuar login';
			throw new Error(msg);
		}

		// Se o servidor retornar um token, salvamos no localStorage
		if (data.token) {
			localStorage.setItem('authToken', data.token);
		}

		return data;
	} catch (err) {
		throw err;
	}
}

export function logout() {
	localStorage.removeItem('authToken');
}
