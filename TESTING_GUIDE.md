# 🧪 Guia de Testes - Sistema de Roles

## ✅ Testes Básicos

### Teste 1: Login como Admin
**Objetivo:** Verificar se painel admin aparece

1. [ ] Abra http://localhost:8000
2. [ ] Clique em "🔐 Login"
3. [ ] Digite:
   - Email: `damiensoaresbrito@gmail.com`
   - Senha: `admin123`
4. [ ] Verifique se apareceu no topo direito: "🦊 PAINEL YAE ADMIN"
5. [ ] Verifique se apareceu no topo esquerdo: "🦊 Yae Miko (administrador)"

### Teste 2: Acessar Painel Admin
**Objetivo:** Abrir e testar funcionalidades admin

1. [ ] Clique no botão "🦊 PAINEL YAE ADMIN" (canto superior direito)
2. [ ] Voce seu um modal com opções de:
   - 📋 Ver Usuários
   - ✏️ Alterar Papel
   - 🗑️ Deletar Usuário
   - ⚠️ Avisar Usuário
   - 👢 Expulsar Usuário
   - 🚫 Banir Usuário
   - 🔄 Resetar Dados

### Teste 3: Atalho de Teclado Admin
**Objetivo:** Verificar se Ctrl+Shift+A abre o painel

1. [ ] Estando logado como admin
2. [ ] Pressione `Ctrl + Shift + A`
3. [ ] O painel deve abrir/fechar alternadamente

### Teste 4: Login como Membro
**Objetivo:** Verificar que membro NÃO vê painel admin

1. [ ] Clique "👋 Yae Miko" (botão logout)
2. [ ] Confirme para fazer logout
3. [ ] Clique em "🔐 Login"
4. [ ] Digite:
   - Email: `miko@shrine.jp`
   - Senha: `kitsune123`
5. [ ] Verifique se NO topo direito NÃO há "🦊 PAINEL YAE ADMIN"
6. [ ] Verifique se apareceu: "⭐ Miko Devotee (membro)"

### Teste 5: Criar Novo Usuário
**Objetivo:** Novo usuário deve ser criado como MEMBRO

1. [ ] Clique em "👋..." para logout
2. [ ] Clique "🔐 Login"
3. [ ] Clique "Create one" (Create account)
4. [ ] Preencha:
   - Name: "Teste User"
   - Email: "teste@example.com"
   - Password: "senha123"
   - Confirm: "senha123"
5. [ ] Clique "Start Journey"
6. [ ] Verifique no topo esquerdo: "⭐ Teste User (membro)"
7. [ ] Verifique que painel admin NÃO aparece

### Teste 6: Admin Alterando Papel
**Objetivo:** Mudar papel de usuário para visitante

1. [ ] Logout (clique no nome)
2. [ ] Login como admin (`damiensoaresbrito@gmail.com` / `admin123`)
3. [ ] Abra painel (Ctrl+Shift+A ou clique botão)
4. [ ] Clique "✏️ Alterar Papel"
5. [ ] Digite: `teste@example.com`
6. [ ] Escolha "Cancelar" para Visitante
7. [ ] Verifique alerta de sucesso
8. [ ] Logout
9. [ ] Login com `teste@example.com` / `senha123`
10. [ ] Verifique no topo esquerdo: "👤 Teste User (visitante)"

### Teste 7: Nega Acesso Admin a Não-Admins
**Objetivo:** Garantir que não-admins não podem abrir painel

1. [ ] Estando logado como membro ou visitante
2. [ ] Pressione `Ctrl + Shift + A`
3. [ ] Deve aparecer alerta: "❌ Acesso negado!"
4. [ ] Painel NÃO deve abrir

### Teste 8: Ver Lista de Usuários
**Objetivo:** Visualizar todos os usuários registrados

1. [ ] Login como admin
2. [ ] Abra painel (Ctrl+Shift+A)
3. [ ] Clique "📋 Ver Usuários"
4. [ ] Deve aparecer lista com todos os usuários:
   - Nome
   - Email
   - Papel
   - Data de registro

### Teste 9: Sistema de Ban
**Objetivo:** Verificar funcionamento de ban

1. [ ] Login como admin
2. [ ] Abra painel
3. [ ] Clique "🚫 Banir Usuário"
4. [ ] Digite email de um usuário qualquer
5. [ ] Confirme a ação
6. [ ] Recarregue a página
7. [ ] Você verá: "🚫 VOCÊ FOI BANIDO DO SANTUÁRIO"
8. [ ] Para debanir, admin faz:
   - Abre painel
   - Clica "🔄 Resetar Dados"
   - Confirma duas vezes
   - Todos os dados são deletados

### Teste 10: Mudança de UI Baseada em Role
**Objetivo:** Confirmar que UI muda conforme role

| Role | Aparece à Esquerda | Aparece à Direita |
|------|-------------------|-------------------|
| Visitante | 👤 Name (visitante) | Nada |
| Membro | ⭐ Name (membro) | Nada |
| Admin | 🦊 Name (administrador) | 🦊 PAINEL YAE ADMIN |

---

## 🐛 Testes de Bug

### Bug Test 1: Duplicação de Usuários
1. [ ] Tente registrar dois usuários com mesmo email
2. [ ] Deve aparecer: "❌ Este email já está registrado!"

### Bug Test 2: Senhas não Combinam
1. [ ] Tente registrar com senhas diferentes
2. [ ] Deve aparecer: "❌ As senhas não correspondem!"

### Bug Test 3: Senha muito Curta
1. [ ] Tente registrar com senha < 6 caracteres
2. [ ] Deve aparecer: "❌ A senha deve ter pelo menos 6 caracteres!"

### Bug Test 4: Admin não pode ser Deletado
1. [ ] Login como admin
2. [ ] Abra painel
3. [ ] Clique "🗑️ Deletar Usuário"
4. [ ] Digite email do admin
5. [ ] Deve aparecer: "❌ Não é possível deletar o administrador!"

### Bug Test 5: Admin não pode Mudar Seu Próprio Papel
1. [ ] Login como admin
2. [ ] Abra painel
3. [ ] Clique "✏️ Alterar Papel"
4. [ ] Digite email do admin
5. [ ] Deve aparecer: "❌ Não é possível alterar o papel do administrador!"

---

## 📊 Checklist de Funcionalidades

- [ ] Autenticação funciona
- [ ] Roles são atribuídos corretamente
- [ ] Painel admin só aparece para admins
- [ ] Painel admin só aparece para email específico
- [ ] Logout funciona
- [ ] Sistema de roles se mantém após refresh
- [ ] localStorage está sendo usado corretamente
- [ ] UI responde à mudança de role
- [ ] Atalho de teclado funciona
- [ ] Sistema de ban funciona

---

**Status:** ✅ Pronto para Produção (com ressalvas de segurança)

Veja [SYSTEM_DOCS.md](SYSTEM_DOCS.md) para informações de segurança!
