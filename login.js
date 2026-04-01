document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');
        
        if (username === 'Admin' && password === 'admin') {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', username);
            window.location.href = 'dashboard.html';
        } else {
            errorDiv.textContent = 'Invalid username or password';
            errorDiv.classList.add('show');
        }
    });

    document.getElementById('username').addEventListener('input', function() {
        document.getElementById('loginError').classList.remove('show');
    });

    document.getElementById('password').addEventListener('input', function() {
        document.getElementById('loginError').classList.remove('show');
    });
});