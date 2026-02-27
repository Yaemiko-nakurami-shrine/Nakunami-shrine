# 📋 Activity Log - Sistema de Histórico em Tempo Real

## ✨ O Que é?

Um sistema de **log de atividades em tempo real** que rastreia todas as ações importantes dos usuários:

### 🔔 Atividades Registradas:

- **🔓 LOGIN** - Quando um usuário faz login
- **✨ SIGNUP** - Quando um novo usuário se registra
- **👋 LOGOUT** - Quando um usuário faz logout
- **⚠️ WARN** - Quando um usuário recebe um aviso (admin)
- **👢 KICK** - Quando um usuário é expulso (admin)
- **🚫 BAN** - Quando um usuário é banido (admin)

---

## 📊 Onde Ver?

### Para Admin (damiensoaresbrito@gmail.com):

1. Abra o **Painel Admin** (Ctrl+Shift+A ou clique o botão 🦊)
2. Role até a seção: **"⚡ Atividades em Tempo Real"**
3. Veja o histórico das últimas 50 atividades

### Estrutura do Log:

```
┌─────────────────────────────────────────┐
│ ⚡ Atividades em Tempo Real               │
├─────────────────────────────────────────┤
│ 🔓 LOGIN                                 │
│    Yae Miko (damiensoaresbrito@...)      │
│    27/02/2026 18:30:45                   │
│                                         │
│ ✨ SIGNUP                                │
│    Novo Usuário (novo@email.com)         │
│    27/02/2026 18:25:30                   │
│                                         │
│ 👋 LOGOUT                                │
│    Traveler (traveler@teyvat.com)        │
│    27/02/2026 18:20:15                   │
└─────────────────────────────────────────┘
```

---

## 🎨 Cores e Emojis

Cada tipo de atividade tem uma cor e emoji específicos:

| Atividade | Emoji | Cor |
|-----------|-------|-----|
| LOGIN | 🔓 | Verde (#4CAF50) |
| SIGNUP | ✨ | Azul (#2196F3) |
| LOGOUT | 👋 | Laranja (#FF9800) |
| WARN | ⚠️ | Amarelo (#FFC107) |
| KICK | 👢 | Vermelho alaranjado (#FF5722) |
| BAN | 🚫 | Vermelho (#F44336) |

---

## 💾 Armazenamento

### localStorage:
```javascript
activity_log: [
  {
    type: "LOGIN",
    email: "user@example.com",
    name: "User Name",
    timestamp: "2026-02-27T18:30:45.123Z",
    displayTime: "27/02/2026 18:30:45"
  },
  // ... mais atividades
]
```

### Limite:
- **Máximo 50 atividades** por log
- Atividades mais antigas são removidas automaticamente
- Novo login não deleta histórico anterior

---

## 🔄 Atualização em Tempo Real

O log se atualiza automaticamente quando:

1. ✅ Alguém faz **login**
2. ✅ Alguém faz **signup**
3. ✅ Alguém faz **logout**
4. ✅ Admin executa **ações modulares** (warn, kick, ban)
5. ✅ Admin **abre o painel admin**

---

## 🗑️ Limpar Log

### Como fazer:

1. Abra o **Painel Admin** (Ctrl+Shift+A)
2. Vá em **"⚙️ Configurações do Santuário"**
3. Clique **"🗑️ Limpar Log"**
4. Confirme a ação
5. ✅ Log apagado

### Nota:
- Isso **limpa APENAS o log de atividades**
- Não deleta usuários ou dados de auth
- Você pode fazer isso a qualquer momento

---

## 📌 Exemplo de Uso

### Cenário: Admin Monitorando Atividades

```
1. Admin faz login (18:30:00)
   └─ 🔓 Yae Miko fez login

2. Novo usuário se registra (18:31:15)
   └─ ✨ João Silva fez signup

3. Admin abre painel e vê:
   ├─ ✨ João Silva | 27/02 18:31:15
   └─ 🔓 Yae Miko | 27/02 18:30:00

4. Admin pode vê quem está entrando/saindo
   └─ Dashboard de segurança!
```

---

## 🎯 Informações Mostradas

Para cada atividade, você vê:

### Campo 1: Tipo
```
🔓 LOGIN
✨ SIGNUP
👋 LOGOUT
⚠️ WARN
👢 KICK
🚫 BAN
```

### Campo 2: Usuário
```
Nome Completo (email@example.com)
```

### Campo 3: Timestamp
```
27/02/2026 18:30:45
```

---

## ✨ Características

- [x] **Display em tempo real** - Atualiza instantaneamente
- [x] **Animação suave** - Slide-in quando novo item chega
- [x] **Cores distintas** - Fácil identificação visual
- [x] **Persistência** - Dados salvos em localStorage
- [x] **Limite automático** - Remove itens antigos (máx 50)
- [x] **Scrollbar customizado** - Tema Genshin Impact
- [x] **Informações completas** - Nome, email, tipo, timestamp

---

## 🔒 Segurança

- ✅ Apenas **admin** vê o log (no painel admin exclusivo)
- ✅ Não há exposição de senhas
- ✅ Email e nome são públicos (necessários para admin)
- ✅ Timestamps em timezone local
- ✅ Não há PII sensível no log

---

## 🐛 Troubleshooting

### "Não vejo atividades!"
```
✅ Solução: 
   1. Faça login/logout
   2. Abra o painel admin
   3. As atividades devem aparecer
```

### "Log desapareceu!"
```
✅ Solução:
   1. localStorage limpou?
   2. Clique "🔄 Resetar Dados" reconstrói log
   3. Próximas ações serão registradas
```

### "Muitas atividades antigas"
```
✅ Solução:
   1. Abra painel admin
   2. Clique "🗑️ Limpar Log"
   3. Log é zerado, mas dados de usuários ficam
```

---

## 📊 Limite e Performance

- **Max Activities:** 50 por log
- **Atualização:** Instantânea
- **Performance:** Zero lag (localStorage é rápido)
- **Tamanho:** ~5-10 KB no máximo
- **Scroll:** Máximo 50 itens - sem problemas

---

## 🎓 Casos de Uso

### Caso 1: Monitorar Novos Registros
```
Admin abre painel e vê:
✨ Novo User 1
✨ Novo User 2
✨ Novo User 3
→ Rápida visão de quem se registrou
```

### Caso 2: Auditar Login Suspeito
```
Admin vê:
🔓 Email_X fez login
🔓 Email_X fez login (1 min depois)
→ Possível ataque? Admin investiga
```

### Caso 3: Rastrear Ações de Moderação
```
Admin vê:
⚠️ Avisei usuário Y
👢 Expulsei usuário Y
🚫 Banir usuário Y
→ Histórico de todas as ações
```

---

## 🚀 Próximas Melhorias Sugeridas

- [ ] Exportar log como CSV
- [ ] Filtrar atividades por tipo
- [ ] Buscar por email/nome
- [ ] Gráficos de atividades (hora do dia, tipo, etc)
- [ ] Notificações em tempo real (push)
- [ ] Log persistente em banco de dados
- [ ] Webhooks para integração com Discord

---

## 📚 Integração com Outras Features

O Activity Log se integra com:

- ✅ **Autenticação** - Registra login/signup
- ✅ **Painel Admin** - Mostra o histórico
- ✅ **Ações Admin** - Registra moderation
- ✅ **localStorage** - Persiste dados
- ✅ **UI/UX** - Display visual bonito

---

**Sistema de Activity Log Implementado com Sucesso!** 🎉

Agora você tem visibilidade total de todas as ações dos usuários em tempo real.
