# ⚡ Quick Start - Nakunami Shrine

## 🚀 Comece em 3 Passos

### Passo 1: Abra o Site
```
1. Abra o navegador
2. Vai para: http://localhost:8000
3. Espere o loader (Yae Miko aparecerá)
```

### Passo 2: Faça Login
```
Clique em "🔐 Login"

Opção A - Admin (Painel Completo):
- Email: damiensoaresbrito@gmail.com
- Senha: admin123

Opção B - Usuário Normal:
- Email: miko@shrine.jp
- Senha: kitsune123
```

### Passo 3: Veja as Diferenças

**Se Login Como Admin:**
- ➡️ Aparece "🦊 PAINEL YAE ADMIN" no topo direito
- ➡️ Aparece "🦊 Yae Miko (administrador)" no topo esquerdo
- ➡️ Pode abrir painel com Ctrl+Shift+A

**Se Login Como Membro:**
- ➡️ Aparece "⭐ Miko Devotee (membro)" no topo esquerdo
- ➡️ Sem painel admin (não aparece no canto direito)

---

## 🎮 Testando Admin

### Abrir o Painel Admin

**Opção 1:** Clique o botão
```
1. Canto superior direito
2. Clique "🦊 PAINEL YAE ADMIN"
3. Clique "👑 Abrir Painel Admin"
```

**Opção 2:** Atalho
```
1. Pressione: Ctrl + Shift + A
2. Modal abre automaticamente
```

### Dentro do Painel

```
┌─────────────────────────────────┐
│  🦊 YAE MIKO ADMIN PANEL        │
├─────────────────────────────────┤
│  📊 Gerenciamento de Usuários   │
│  ├─ 📋 Ver Usuários             │
│  ├─ ✏️ Alterar Papel            │
│  ├─ 🗑️ Deletar Usuário          │
│  └─ ⚠️ Avisar Usuário           │
│                                 │
│  ⚡ Ações Moderadoras           │
│  ├─ 👢 Expulsar Usuário         │
│  └─ 🚫 Banir Usuário            │
│                                 │
│  ⚙️ Configurações do Santuário   │
│  ├─ 🔄 Resetar Dados            │
│  └─ ❌ Fechar Painel            │
└─────────────────────────────────┘
```

---

## 👥 Criando Novo Usuário

1. Clique "🔐 Login"
2. Clique "Create one" (Criar conta)
3. Preencha:
   - **Name:** Seu nome
   - **Email:** seu@email.com
   - **Password:** mínimo 6 caracteres
   - **Confirm:** Repita a senha
4. Clique "Start Journey"
5. ✅ Você é criado como **MEMBRO**
6. ❌ Painel admin NÃO aparece

---

## 🎯 Testes Rápidos

### Teste 1: Admin vs Membro
```
1. Login admin →  Vê painel admin ✅
2. Logout
3. Login membro → Sem painel admin ❌
```

### Teste 2: Novo Usuário
```
1. SignUp novo → Criado como membro ⭐
2. Admin altera → Para visitante 👤
3. Visitante vê papel mudado
```

### Teste 3: Atalho de Teclado
```
1. Login admin
2. Pressione Ctrl + Shift + A
3. Abre/fecha painel alternadamente
```

### Teste 4: Proteção
```
1. Login admin
2. Tente changar seu próprio papel
3. Recebe: "❌ Não é possível alterar..."
4. Tente deletar sua conta
5. Recebe: "❌ Não é possível deletar..."
```

---

## 💡 Dicas Úteis

### Roles Explicados

```
👤 VISITANTE
  └─ Acesso básico ao site
  └─ Sem painel admin

⭐ MEMBRO
  └─ Mesmo acesso que visitante
  └─ Padrão para novos usuários
  └─ Sem painel admin

🦊 ADMINISTRADOR
  └─ SÓ você (damiensoaresbrito@gmail.com)
  └─ Painel admin completo
  └─ Pode gerenciar tudo
```

### Onde ver informações

**Topo Esquerdo:**
```
[EMOJI] Nome (Papel)
Mostra seu status atual
```

**Topo Direito (Se Admin):**
```
🦊 PAINEL YAE ADMIN (indicador)
👑 Botão para abrir painel
```

### Como Sair

1. Clique no seu nome (topo)
2. Clique "👋 ..."
3. Clique "OK" para confirmar logout
4. Botão volta a "🔐 Login"

---

## 🐛 Problemas Comuns

### "Dados desapareceram após recarregar"
```
✅ Solução: Verifique se localStorage está ativado
   ou clique "🔄 Resetar Dados" no painel admin
```

### "Não consigo abrir o painel admin"
```
✅ Você é admin? Verifique:
   - Email: damiensoaresbrito@gmail.com
   - Clique "👑 Abrir Painel Admin" ou Ctrl+Shift+A
```

### "Novo usuário não aparece na lista"
```
✅ Solução: Admin precisa ver no painel
   1. Abra painel
   2. Clique "📋 Ver Usuários"
```

### "Esqueci a senha"
```
✅ Solução: Use "🔄 Resetar Dados"
   Cuidado: Deleta TODOS os usuários!
```

---

## 📞 Suporte Rápido

| Problema | Como Resolver |
|----------|---------------|
| Esqueci senha | Resetar Dados (no painel) |
| Painel não aparece | Você é admin? Tente Ctrl+Shift+A |
| Dados sumiram | localStorage limpo - SignUp novamente |
| Banido | Admin faz: 🔄 Resetar Dados |
| Role errado | Admin muda em: ✏️ Alterar Papel |

---

## 🎉 Exemplos de Uso

### Cenário 1: Gerenciar Usuários
```
1. Admin faz login
2. Abre painel (Ctrl+Shift+A)
3. Clica "📋 Ver Usuários"
4. Vê lista de todos
5. Clica "✏️ Alterar Papel"
6. Escolhe um usuário e novo papel
```

### Cenário 2: Banir Alguém
```
1. Admin abre painel
2. Clica "🚫 Banir Usuário"
3. Digita email
4. Confirma duas vezes
5. Usuário vê página vermelha
6. Admin faz "🔄 Resetar" para debanir
```

### Cenário 3: Novo Visitante
```
1. Clica "Create one"
2. Preenche dados
3. Sistema cria como MEMBRO
4. Admin muda para VISITANTE
5. Visitante agora tem papel correto
```

---

## ✨ Dica Pro

Você pode testar tudo rapidamente:

1. **Abra DevTools:** F12 ou Ctrl+Shift+I
2. **Vá em Console**
3. **Digite:** `localStorage.getItem('shrine_users')`
4. **Veja**: Estrutura de dados JSON

---

## 🚀 Próximos Passos

- [ ] Faça login como admin
- [ ] Explore o painel
- [ ] Crie um novo usuário
- [ ] Altere o papel de alguém
- [ ] Teste o atalho de teclado
- [ ] Leia **SYSTEM_DOCS.md** para detalhes
- [ ] Veja **TESTING_GUIDE.md** para testes

---

**Tudo pronto? Vamos começar!** 🦊⚡

Happy testing! 🎉
