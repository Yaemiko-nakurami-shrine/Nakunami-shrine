# 🦊 Nakunami Shrine - Sistema de Roles e Admin

## 📋 Descrição Geral

O sistema foi implementado com **autenticação baseada em localStorage** com suporte a **3 níveis de roles**:

### 🔑 Roles Implementados:

1. **👤 VISITANTE** - Acesso básico ao site
2. **⭐ MEMBRO** - Acesso padrão registrado
3. **🦊 ADMINISTRADOR** - Acesso total ao painel admin (EXCLUSIVO)

---

## 🔓 Credenciais de Teste

### Admin (completo acesso):
- **Email:** `damiensoaresbrito@gmail.com`
- **Senha:** `admin123`
- **Papel:** Administrador

### Membro (acesso padrão):
- **Email:** `miko@shrine.jp`
- **Senha:** `kitsune123`
- **Papel:** Membro

### Visitante (usuários novos):
- Qualquer novo registro será criado como **MEMBRO**
- Para se tornar **VISITANTE**, um admin deve alterar o papel

---

## 🎮 Como Funcionam os Roles

### 1️⃣ Automaticamente ao Login
- Se o usuário usar o email `damiensoaresbrito@gmail.com`, ele recebe automaticamente o papel **ADMINISTRADOR**
- Todos os outros usam **MEMBRO** como padrão
- O painel admin só aparece para admins

### 2️⃣ Mudando Roles (Apenas Admin)
1. Faça login com `damiensoaresbrito@gmail.com`
2. Abra o painel admin (ícone 🦊 no topo à direita ou **Ctrl+Shift+A**)
3. Clique em "✏️ Alterar Papel"
4. Digite o email do usuário
5. Escolha Membro ou Visitante

---

## 🛡️ Painel Admin - Recursos

**Acesso Exclusivo:** Somente `damiensoaresbrito@gmail.com`

### 📊 Gerenciamento de Usuários
- **📋 Ver Usuários** - Lista todos os usuários registrados
- **✏️ Alterar Papel** - Muda o papel de um usuário
- **🗑️ Deletar Usuário** - Remove um usuário (não pode deletar admin)
- **⚠️ Avisar Usuário** - Envia aviso ao usuário

### ⚡ Ações Moderadoras
- **👢 Expulsar Usuário** - Faz logout forçado do usuário
- **🚫 Banir Usuário** - Bane permanentemente o usuário

### ⚙️ Configurações
- **🔄 Resetar Dados** - Limpa TODOS os dados (cuidado!)
- **❌ Fechar Painel** - Fecha o painel admin

---

## 🚀 Como Acessar o Painel Admin

### Método 1: Botão Visual
1. Faça login com `damiensoaresbrito@gmail.com`
2. Clique no botão 🦊 **"Abrir Painel Admin"** (canto superior direito)

### Método 2: Atalho de Teclado
- **Ctrl + Shift + A** - Abre/fecha o painel admin instantaneamente

---

## 👥 Exemplo de Fluxo

### Visitante Novo
1. Clica em "🔐 Login"
2. Cria uma conta → **Automaticamente registrado como MEMBRO**
3. Vê seu nome no botão de login
4. À esquerda, vê seu info: *"⭐ Seu Nome (membro)"*

### Admin
1. Faz login com email admin
2. Aparece indicador **"🦊 PAINEL YAE ADMIN"** no canto superior direito
3. Botão de admin ativa ao clicar
4. Pode gerenciar todos os usuários

---

## 💾 Dados Armazenados (localStorage)

```javascript
// Usuários
shrine_users: [
  {
    name: "Nome",
    email: "email@example.com",
    password: "senha",
    role: "membro" | "visitante" | "administrador",
    createdAt: "2024-..."
  }
]

// Usuário Logado
current_user: { ...user object... }

// Status de Ban
yae_status: "BANNED" // Se banido
```

---

## 🔐 Recurso de Ban

### Como Banir um Usuário:
1. Abra o painel admin
2. Clique em **"🚫 Banir Usuário"**
3. Digite o email
4. Confirme a ação

### Efeito do Ban:
- Página fica vermelha com mensagem
- Usuário não pode mais acessar o site
- Necessário resetar dados (admin access required)

---

## 🌐 Informações de Segurança

⚠️ **AVISO:** Este é um sistema de demonstração!

- Senhas são armazenadas em **texto plano** (não use em produção)
- Dados armazenados no **localStorage** do navegador
- Qualquer pessoa pode acessar via DevTools
- Para produção, use autenticação backend com tokens JWT

---

## 📱 Display de Informações

Quando logado, o usuário vê:
- **Top esquerda:** Seu nome e papel (com emoji)
- **Top direita (se admin):** Indicador 🦊 e botão do painel

---

## ✨ Arquivos do Projeto

- `index.html` - Estrutura HTML com modais
- `style.css` - Estilos e CSS do painel admin
- `app.js` - Toda a lógica de autenticação e roles (550+ linhas)

---

## 🎯 TODO para Melhorias Futuras

- [ ] Backend com banco de dados
- [ ] Hashing de senhas (bcrypt)
- [ ] Tokens JWT
- [ ] 2FA (autenticação de dois fatores)
- [ ] Log de atividades admin
- [ ] Permissões de moderação customizáveis
- [ ] Sistema de avisos/strikes

---

**Desenvolvido para o Santuário Nakunami sob supervisão da Lady Guuji Yae Miko** 🦊⚡
