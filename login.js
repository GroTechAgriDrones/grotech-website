const API_BASE_URL = 'https://g82vp7wi5i.execute-api.us-east-2.amazonaws.com/prod';

async function fetchWithTimeout(url, options = {}, timeout = 15000, retries = 1) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
            const res = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(id);
            return res;
        } catch (err) {
            clearTimeout(id);
            if (attempt < retries) {
                await new Promise(r => setTimeout(r, 1000));
                continue;
            }
            throw err;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');
        
        try {
            const response = await fetchWithTimeout(`${API_BASE_URL}/credentials/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            });
            
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('userName', result.name);
                    window.location.href = 'dashboard.html';
                } else {
                    errorDiv.textContent = result.error || 'Invalid email or password';
                    errorDiv.classList.add('show');
                }
            } else {
                const result = await response.json().catch(() => ({}));
                errorDiv.textContent = result.error || 'Server error (HTTP ' + response.status + '). Please try again.';
                errorDiv.classList.add('show');
            }
        } catch (error) {
            console.error('Login error:', error);
            errorDiv.textContent = 'Unable to connect. Please try again.';
            errorDiv.classList.add('show');
        }
    });

    document.getElementById('email').addEventListener('input', function() {
        document.getElementById('loginError').classList.remove('show');
    });

    document.getElementById('password').addEventListener('input', function() {
        document.getElementById('loginError').classList.remove('show');
    });
});