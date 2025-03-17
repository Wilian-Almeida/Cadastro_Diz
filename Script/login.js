// Importa Firebase Authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyACTuTtdlQo-eyX0ToONCidQYAxywiQ25s",
    authDomain: "caddizimistas.firebaseapp.com",
    projectId: "caddizimistas",
    storageBucket: "caddizimistas.firebasestorage.app",
    messagingSenderId: "1007083965228",
    appId: "1:1007083965228:web:7b0e5538d81187404d7a89"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Captura o formulário de login
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            alert("Login bem-sucedido!");
            window.location.href = "principal.html"; // Redireciona para a página principal
        })
        .catch((error) => {
            alert("Erro no login: " + error.message);
        });
});