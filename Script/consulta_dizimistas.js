import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Função para carregar os dizimistas na tabela
window.carregarDizimistas = async function carregarDizimistas() {
    const tabela = document.getElementById("tabelaDizimistas");
    tabela.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

    const querySnapshot = await getDocs(collection(db, "dizimistas"));

    querySnapshot.forEach((doc) => {
        const dados = doc.data();
        const row = `<tr>
            <td>${dados.codigo}</td>
            <td>${dados.nome}</td>
            <td>${dados.dataNascimento}</td>
            <td>${dados.endereco}, ${dados.numero} - ${dados.bairro}, ${dados.cidade} - ${dados.estado}</td>
            <td>${dados.telefone}</td>
            <td>${dados.celular}</td>
            <td>${dados.comunidade}</td>
            <td>${dados.paroquia}</td>
        </tr>`;
        tabela.innerHTML += row;
    });
}

// Carrega os dados ao abrir a página
window.onload = carregarDizimistas;