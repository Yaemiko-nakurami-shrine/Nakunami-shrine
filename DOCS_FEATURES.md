# 🎯 Documentação por Features - Nakunami Shrine

> Guia organizado por **funcionalidades** independente de página

---

## 🔐 AUTENTICAÇÃO & ACESSO

### Login
- **Descrição:** Entrar no santuário com email e senha
- **Quem:** Visitantes não autenticados
- **Como:** Clique "Login" na nav, preencha email/senha
- **Exemplo de Email Teste:**
  ```
  membro@test.com (senha: 123)
  admin@example.com (senha: admin)
  damiensoaresbrito@gmail.com (admin real)
  ```

**📍 Localização:** 
- Página: Homepage (modal flutuante)
- Código: [app.js](app.js#L130) `handleLogin()`
- Docs: [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-autenticação)

---

### Sign Up (Criar Conta)
- **Descrição:** Registrar nova conta no santuário
- **Quem:** Qualquer visitante
- **Data Criada:** Timestamp automaticamente
- **Role Padrão:** MEMBRO (⭐)
- **Validações:** Email, Senha (confirmação)

**📍 Localização:**
- Página: Homepage (modal flutuante)
- Código: [app.js](app.js#L160) `handleSignUp()`
- Docs: [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-autenticação)

---

### Logout
- **Descrição:** Sair do santuário (deixar sessão)
- **Quem:** Usuários logados
- **Como:** Clique no botão de perfil, confirme sair
- **Registro:** Atividade registrada como "LOGOUT"

**📍 Localização:**
- Página: Qualquer página com menu de usuário
- Código: [app.js](app.js#L238) `showUserMenu()`
- Docs: [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-autenticação)

---

## 🎬 TELAS & ANIMAÇÕES ESPECIAIS
- **Loader Inicial:** Tela escura com raposa giratória e barra de progresso, animação de trovão; aparece no carregamento (1.5 s).
- **Tela de Boas-Vindas:** Overlay colorido com confetes e texto personalizado após login; desaparece automaticamente.
- **Tela de Manutenção:** Sobreposição violeta com partículas eletro, status dinâmico e animações de raposa; ativada/desativada pelo admin.
- **Tela de Banimento:** Fundo escuro com conteúdo tremendo e ícone pulsante, exibida quando `yae_status === 'BANNED'`.

Cada tela utiliza `@keyframes` e transições CSS para efeitos visuais legantes.

---

## 👥 ROLES (Papéis/Controle de Acesso)

### Visitante (👤)
- **Acesso:**
  - ✅ Ver homepage
  - ✅ Ver seções principais
  - ✅ Fazer login/signup
  - ❌ Feed social
  - ❌ Admin panel

**Transição:** `Visitante → Membro` (via signup automático)

---

### Membro (⭐)
- **Acesso:**
  - ✅ Tudo que Visitante
  - ✅ Feed social
  - ✅ Criar posts
  - ✅ Comentar
  - ✅ Seguir usuários
  - ✅ Ver perfil/seguidores
  - ❌ Admin panel

**Transição:** `Visitante → Membro` (ao criar conta)

---

### Administrador (🦊)
- **Acesso:**
  - ✅ Tudo que Membro
  - ✅ Admin panel
  - ✅ Gerenciar usuários
  - ✅ Moderar ações
  - ✅ Ver logs completos

**Email Especial:** `damiensoaresbrito@gmail.com`  
**Transição:** Apenas assignado manualmente  
**Backup:** `admin@example.com` (senha: admin)

**📖 Detalhes:** [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-roles--controle-de-acesso)

---

## 📝 POSTS & FEED

### Criar Post
- **Descrição:** Compartilhar mensagem/conteúdo com santuário
- **Quem:** Membros e Admins
- **Dados Salvos:**
  - Texto do post
  - Email do autor
  - Nome do autor
  - Timestamp
  - ID único (gerenciado)

**Dados Armazenados:**
```javascript
{
  id: "id_123abc...",
  authorEmail: "user@email.com",
  authorName: "User Name",
  content: "Texto do post",
  likes: [],
  comments: [],
  timestamp: "2026-02-27T10:30:00Z"
}
```

**📍 Localização:** 
- Página: Feed Social (aba "📰 Feed")
- Código: [app.js](app.js#L509) `createPost()`

---

### Feed em Tempo Real
- **Descrição:** Timeline com todos os posts (cronológico)
- **Atualização:** Automática ao criar/curtir/comentar
- **Ordenação:** Mais recentes primeiro
- **Informações:** Autor, conteúdo, timestamp, likes/comentários

**Dados Carregados:** `shrine_posts` (localStorage)

**📍 Localização:**
- Página: Feed Social
- Código: [app.js](app.js#L542) `loadFeed()`

---

### Curtir Post (❤️)
- **Descrição:** Marcar post como "gostei"
- **Quem:** Membros e Admins
- **Visualização:** Coração muda de 🤍 para ❤️
- **Dados:** Email adicionado ao array de likes
- **Ação Reversível:** Descurtir remove email do array

**Array de Likes:**
```javascript
post.likes = ["user1@email.com", "user2@email.com"]
```

**📍 Localização:**
- Página: Feed (botão em cada post)
- Código: [app.js](app.js#L620) `toggleLike()`

---

### Comentar em Post (💬)
- **Descrição:** Adicionar resposta/comentário a um post
- **Quem:** Membros e Admins
- **Dados Salvos:**
  - Texto do comentário
  - Email do comentarista
  - Nome do comentarista
  - Timestamp

**Estrutura de Comentário:**
```javascript
{
  id: "id_123...",
  authorEmail: "user@email.com",
  authorName: "User Name",
  content: "Texto comentário",
  timestamp: "2026-02-27T10:30:00Z"
}
```

**📍 Localização:**
- Página: Feed (botão 💬 em cada post)
- Código: [app.js](app.js#L600) `addComment()`

---

## 👤 PERFIL DO USUÁRIO

### Ver Perfil
- **Descrição:** Exibição dos dados do usuário logado
- **Quem:** Apenas o próprio usuário
- **Dados Exibidos:**
  - 👤 Nome
  - 📧 Email
  - 🎭 Role/Papel
  - 📊 Estatísticas (posts, seguidores, seguindo)

**📍 Localização:**
- Página: Perfil (aba "👤 Meu Perfil")
- Código: [app.js](app.js#L675) `loadUserProfile()`

---

### Histórico de Posts
- **Descrição:** Ver todos os posts que você criou
- **Filtro:** Email do usuário logado
- **Dados:** Posts em ordem cronológica
- **Ações:** Ver posts, gerenciar (futuro)

**📍 Localização:**
- Página: Perfil (seção "Meus Posts")
- Código: [app.js](app.js#L685) `loadUserProfile()`

---

### Estatísticas de Usuário
- **Posts:** Total de posts publicados
- **Seguidores:** Quantas pessoas seguem você
- **Seguindo:** Quantas pessoas você segue

**Cálculo:**
```javascript
posts = shrine_posts.filter(p => p.authorEmail === user.email)
followers = shrine_followers[user.email].length
following = Object.keys(shrine_followers)
  .filter(k => shrine_followers[k].includes(user.email))
```

---

## 👥 SISTEMA DE SEGUIDORES

### Seguir Usuário (⭐)
- **Descrição:** Adicionar um usuário aos seus "seguindo"
- **Quem:** Membros e Admins
- **Efeito:** Email adicionado ao array de seguidores
- **Localização:** Email do usuário seguido

**Dados Armazenados:**
```javascript
shrine_followers: {
  "user@email.com": ["follower1@email.com", "follower2@email.com"]
}
```

**📍 Localização:**
- Página: Explorar (botão em cada card de usuário)
- Código: [app.js](app.js#L705) `followUser()`

---

### Ver Seguidores
- **Descrição:** Lista de pessoas que seguem você
- **Dados:** Nome, role, email
- **Contador:** Total de seguidores

**Filtro:** `shrine_followers[currentUser.email]`

**📍 Localização:**
- Página: Seguidores (aba "👥 Seguidores")
- Código: [app.js](app.js#L650) Followers section

---

### Ver Seguindo
- **Descrição:** Lista de pessoas que você segue
- **Dados:** Nome, role, email
- **Contador:** Total que você segue

**Filtro:** `Object.keys(shrine_followers).filter(k => shrine_followers[k].includes(currentUser.email))`

**📍 Localização:**
- Página: Seguidores (aba "👥 Seguidores")
- Código: [app.js](app.js#L650) Following section

---

## 🔍 EXPLORAÇÃO & DESCOBERTA

### Explorar Usuários
- **Descrição:** Grid de todos os usuários registrados
- **Dados Exibidos:**
  - 👤 Nome
  - 🎭 Role
  - ⭐ Botão "Seguir"

**Filtro:** Todos exceto você mesmo (futuro)

**📍 Localização:**
- Página: Explorar (aba "🔍 Explorar")
- Código: [app.js](app.js#L750) Explore section

---

## 🚨 DENÚNCIAS & MODERAÇÃO

### Denunciar Usuário
- **Descrição:** Reportar comportamento inadequado
- **Quem:** Membros e Admins
- **Dados Coletados:**
  - 📧 Email do denunciado
  - 👤 Nome de quem denunciou
  - 📝 Motivo (texto livre)
  - ⏰ Timestamp automático

**Estrutura:**
```javascript
{
  id: "id_123...",
  reportedEmail: "user@email.com",
  reporterEmail: "reporter@email.com",
  reporterName: "Reporter Name",
  reason: "Razão da denúncia",
  timestamp: "2026-02-27T10:30:00Z"
}
```

**Armazenamento:** `shrine_reports`  
**Log:** Registrado como atividade "REPORT"

**📍 Localização:**
- Página: Feed (botão "⚠️" em cada post)
- Código: [app.js](app.js#L725) `reportUser()`
- Docs: [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-denúncias)

---

## 🦊 ADMIN - GERENCIAMENTO

### Ver Todos os Usuários
- **Descrição:** Tabela com todos os usuários registrados
- **Acesso:** Apenas Admin
- **Colunas:**
  - # (número)
  - 👤 Nome
  - 📧 Email
  - 🎭 Papel
  - 📅 Data de Registro

**Dados:** `shrine_users` (localStorage)

**📍 Localização:**
- Página: Admin Panel (botão "📋 Ver Usuários")
- Código: [app.js](app.js#L385) `displayAllUsers()`

---

### Alterar Papel de Usuário
- **Descrição:** Mudar role de um usuário
- **Acesso:** Apenas Admin
- **Opções:** Visitante ↔ Membro
- **Restrição:** Não pode alterar Admin

**Input:** Email do usuário

**📍 Localização:**
- Página: Admin Panel (botão "✏️ Alterar Papel")
- Código: [app.js](app.js#L420) `changeUserRole()`

---

### Deletar Usuário
- **Descrição:** Remover usuário do sistema
- **Acesso:** Apenas Admin
- **Confirmação:** Requerida
- **Restrição:** Não pode deletar Admin
- **Efeito:** Remove de `shrine_users`

**Input:** Email do usuário

**📍 Localização:**
- Página: Admin Panel (botão "🗑️ Deletar Usuário")
- Código: [app.js](app.js#L430) `deleteUser()`

---

## 🦊 ADMIN - AÇÕES MODERADORAS

### Avisar Usuário (⚠️)
- **Descrição:** Enviar aviso a um usuário
- **Acesso:** Apenas Admin
- **Registro:** Log como "WARN"
- **Efeito:** Visual (alerta)

**📍 Localização:**
- Página: Admin Panel (botão "⚠️ Avisar Usuário")
- Código: [app.js](app.js#L356) `adminAction('WARN')`

---

### Expulsar Usuário (👢)
- **Descrição:** Fazer logout forçado de um usuário
- **Acesso:** Apenas Admin
- **Registro:** Log como "KICK"
- **Efeito:** 
  - Remove `current_user` do localStorage
  - Usuário é desconectado
  - Precisa fazer login novamente

**📍 Localização:**
- Página: Admin Panel (botão "👢 Expulsar Usuário")
- Código: [app.js](app.js#L365) `adminAction('KICK')`

---

### Banir Usuário (🚫)
- **Descrição:** Bloqueio permanente de um usuário
- **Acesso:** Apenas Admin
- **Confirmação:** Texto "SIM" obrigatório
- **Registro:** Log como "BAN"
- **Efeito:**
  - `yae_status` = "BANNED"
  - Mensagem de ban exibida
  - Usuário não pode acessar

**Armazenamento:** `localStorage.yae_status`

**📍 Localização:**
- Página: Admin Panel (botão "🚫 Banir Usuário")
- Código: [app.js](app.js#L373) `adminAction('BAN')`
- Docs: [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-sistema-de-ban)

---

## 🦊 ADMIN - CONFIGURAÇÕES

### Limpar Log de Atividades
- **Descrição:** Apagar histórico de atividades
- **Acesso:** Apenas Admin
- **Efeito:** `shrine_activity_log` vira `[]` (vazio)
- **Reversibilidade:** ❌ Irreversível

**📍 Localização:**
- Página: Admin Panel (botão "🗑️ Limpar Log")
- Código: [app.js](app.js#L450) `clearActivityLog()`

---

### Resetar Todos os Dados
- **Descrição:** Apagar TUDO (usuários, posts, atividades)
- **Acesso:** Apenas Admin
- **Confirmação:** Escrever "SIM" obrigatório
- **Reversibilidade:** ❌ Irreversível
- **Efeito:** Página recarrega (limpa)

**Limpa:**
- `shrine_users`
- `current_user`
- `shrine_posts`
- `shrine_followers`
- `shrine_reports`
- `shrine_activity_log`

**⚠️ CUIDADO:** Use apenas em emergência!

**📍 Localização:**
- Página: Admin Panel (botão "🔄 Resetar Dados")
- Código: [app.js](app.js#L455) `resetAllData()`

---

## 📊 LOG DE ATIVIDADES

### Registro de Atividades
- **Descrição:** Timeline de TODAS as ações importantes
- **Acesso:** Admin (visualização em painel)
- **Atualização:** Tempo real
- **Limite:** Últimas 50 atividades

**6 Tipos de Atividades:**

1. **LOGIN** ✅
   - Quando: Usuário faz login
   - Registrado por: `handleLogin()`

2. **SIGNUP** ✅
   - Quando: Novo usuário criado
   - Registrado por: `handleSignUp()`

3. **LOGOUT** ✅
   - Quando: Usuário faz logout
   - Registrado por: `showUserMenu()`

4. **WARN** ⚠️
   - Quando: Admin envia aviso
   - Registrado por: `adminAction('WARN')`

5. **KICK** 👢
   - Quando: Admin expulsa usuário
   - Registrado por: `adminAction('KICK')`

6. **BAN** 🚫
   - Quando: Admin bane usuário
   - Registrado por: `adminAction('BAN')`

**Estrutura de Registro:**
```javascript
{
  type: "LOGIN",
  email: "user@email.com",
  name: "User Name",
  timestamp: "2026-02-27T10:30:00Z",
  displayTime: "27/02/2026 10:30:00"
}
```

**Armazenamento:** `shrine_activity_log`

**Função Principal:** [app.js](app.js#L340) `logActivity()`

**📍 Localização:**
- Página: Admin Panel (seção "⚡ Atividades em Tempo Real")
- Visualização: [app.js](app.js#L348) `updateActivityDisplay()`
- Docs: [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-log-de-atividades)

---

## 📍 LOCALIZAR TUDO RAPIDAMENTE

### Por Feature

| Feature | Página | Código | Docs |
|---------|--------|--------|------|
| **Login** | Homepage | [app.js#L130](app.js#L130) | [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-autenticação) |
| **Feed** | Feed | [app.js#L542](app.js#L542) | [DOCS_PAGES.md](DOCS_PAGES.md#-feed-social) |
| **Posts** | Feed | [app.js#L509](app.js#L509) | [DOCS_PAGES.md](DOCS_PAGES.md#criar-posts) |
| **Perfil** | Perfil | [app.js#L675](app.js#L675) | [DOCS_PAGES.md](DOCS_PAGES.md#-página-do-perfil) |
| **Seguidores** | Seguidores | [app.js#L705](app.js#L705) | [DOCS_PAGES.md](DOCS_PAGES.md#-página-de-seguidores) |
| **Denúncias** | Feed | [app.js#L725](app.js#L725) | [DOCS_PAGES.md](DOCS_PAGES.md#denunciar-usuário) |
| **Admin** | Admin | [app.js#L350](app.js#L350) | [DOCS_PAGES.md](DOCS_PAGES.md#-painel-admin) |
| **Logs** | Admin | [app.js#L348](app.js#L348) | [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-log-de-atividades) |

---

## 🎯 PERGUNTAS FREQUENTES POR FEATURE

**"Como crio um post?"**  
→ Vá para Feed, escreva no textarea, clique "Publicar" → [createPost()](app.js#L509)

**"Como sigo um usuário?"**  
→ Vá para "Explorar", clique "⭐" em um usuário → [followUser()](app.js#L705)

**"Como vejo meus seguidores?"**  
→ Vá para aba "👥 Seguidores" no perfil

**"Como denuncio um comportamento?"**  
→ Clique "⚠️ Denunciar" em um post → [reportUser()](app.js#L725)

**"Como expulso um usuário?"**  
→ Painel Admin, botão "👢 Expulsar Usuário" → [adminAction('KICK')](app.js#L365)

**"Onde vejo o log de atividades?"**  
→ Painel Admin, seção "⚡ Atividades em Tempo Real" → [updateActivityDisplay()](app.js#L348)

---

## 📚 DOCUMENTAÇÃO RELACIONADA

- [DOCS_INDEX.md](DOCS_INDEX.md) - Index principal
- [DOCS_PAGES.md](DOCS_PAGES.md) - Organização por página
- [SYSTEM_DOCS.md](SYSTEM_DOCS.md) - Documentação técnica
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Guia de testes

---

**Última atualização:** 27 de Fevereiro, 2026  
**Versão:** 2.0.0  
**Organização:** Por Features 🎯

---

Desenvolvido para o Santuário Nakunami 🦊⚡
