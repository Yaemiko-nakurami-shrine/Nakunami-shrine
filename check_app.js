// Script de teste para verificar se app.js está carregando
console.log("Verificando if app.js foi carregado");

// Verificar funções críticas
const funcs = [
    'switchSocialTab',
    'loadFeed', 
    'loadUserProfile',
    'loadFollowers',
    'loadExplore',
    'createPost',
    'handleLogin',
    'handleSignUp'
];

funcs.forEach(f => {
    console.log(`${f}: ${typeof window[f] === 'function' ? '✓' : '✗'}`);
});
