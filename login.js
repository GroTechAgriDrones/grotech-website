const API_BASE_URL = 'https://g82vp7wi5i.execute-api.us-east-2.amazonaws.com/prod';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');
        
        try {
            // POST to login endpoint for server-side verification
            const response = await fetch(`${API_BASE_URL}/credentials/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            });
            
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