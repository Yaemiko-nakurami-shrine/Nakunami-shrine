# 📄 Documentação por Página - Nakunami Shrine

> Guia organizado por **páginas e seções** da aplicação

---

## 🏠 PÁGINA PRINCIPAL

### Autenticação (Login/Signup)
- **O que é:** Modal para entrar ou criar conta no santuário
- **Quem acessa:** Visitantes não autenticados
- **Funcionalidades:**
  - ✅ Login com email e senha
  - ✅ Signup para criar nova conta
  - ✅ Validação de dados
  - ✅ Armazenamento seguro em localStorage

**📖 Ver detalhes em:** [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-autenticação)  
**🧪 Testar em:** [TESTING_GUIDE.md](TESTING_GUIDE.md#teste-1-login-básico)

### Telas Especiais & Animações
- **Loader inicial:** Tela com raposa giratória, barra de carregamento e efeito de trovão; aparece 1.5 s ao carregar.
- **Tela de manutenção:** Overlay colorido com partículas eletro, cabeçalho animado e mensagens dinâmicas; ativada pelo admin.
- **Tela de banimento:** Fundo escuro com conteúdo tremendo e ícone pulsante; exibida quando o usuário está banido.
- **Tela de boas-vindas:** Mensagem animada com confetes após login, desaparece automaticamente.

Essas telas possuem animações CSS e ajudam a criar uma experiência mais imersiva.

### Navegação Principal
- **O que é:** Menu de navegação com links principais
- **Quem acessa:** Todos os visitantes
- **Funcionalidades:**
  - 🔗 Links para seções (Sacred Sakura, Lady Guuji, Fortune, Contact)
  - 👤 Botão de autenticação (Login/Perfil)
  - 🎯 Responsivo e acessível

**📖 Ver detalhes em:** [README.md](README.md)

### Seções Principais
- **Sacred Sakura:** Descrição do Santuário
- **Lady Guuji:** Informações sobre Yae Miko
- **Fortune Drawing:** Sistema de sorte (Omikuji)
- **Contact:** Links de redes sociais

**📖 Ver detalhes em:** [README.md](README.md)

---

## 👥 FEED SOCIAL (Página Principal - Usuários Logados)

### Criar Posts
- **O que é:** Widget para compartilhar mensagens com o santuário
- **Quem acessa:** Apenas usuários logados (Membro ou Admin)
- **Funcionalidades:**
  - ✅ Campo de texto para posts
  - ✅ Suporte para fotos/vídeos
  - ✅ Publicação com timestamp
  - ✅ Feedback visual

**Dados Armazenados:** localStorage `shrine_posts`
```javascript
{
  id: "id_123abc456def789",
  authorEmail: "usuario@email.com",
  authorName: "Nome do Usuário",
  content: "Texto do post",
  likes: ["email1@test.com", "email2@test.com"],
  comments: [/* array de comentários */],
  timestamp: "2026-02-27T10:30:00Z",
  displayTime: "27/02/2026 10:30:00"
}
```

**📖 Ver detalhes em:** [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-rede-social)

### Feed em Tempo Real
- **O que é:** Timeline com todos os posts
- **Funcionalidades:**
  - ✅ Posts em ordem cronológica (mais recentes primeiro)
  - ✅ Informações do autor (nome, timestamp)
  - ✅ Contadores (likes, comentários)
  - ✅ Carregamento automático ao fazer login

**🧪 Testar em:** [TESTING_GUIDE.md](TESTING_GUIDE.md#teste-social-network)

### Curtidas em Posts
- **O que é:** Sistema de "+ curtida" para posts
- **Funcionalidades:**
  - ❤️ Curtir posts (muda cor para rosa)
  - 🤍 Descurtir posts
  - 📊 Contador dinâmico de curtidas
  - 👤 Apenas usuários logados podem curtir

**Dados Armazenados:** Array `likes` dentro do post
```javascript
post.likes = ["email@user.com", "email2@user.com"]
```

### Comentários em Posts
- **O que é:** Sistema de comentários aninhados para cada post
- **Funcionalidades:**
  - 💬 Adicionar comentários aos posts
  - 📝 Exibir histórico de comentários
  - 👤 Nome do comentarista com cada comentário
  - ⏰ Timestamp de cada comentário

**Dados Armazenados:** Array `comments` dentro do post
```javascript
comment: {
  id: "id_123...",
  authorEmail: "user@mail.com",
  authorName: "Nome Usuário",
  content: "Texto comentário",
  timestamp: "2026-02-27T10:30:00Z"
}
```

---

## 👤 PÁGINA DO PERFIL

### Informações do Usuário
- **O que é:** Card com dados do perfil logado
- **Quem acessa:** Apenas o próprio usuário
- **Informações Exibidas:**
  - 👤 Nome do usuário
  - 📧 Email
  - 🎭 Papel/Role (Visitante, Membro, Admin)

### Estatísticas
- **Posts:** Total de posts publicados pelo usuário
- **Seguidores:** Quantas pessoas seguem este usuário
- **Seguindo:** Quantas pessoas este usuário segue

**Dados Armazenados:**
```javascript
// Followers
localStorage.shrine_followers = {
  "user@email.com": ["follower1@email.com", "follower2@email.com"]
}

// Posts
localStorage.shrine_posts.filter(p => p.authorEmail === currentUser.email)
```

### Meus Posts
- **O que é:** Timeline dos posts do usuário logado
- **Funcionalidades:**
  - 📝 Exibir todos os posts do usuário
  - ⏰ Com timestamps
  - 🎯 Acesso rápido aos seus compartilhamentos

**📖 Ver detalhes em:** [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-perfil-do-usuário)

---

## 👥 PÁGINA DE SEGUIDORES

### Meus Seguidores
- **O que é:** Lista de usuários que seguem você
- **Funcionalidades:**
  - 👤 Nome do seguidor
  - 🎭 Papel/role do seguidor
  - 📊 Contador de seguidores

**Dados Armazenados:** Array em `shrine_followers[userEmail]`

### Estou Seguindo
- **O que é:** Lista de usuários que você segue
- **Funcionalidades:**
  - 👤 Nome do usuário seguido
  - 🎭 Papel do usuário
  - ➖ Opção para deixar de seguir

**Dados Armazenados:** Verificado através de followers map

---

## 🔍 PÁGINA EXPLORAR

### Descobrir Usuários
- **O que é:** Grid com todos os usuários do santuário
- **Funcionalidades:**
  - 👤 Avatar e nome de cada usuário
  - 🎭 Papel/role visual
  - ✨ Botão "Seguir"
  - 🎨 Design responsivo

### Seguir Usuários
- **O que é:** Ação para adicionar um usuário aos seus seguidos
- **Funcionalidades:**
  - ✅ Adicionar usuário aos seguindo
  - 🔄 Atualização em tempo real
  - 📢 Feedback visual

**📖 Ver detalhes em:** [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-seguir-usuários)

---

## 🦊 PAINEL ADMIN (Exclusivo)

> ⚠️ **ACESSO EXCLUSIVO:** `damiensoaresbrito@gmail.com` apenas

### Gerenciamento de Usuários

#### Ver Usuários
- **O que é:** Tabela dinâmica com todos os usuários registrados
- **Quem acessa:** Apenas Admin
- **Informações:**
  - # (número)
  - 👤 Nome
  - 📧 Email
  - 🎭 Papel (Visitante, Membro, Admin)
  - 📅 Data de Registro

**Dados Exibidos:** Todos os usuários de `shrine_users`

#### Alterar Papel
- **O que é:** Mudar role de um usuário (Visitante → Membro)
- **Funcionalidades:**
  - ✏️ Selecionar usuário por email
  - 🔄 Trocar entre Visitante/Membro
  - ❌ Não pode alterar Admin
  - ✅ Feedback de sucesso

#### Deletar Usuário
- **O que é:** Remover usuário do sistema
- **Funcionalidades:**
  - 🗑️ Remover por email
  - ⚠️ Confirmação necessária
  - ❌ Não pode deletar Admin
  - 📝 Log registrado

**📖 Ver detalhes em:** [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-painel-admin)

### Ações Moderadoras

#### Avisar Usuário (⚠️)
- **O que é:** Enviar aviso a um usuário
- **Funcionalidades:**
  - 📢 Notificação ao usuário
  - 📝 Registrado em log de atividades
  - 🎯 Email do usuário alvo

#### Expulsar Usuário (👢)
- **O que é:** Logout forçado de um usuário
- **Funcionalidades:**
  - 🔓 Remover sessão do usuário
  - 📝 Registrado em log
  - 🔄 Usuário precisa fazer login novamente

#### Banir Usuário (🚫)
- **O que é:** Bloqueio permanente de um usuário
- **Funcionalidades:**
  - 🔒 Bloqueio total da conta
  - ⚠️ Confirmação obrigatória
  - 🚫 Mensagem de ban exibida
  - 📝 Registrado em log

**📖 Ver detalhes em:** [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-sistema-de-ban)

### Configurações do Santuário

#### Limpar Log de Atividades
- **O que é:** Apagar histórico de atividades
- **Funcionalidades:**
  - 🗑️ Limpar todos os logs
  - ⚠️ Ação irreversível
  - 📝 Registrado como ação admin

#### Resetar Dados
- **O que é:** Apagar tudo (usuários, posts, atividades)
- **Funcionalidades:**
  - 🔄 Reset completo
  - ⚠️ Confirmação texto "SIM"
  - ❌ Ação irreversível
  - 🔁 Página recarrega

**⚠️ CUIDADO:** Deleta tudo!

### Atividades em Tempo Real

#### Log de Atividades
- **O que é:** Timeline de todas as ações dos usuários
- **Funcionalidades:**
  - 🎬 Atualização em tempo real
  - 📊 6 tipos de atividades:
    - ✅ LOGIN (usuário fez login)
    - ✅ SIGNUP (novo usuário)
    - ✅ LOGOUT (usuário saiu)
    - ✅ WARN (aviso enviado)
    - ✅ KICK (expulsão)
    - ✅ BAN (banimento)
  - 🎨 Cores e emojis visuais
  - ⏰ Timestamp exato

**Dados Armazenados:** `shrine_activity_log`
```javascript
activity: {
  type: "LOGIN",
  email: "user@email.com",
  name: "Nome Usuário",
  timestamp: "2026-02-27T10:30:00Z",
  displayTime: "27/02/2026 10:30:00"
}
```

**📖 Ver detalhes em:** [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-log-de-atividades)

---

## 🚨 SISTEMA DE DENÚNCIAS

### Denunciar Usuário
- **O que é:** Reportar comportamento inadequado
- **Quem acessa:** Todos os usuários logados
- **Funcionalidades:**
  - ⚠️ Motivo da denúncia (texto)
  - 📧 Email do denunciado
  - 👤 Nome de quem denunciou
  - ⏰ Timestamp automático
  - 📝 Registrado em log como "REPORT"

**Dados Armazenados:** `shrine_reports`
```javascript
report: {
  id: "id_123...",
  reportedEmail: "user@email.com",
  reporterEmail: "admin@email.com",
  reporterName: "Admin Yae",
  reason: "Comportamento inadequado",
  timestamp: "2026-02-27T10:30:00Z"
}
```

**📖 Ver detalhes em:** [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-denúncias)

---

## 📊 TABELA DE ACESSO POR PÁGINA

| Página | Visitante | Membro | Admin |
|--------|-----------|--------|-------|
| **Homepage** | ✅ | ✅ | ✅ |
| **Feed Social** | ❌ | ✅ | ✅ |
| **Criar Posts** | ❌ | ✅ | ✅ |
| **Perfil** | ❌ | ✅ | ✅ |
| **Seguidores** | ❌ | ✅ | ✅ |
| **Explorar** | ❌ | ✅ | ✅ |
| **Painel Admin** | ❌ | ❌ | ✅ |
| **Denunciar** | ❌ | ✅ | ✅ |

---

## 📍 LOCALIZAR FUNCIONALIDADE

### Onde encontrar cada feature?

**Autenticação**
- 📄 Página: Homepage (modal)
- 🔧 Código: [app.js](app.js#L130) `handleLogin()`, `handleSignUp()`
- 📖 Docs: [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-autenticação)

**Feed Social**
- 📄 Página: Feed (aba "📰 Feed")
- 🔧 Código: [app.js](app.js#L530) `loadFeed()`, `createPost()`
- 📖 Docs: [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-rede-social)

**Perfil**
- 📄 Página: Perfil (aba "👤 Meu Perfil")
- 🔧 Código: [app.js](app.js#L650) `loadUserProfile()`
- 📖 Docs: [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-perfil)

**Seguidores**
- 📄 Página: Seguidores (aba "👥 Seguidores")
- 🔧 Código: [app.js](app.js#L700) Followers section
- 📖 Docs: [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-seguidores)

**Admin Panel**
- 📄 Página: Painel Especial (Ctrl+Shift+A)
- 🔧 Código: [app.js](app.js#L350) `toggleAdminPanel()`
- 📖 Docs: [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-painel-admin)

**Denúncias**
- 📄 Página: Em cada post (botão "⚠️")
- 🔧 Código: [app.js](app.js#L750) `reportUser()`
- 📖 Docs: [SYSTEM_DOCS.md](SYSTEM_DOCS.md#-denúncias)

---

## 🧪 TESTAR POR PÁGINA

Veja [TESTING_GUIDE.md](TESTING_GUIDE.md) para testes completos!

### Teste Rápido de Cada Página

```
Homepage: 
  ✅ Abre normalmente
  ✅ Clique "Login" abre modal
  ❌ Não pode acessar Feed sem login

Feed Social:
  ✅ Login com membro@test.com
  ✅ Veja o feed vazio ou com posts
  ✅ Crie um novo post
  ✅ Curta um post (❤️)
  ✅ Comente em um post (💬)

Perfil:
  ✅ Nome, email, role aparecem
  ✅ Estatísticas atualizam
  ✅ Veja seus posts

Painel Admin:
  ✅ Login com admin@example.com
  ✅ Veja lista de usuários (tabela)
  ✅ Veja log de atividades em tempo real
  ✅ Teste ações (avisar, expulsar, banir)

Denúncias:
  ✅ Clique "⚠️ Denunciar" em um post
  ✅ Escreva motivo
  ✅ Veja confirmação
```

---

## 📚 DOCUMENTAÇÃO RELACIONADA

- [DOCS_INDEX.md](DOCS_INDEX.md) - Index principal por tipo de doc
- [SYSTEM_DOCS.md](SYSTEM_DOCS.md) - Documentação técnica
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Guia de testes
- [QUICKSTART.md](QUICKSTART.md) - Começar rápido
- [README.md](README.md) - Visão geral do projeto

---

**Última atualização:** 27 de Fevereiro, 2026  
**Versão:** 2.0.0  
**Organização:** Por Página 📄

---

Desenvolvido para o Santuário Nakunami 🦊⚡
