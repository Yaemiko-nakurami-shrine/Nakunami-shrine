// ===== CONSTANTS =====
const ADMIN_EMAIL = 'damiensoaresbrito@gmail.com';
const ROLES = {
    VISITOR: 'visitante',
    MEMBER: 'membro',
    ADMIN: 'administrador'
};

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    setupAuthSystem();
    checkUserRole();
    setupAdminPanel();
});

// ===== AUTH SYSTEM =====
function setupAuthSystem() {
    // Load demo users if not exists
    if (!localStorage.getItem('shrine_users')) {
        const demoUsers = [
            { 
                name: 'Yae Miko', 
                email: ADMIN_EMAIL, 
                password: 'admin123',
                role: ROLES.ADMIN,
                createdAt: new Date().toISOString()
            },
            { 
                name: 'Miko Devotee', 
                email: 'miko@shrine.jp', 
                password: 'kitsune123',
                role: ROLES.MEMBER,
                createdAt: new Date().toISOString()
            },
            { 
                name: 'Traveler', 
                email: 'traveler@teyvat.com', 
                password: 'teyvat2025',
                role: ROLES.VISITOR,
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('shrine_users', JSON.stringify(demoUsers));
    }
    
    updateAuthButton();
}

// ===== LOGIN HANDLER =====
function handleLogin(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    const password = event.target.querySelector('input[type="password"]').value;

    if (!email || !password) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('shrine_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Assign role based on email
        if (email === ADMIN_EMAIL) {
            user.role = ROLES.ADMIN;
        } else if (!user.role) {
            user.role = ROLES.MEMBER;
        }
        
        localStorage.setItem('current_user', JSON.stringify(user));
        alert(`🦊 Bem-vindo de volta, ${user.name}! (Papel: ${user.role})`);
        updateAuthButton();
        closeAuthModal();
        event.target.reset();
        checkUserRole();
    } else {
        alert('❌ Email ou senha inválido!');
    }
}

// ===== SIGNUP HANDLER =====
function handleSignUp(event) {
    event.preventDefault();
    const inputs = event.target.querySelectorAll('input');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const password = inputs[2].value;
    const confirmPassword = inputs[3].value;

    if (!name || !email || !password || !confirmPassword) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    if (password !== confirmPassword) {
        alert('❌ As senhas não correspondem!');
        return;
    }

    if (password.length < 6) {
        alert('❌ A senha deve ter pelo menos 6 caracteres!');
        return;
    }

    let users = JSON.parse(localStorage.getItem('shrine_users') || '[]');
    if (users.find(u => u.email === email)) {
        alert('❌ Este email já está registrado!');
        return;
    }

    // Assign role: only admin email gets admin role, others get member role
    const role = email === ADMIN_EMAIL ? ROLES.ADMIN : ROLES.MEMBER;
    
    const newUser = { 
        name, 
        email, 
        password,
        role: role,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('shrine_users', JSON.stringify(users));
    localStorage.setItem('current_user', JSON.stringify(newUser));

    alert(`✨ Bem-vindo ao Santuário, ${name}! (Papel: ${role})`);
    updateAuthButton();
    closeAuthModal();
    event.target.reset();
    checkUserRole();
}

// ===== UPDATE AUTH BUTTON =====
function updateAuthButton() {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    const authBtn = document.querySelector('.auth-btn');

    if (currentUser) {
        authBtn.textContent = `👋 ${currentUser.name}`;
        authBtn.onclick = showUserMenu;
    } else {
        authBtn.textContent = '🔐 Login';
        authBtn.onclick = openAuthModal;
    }
}

// ===== USER MENU =====
function showUserMenu() {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    if (!currentUser) return;

    const roleDisplay = {
        [ROLES.VISITOR]: '👤 Visitante',
        [ROLES.MEMBER]: '⭐ Membro',
        [ROLES.ADMIN]: '🦊 Administrador'
    };

    const action = confirm(
        `Bem-vindo, ${currentUser.name}! 👋\n` +
        `Papel: ${roleDisplay[currentUser.role]}\n\n` +
        `Clique OK para sair, ou Cancelar para continuar.`
    );
    
    if (action) {
        localStorage.removeItem('current_user');
        alert('🦊 Que a luz de Narukami guie sua jornada...');
        updateAuthButton();
        checkUserRole();
    }
}

// ===== CHECK USER ROLE & SHOW/HIDE ADMIN PANEL =====
function checkUserRole() {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    const adminPanel = document.getElementById('admin-panel-container');
    const adminLabel = document.getElementById('admin-label');
    
    if (currentUser && currentUser.email === ADMIN_EMAIL && currentUser.role === ROLES.ADMIN) {
        // Show admin panel for admin user
        if (adminPanel) adminPanel.style.display = 'flex';
        if (adminLabel) adminLabel.style.display = 'block';
    } else {
        // Hide admin panel for non-admin users
        if (adminPanel) adminPanel.style.display = 'none';
        if (adminLabel) adminLabel.style.display = 'none';
    }
    
    // Update user info display
    updateUserInfoDisplay();
}

// ===== UPDATE USER INFO DISPLAY =====
function updateUserInfoDisplay() {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    const userInfoElement = document.getElementById('user-info-display');
    
    if (!userInfoElement) return;
    
    if (currentUser) {
        const roleEmoji = {
            [ROLES.VISITOR]: '👤',
            [ROLES.MEMBER]: '⭐',
            [ROLES.ADMIN]: '🦊'
        };
        
        userInfoElement.innerHTML = `
            ${roleEmoji[currentUser.role]} ${currentUser.name} (${currentUser.role})
        `;
        userInfoElement.style.display = 'block';
    } else {
        userInfoElement.style.display = 'none';
    }
}

// ===== ADMIN PANEL FUNCTIONS =====
function setupAdminPanel() {
    const adminBtn = document.getElementById('admin-toggle-btn');
    if (adminBtn) {
        adminBtn.addEventListener('click', toggleAdminPanel);
    }
    
    // Keyboard shortcut (Ctrl+Shift+A) - only works for admin
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            const currentUser = JSON.parse(localStorage.getItem('current_user'));
            if (currentUser && currentUser.email === ADMIN_EMAIL) {
                toggleAdminPanel();
            }
        }
    });
}

function toggleAdminPanel() {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    
    if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
        alert('❌ Acesso negado! Somente o Administrador pode acessar este painel.');
        return;
    }
    
    const adminPanel = document.getElementById('admin-panel-modal');
    if (adminPanel) {
        const isVisible = adminPanel.style.display === 'block';
        adminPanel.style.display = isVisible ? 'none' : 'block';
    }
}

function closeAdminPanel() {
    const adminPanel = document.getElementById('admin-panel-modal');
    if (adminPanel) {
        adminPanel.style.display = 'none';
    }
}

function adminAction(type) {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    
    if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
        alert('❌ Acesso negado!');
        return;
    }

    if (type === 'WARN') {
        alert('⚠️ [SISTEMA]: Um aviso foi enviado ao visitante.');
    } else if (type === 'KICK') {
        alert('👢 [SISTEMA]: Expulsando usuário...');
        localStorage.removeItem('current_user');
        updateAuthButton();
        checkUserRole();
    } else if (type === 'BAN') {
        if (confirm('Tem certeza que deseja banir permanentemente este usuário?')) {
            localStorage.setItem('yae_status', 'BANNED');
            alert('🚫 Usuário banido. Recarregando página...');
            location.reload();
        }
    } else if (type === 'USERS') {
        displayAllUsers();
    }
}

function displayAllUsers() {
    const users = JSON.parse(localStorage.getItem('shrine_users') || '[]');
    let usersList = '📋 USUÁRIOS REGISTRADOS:\n\n';
    
    users.forEach((user, index) => {
        usersList += `${index + 1}. ${user.name}\n`;
        usersList += `   Email: ${user.email}\n`;
        usersList += `   Papel: ${user.role}\n`;
        usersList += `   Registrado em: ${new Date(user.createdAt).toLocaleDateString('pt-BR')}\n\n`;
    });
    
    alert(usersList);
}

function changeUserRole() {
    const email = prompt('Digite o email do usuário:');
    if (!email) return;
    
    let users = JSON.parse(localStorage.getItem('shrine_users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
        alert('❌ Usuário não encontrado!');
        return;
    }
    
    if (user.email === ADMIN_EMAIL) {
        alert('❌ Não é possível alterar o papel do administrador!');
        return;
    }
    
    const newRole = confirm('Mudar papel para MEMBRO?\n\nOK = Membro\nCancelar = Visitante');
    user.role = newRole ? ROLES.MEMBER : ROLES.VISITOR;
    
    localStorage.setItem('shrine_users', JSON.stringify(users));
    alert(`✅ Papel de ${user.name} alterado para: ${user.role}`);
}

function deleteUser() {
    const email = prompt('Digite o email do usuário a deletar:');
    if (!email) return;
    
    if (email === ADMIN_EMAIL) {
        alert('❌ Não é possível deletar o administrador!');
        return;
    }
    
    let users = JSON.parse(localStorage.getItem('shrine_users') || '[]');
    const index = users.findIndex(u => u.email === email);
    
    if (index === -1) {
        alert('❌ Usuário não encontrado!');
        return;
    }
    
    const userName = users[index].name;
    if (confirm(`Tem certeza que deseja deletar ${userName}?`)) {
        users.splice(index, 1);
        localStorage.setItem('shrine_users', JSON.stringify(users));
        alert(`✅ ${userName} foi deletado com sucesso.`);
    }
}

function resetAllData() {
    if (confirm('⚠️ AVISO: Isto vai deletar TODOS os dados!\n\nVocê tem certeza?')) {
        if (confirm('Digite "SIM" para confirmar a ação irreversível!')) {
            localStorage.removeItem('shrine_users');
            localStorage.removeItem('current_user');
            alert('🔄 Todos os dados foram resetados. Recarregando...');
            location.reload();
        }
    }
}

// ===== AUTH MODAL FUNCTIONS =====
function openAuthModal() {
    document.getElementById('auth-modal').classList.add('active');
    document.getElementById('login-form').classList.add('active');
    document.getElementById('signup-form').classList.remove('active');
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('active');
}

function switchToSignUp() {
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('signup-form').classList.add('active');
}

function switchToLogin() {
    document.getElementById('signup-form').classList.remove('active');
    document.getElementById('login-form').classList.add('active');
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('auth-modal');
    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target.id === 'auth-modal') {
                closeAuthModal();
            }
        });
    }
});

// ===== BAN CHECK =====
window.addEventListener('load', () => {
    if (localStorage.getItem('yae_status') === 'BANNED') {
        document.body.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                color: #d32f2f;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Cinzel', serif;
                text-align: center;
                padding: 20px;
            ">
                <div>
                    <h1 style="font-size: 3rem; margin: 0;">🚫 VOCÊ FOI BANIDO DO SANTUÁRIO</h1>
                    <p style="font-size: 1.3rem; margin-top: 20px;">Razão: Perturbação da Luz de Narukami</p>
                    <p style="margin-top: 30px; opacity: 0.7;">A Guuji Yae Miko ordenou sua expulsão permanente.</p>
                </div>
            </div>
        `;
    }
});
