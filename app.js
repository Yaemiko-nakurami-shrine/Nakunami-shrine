// ===== CONSTANTS =====
const ADMIN_EMAIL = 'damiensoaresbrito@gmail.com';
const ROLES = {
    VISITOR: 'visitante',
    MEMBER: 'membro',
    ADMIN: 'administrador'
};

// ===== ACTIVITY LOG =====
const MAX_ACTIVITIES = 50; // Limpar log com mais de 50 atividades

function logActivity(type, userEmail, userName) {
    const activity = {
        type: type, // 'LOGIN', 'SIGNUP', 'LOGOUT', 'WARN', 'KICK', 'BAN'
        email: userEmail,
        name: userName,
        timestamp: new Date().toISOString(),
        displayTime: new Date().toLocaleString('pt-BR')
    };

    let activities = JSON.parse(localStorage.getItem('activity_log') || '[]');
    activities.unshift(activity); // Adiciona no início (mais recente)
    
    // Limpa se exceder máximo
    if (activities.length > MAX_ACTIVITIES) {
        activities = activities.slice(0, MAX_ACTIVITIES);
    }
    
    localStorage.setItem('activity_log', JSON.stringify(activities));
    updateActivityDisplay();
}

function getActivities() {
    return JSON.parse(localStorage.getItem('activity_log') || '[]');
}

function updateActivityDisplay() {
    const logContainer = document.getElementById('activity-log');
    if (!logContainer) return;
    
    const activities = getActivities();
    
    if (activities.length === 0) {
        logContainer.innerHTML = '<div class="no-activities">Nenhuma atividade registrada</div>';
        return;
    }
    
    let html = '<div class="activity-list">';
    activities.forEach(activity => {
        const emoji = {
            'LOGIN': '🔓',
            'SIGNUP': '✨',
            'LOGOUT': '👋',
            'WARN': '⚠️',
            'KICK': '👢',
            'BAN': '🚫'
        }[activity.type] || '📝';
        
        const color = {
            'LOGIN': '#4CAF50',
            'SIGNUP': '#2196F3',
            'LOGOUT': '#FF9800',
            'WARN': '#FFC107',
            'KICK': '#FF5722',
            'BAN': '#F44336'
        }[activity.type] || '#9d72ff';
        
        html += `
            <div class="activity-item" style="border-left-color: ${color};">
                <span class="activity-emoji">${emoji}</span>
                <div class="activity-details">
                    <span class="activity-type">${activity.type}</span>
                    <span class="activity-info">${activity.name} (${activity.email})</span>
                    <span class="activity-time">${activity.displayTime}</span>
                </div>
            </div>
        `;
    });
    html += '</div>';
    logContainer.innerHTML = html;
}

function clearActivityLog() {
    if (confirm('Tem certeza que deseja limpar todo o histórico de atividades?')) {
        localStorage.removeItem('activity_log');
        updateActivityDisplay();
        alert('✅ Histórico de atividades limpo');
    }
}

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
        
        // Log activity
        logActivity('LOGIN', user.email, user.name);
        
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

    // Log activity
    logActivity('SIGNUP', newUser.email, newUser.name);

    alert(`✨ Bem-vindo ao Santuário, ${name}! (Papel: ${role})`);
    updateAuthButton();
    closeAuthModal();
    event.target.reset();
    checkUserRole();
}

// ===== UPDATE AUTH BUTTON ===== (MODIFICADA para integração com rede social)
function updateAuthButton() {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    const authBtn = document.querySelector('.auth-btn');
    const socialFeedSection = document.getElementById('social-feed-section');

    if (currentUser) {
        authBtn.textContent = `👋 ${currentUser.name}`;
        authBtn.onclick = showUserMenu;
        if (socialFeedSection) socialFeedSection.style.display = 'block';
        loadFeed();
        loadUserProfile();
    } else {
        authBtn.textContent = '🔐 Login';
        authBtn.onclick = openAuthModal;
        if (socialFeedSection) socialFeedSection.style.display = 'none';
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
        // Log activity
        logActivity('LOGOUT', currentUser.email, currentUser.name);
        
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
    
    // Initialize activity display
    updateActivityDisplay();
    
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
        
        // Update activity display when opening
        if (!isVisible) {
            updateActivityDisplay();
        }
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
        logActivity('WARN', 'sistema', 'Admin');
    } else if (type === 'KICK') {
        alert('👢 [SISTEMA]: Expulsando usuário...');
        logActivity('KICK', 'sistema', 'Admin');
        localStorage.removeItem('current_user');
        updateAuthButton();
        checkUserRole();
    } else if (type === 'BAN') {
        if (confirm('Tem certeza que deseja banir permanentemente este usuário?')) {
            localStorage.setItem('yae_status', 'BANNED');
            logActivity('BAN', 'sistema', 'Admin');
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
// ===== SOCIAL NETWORK FUNCTIONS =====

// Função para criar um novo post
function createPost() {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    if (!currentUser) {
        alert('❌ Você precisa estar logado para criar posts!');
        return;
    }
    
    const contentInput = document.getElementById('post-content-input');
    const content = contentInput.value.trim();
    
    if (!content) {
        alert('❌ Escreva algo para compartilhar!');
        return;
    }
    
    const post = {
        id: generateId(),
        authorEmail: currentUser.email,
        authorName: currentUser.name,
        content: content,
        comments: [],
        likes: [],
        timestamp: new Date().toISOString(),
        displayTime: new Date().toLocaleString('pt-BR')
    };
    
    let posts = JSON.parse(localStorage.getItem('shrine_posts') || '[]');
    posts.unshift(post);
    localStorage.setItem('shrine_posts', JSON.stringify(posts));
    
    contentInput.value = '';
    
    alert('✨ Post compartilhado com sucesso!');
    loadFeed();
}

// Carregar feed de posts
function loadFeed() {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    const feedContainer = document.getElementById('posts-feed');
    if (!feedContainer) return;
    
    let posts = JSON.parse(localStorage.getItem('shrine_posts') || '[]');
    
    if (posts.length === 0) {
        feedContainer.innerHTML = '<div class="loading-text">Nenhum post ainda. Seja o primeiro a compartilhar! ⚡</div>';
        return;
    }
    
    let html = '';
    posts.forEach(post => {
        const isLiked = post.likes.includes(currentUser?.email || '');
        const likeBtn = currentUser ? `<button class="post-action-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${post.id}')">${isLiked ? '❤️' : '🤍'} ${post.likes.length}</button>` : '';
        
        html += `
            <div class="post-card">
                <div class="post-header">
                    <span class="post-author">👤 ${post.authorName}</span>
                    <span class="post-time">${post.displayTime}</span>
                </div>
                <div class="post-content">
                    ${post.content}
                </div>
                <div class="post-actions">
                    ${likeBtn}
                    <button class="post-action-btn" onclick="toggleCommentForm('${post.id}')">💬 ${post.comments.length}</button>
                    <button class="post-action-btn" onclick="reportUser('${post.authorEmail}')">⚠️ Denunciar</button>
                </div>
                <div id="comments-${post.id}" class="post-comments" style="display: none;">
                    <div id="comment-form-${post.id}" class="comment-form" style="display: none;">
                        <input type="text" id="comment-input-${post.id}" placeholder="Escrever um comentário..." />
                        <button onclick="addComment('${post.id}')">Enviar</button>
                    </div>
                    <div class="comments-list">
                        ${post.comments.map(c => `<div class="comment"><strong>${c.authorName}:</strong> ${c.content}</div>`).join('')}
                    </div>
                </div>
            </div>
        `;
    });
    
    feedContainer.innerHTML = html;
}

// Adicionar comentário
function addComment(postId) {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    if (!currentUser) return;
    
    const input = document.getElementById(`comment-input-${postId}`);
    const content = input.value.trim();
    
    if (!content) return;
    
    let posts = JSON.parse(localStorage.getItem('shrine_posts') || '[]');
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        post.comments.push({
            id: generateId(),
            authorEmail: currentUser.email,
            authorName: currentUser.name,
            content: content,
            timestamp: new Date().toISOString()
        });
        
        localStorage.setItem('shrine_posts', JSON.stringify(posts));
        input.value = '';
        loadFeed();
    }
}

// Toggle curtida
function toggleLike(postId) {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    if (!currentUser) return;
    
    let posts = JSON.parse(localStorage.getItem('shrine_posts') || '[]');
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        const likeIndex = post.likes.indexOf(currentUser.email);
        if (likeIndex > -1) {
            post.likes.splice(likeIndex, 1);
        } else {
            post.likes.push(currentUser.email);
        }
        
        localStorage.setItem('shrine_posts', JSON.stringify(posts));
        loadFeed();
    }
}

// Toggle comentário
function toggleCommentForm(postId) {
    const form = document.getElementById(`comment-form-${postId}`);
    const comments = document.getElementById(`comments-${postId}`);
    
    const isVisible = form.style.display !== 'none';
    form.style.display = isVisible ? 'none' : 'block';
    comments.style.display = 'block';
    
    if (!isVisible) {
        document.getElementById(`comment-input-${postId}`).focus();
    }
}

// Carregar perfil do usuário
function loadUserProfile() {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    if (!currentUser) return;
    
    const nameEl = document.getElementById('profile-name');
    const emailEl = document.getElementById('profile-email');
    const roleEl = document.getElementById('profile-role');
    const postsCountEl = document.getElementById('profile-posts-count');
    const followersCountEl = document.getElementById('profile-followers-count');
    const followingCountEl = document.getElementById('profile-following-count');
    
    if (nameEl) nameEl.innerText = currentUser.name;
    if (emailEl) emailEl.innerText = currentUser.email;
    if (roleEl) roleEl.innerText = `🎭 ${currentUser.role}`;
    
    let posts = JSON.parse(localStorage.getItem('shrine_posts') || '[]');
    const userPosts = posts.filter(p => p.authorEmail === currentUser.email);
    if (postsCountEl) postsCountEl.innerText = userPosts.length;
    
    let followers = JSON.parse(localStorage.getItem('shrine_followers') || '{}');
    const userFollowers = followers[currentUser.email] || [];
    const userFollowing = Object.keys(followers).filter(k => (followers[k] || []).includes(currentUser.email));
    
    if (followersCountEl) followersCountEl.innerText = userFollowers.length;
    if (followingCountEl) followingCountEl.innerText = userFollowing.length;
    
    // Carregar posts do usuário
    const userPostsList = document.getElementById('user-posts-list');
    if (userPostsList) {
        if (userPosts.length === 0) {
            userPostsList.innerHTML = '<div class="loading-text">Você ainda não publicou nada</div>';
        } else {
            userPostsList.innerHTML = userPosts.map(p => `
                <div class="post-card">
                    <div class="post-content">${p.content}</div>
                    <div class="post-time">${p.displayTime}</div>
                </div>
            `).join('');
        }
    }
}

// Seguir usuário
function followUser(userEmail) {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    if (!currentUser) return;
    
    let followers = JSON.parse(localStorage.getItem('shrine_followers') || '{}');
    if (!followers[userEmail]) followers[userEmail] = [];
    
    if (!followers[userEmail].includes(currentUser.email)) {
        followers[userEmail].push(currentUser.email);
        localStorage.setItem('shrine_followers', JSON.stringify(followers));
        alert('✨ Você seguiu este usuário!');
    }
}

// Denunciar usuário
function reportUser(userEmail) {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    if (!currentUser) return;
    
    const reason = prompt('Por que deseja denunciar este usuário?');
    if (!reason) return;
    
    const report = {
        id: generateId(),
        reportedEmail: userEmail,
        reporterEmail: currentUser.email,
        reporterName: currentUser.name,
        reason: reason,
        timestamp: new Date().toISOString()
    };
    
    let reports = JSON.parse(localStorage.getItem('shrine_reports') || '[]');
    reports.push(report);
    localStorage.setItem('shrine_reports', JSON.stringify(reports));
    
    logActivity('REPORT', userEmail, 'Denúncia');
    alert('✓ Denúncia enviada aos administradores');
}

// Mudar aba social
function switchSocialTab(tab) {
    const tabs = document.querySelectorAll('.social-tab-content');
    const btns = document.querySelectorAll('.social-tab-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    btns.forEach(b => b.classList.remove('active'));
    
    const activeTab = document.getElementById(`${tab}-tab`);
    if (activeTab) activeTab.classList.add('active');
    
    const activeBtn = Array.from(btns).find(b => b.textContent.includes(
        tab === 'feed' ? '📰' : tab === 'profile' ? '👤' : tab === 'followers' ? '👥' : '🔍'
    ));
    if (activeBtn) activeBtn.classList.add('active');
    
    if (tab === 'profile') loadUserProfile();
    if (tab === 'feed') loadFeed();
}

// Gerar ID único
function generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now();
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
