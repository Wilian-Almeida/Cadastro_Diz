// Importar o Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, getDocs, orderBy, limit} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração do Firebase (Substitua pelos dados do seu projeto)
const firebaseConfig = {
    apiKey: "AIzaSyACTuTtdlQo-eyX0ToONCidQYAxywiQ25s",
    authDomain: "caddizimistas.firebaseapp.com",
    projectId: "caddizimistas",
    storageBucket: "caddizimistas.firebasestorage.app",
    messagingSenderId: "1007083965228",
    appId: "1:1007083965228:web:7b0e5538d81187404d7a89"
};

async function gerarCodigoUnico() {
    const q = query(collection(db, "dizimistas"), orderBy("codigo", "desc"), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        let ultimoCodigo = querySnapshot.docs[0].data().codigo;
        let numero = parseInt(ultimoCodigo.replace("DIZI-", "")) + 1;
        return `DIZI-${String(numero).padStart(4, "0")}`;
    } else {
        return "DIZI-0001"; // Primeiro cadastro
    }
}

// Inicializar Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Capturar o formulário e enviar os dados para o Firestore
document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Coletando os dados do formulário
    const comunidade = document.getElementById("comunidade").value;
    const paroquia = document.getElementById("paroquia").value;
    const nome = document.getElementById("nome").value;
    const dataNascimento = document.getElementById("data_nascimento").value;
    const endereco = document.getElementById("endereco").value;
    const numero = document.getElementById("numero").value;
    const bairro = document.getElementById("bairro").value;
    const cep = document.getElementById("cep").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const telefone = document.getElementById("telefone").value;
    const celular = document.getElementById("celular").value;
    const anoFicha = document.getElementById("ano_ficha").value;
    const anoInscricao = document.getElementById("ano_inscricao").value;
    const status = document.getElementById("status").value;

    // Gerar código único
    let codigoUnico = await gerarCodigoUnico();

    try {
        const docRef = await addDoc(collection(db, "dizimistas"), {
            codigo: codigoUnico,
            comunidade,
            paroquia,
            nome,
            dataNascimento,
            endereco,
            numero,
            bairro,
            cep,
            cidade,
            estado,
            telefone,
            celular,
            anoFicha,
            anoInscricao,
            status
        });

        alert(`Cadastro realizado! Código: ${codigoUnico}`);
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar. Tente novamente.");
    }
});