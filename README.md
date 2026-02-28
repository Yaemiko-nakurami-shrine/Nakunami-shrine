# Nakunami-shrine 🦊⚡

Um santuário temático de Yae Miko do Genshin Impact com **sistema de autenticação com roles (papéis)**!

## ✨ Destaques

- 🎭 **Sistema de Roles** - 3 níveis: Visitante, Membro e Administrador
- 🔐 **Autenticação** - Login e Sign Up direto no site (cada abertura registra um `console.log` para debug)
- 👑 **Painel Admin** - Exclusivo para `damiensoaresbrito@gmail.com`
- ⚡ **Animações** - Efeitos Electro e Thunder do Genshin Impact
- 📱 **Responsivo** - Funciona em desktop e mobile

## 🚀 Começando

### Credenciais de Teste

**Admin (acesso completo):**
```
Email: damiensoaresbrito@gmail.com
Senha: admin123
```

**Usuário Regular:**
```
Email: miko@shrine.jp
Senha: kitsune123
```
> **Dica:** o endereço de e‑mail é comparado de forma *case‑insensitive* e espaços extras são removidos automaticamente — digite tudo em minúsculas e sem espaços.

## 👥 Sistema de Roles

### Níveis de Acesso:

| Papel | Acesso | Painel Admin |
|-------|--------|-------------|
| 👤 Visitante | Básico | ❌ |
| ⭐ Membro | Padrão | ❌ |
| 🦊 Administrador | Total | ✅ |

## 🛡️ Funcionalidades Admin

- 📋 Ver todos os usuários
- ✏️ Alterar papéis de usuários
- 🗑️ Deletar usuários
- ⚠️ Avisar usuários
- 👢 Expulsar usuários
- 🚫 Banir usuários
- 🔄 Resetar dados do sistema

## ⌨️ Atalhos

- `Ctrl + Shift + A` - Abrir/Fechar painel admin (somente para admins)

## 📂 Estrutura de Arquivos

```
Nakunami-shrine/
├── index.html       # Página principal
├── style.css        # Estilos
├── app.js           # Lógica de autenticação e roles
└── README.md        # Este arquivo
```

## 🔍 Documentação Completa

Para documentação detalhada sobre o sistema de roles, veja [SYSTEM_DOCS.md](SYSTEM_DOCS.md)

## 🎮 Como Usar

1. Abra `index.html` no navegador
2. Clique em "🔐 Login"
3. Faça login com as credenciais de teste
4. Se for admin, acesse o painel (🦊 canto superior direito)

## 💾 Dados Armazenados

- ✅ localStorage (navegador local)
- ✅ Sem servidor necessário
- ⚠️ Não use em produção (dados em texto plano)

## 🎨 Tema

Inspirado em Yae Miko e no Santuário Narukami do Genshin Impact:
- 🔵 Cores Electro (Roxo/Azul)
- 🌸 Cores Sakura (Rosa/Rosa claro)
- ⚡ Efeitos de raio
- 🦊 Temática de raposa

## 📝 Licença

Projeto temático - Use como desejar! 🦊

---

**Desenvolvido com ❤️ para o Santuário Nakunami**