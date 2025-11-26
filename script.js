const cardContainer = document.getElementById("card-container");
const searchInput = document.getElementById("search-input");
let todosOsDados = []; // Armazena todos os dados do JSON

// Função para renderizar os cards na tela
function renderizarCards(dadosParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards

    dadosParaRenderizar.forEach(dado => {
        const article = document.createElement("article");
        article.className = "card";
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    });
}

// Função chamada pelo botão "Buscar"
function iniciarBusca() {
    const termoBusca = searchInput.value.toLowerCase();
    // Filtra os dados com base apenas no nome
    const dadosFiltrados = todosOsDados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca)
    );
    renderizarCards(dadosFiltrados); // Renderiza apenas os cards filtrados
}
// Carrega os dados do JSON assim que a página é carregada
window.addEventListener('DOMContentLoaded', async () => {
    const resposta = await fetch("data.json");
    todosOsDados = await resposta.json();
    renderizarCards(todosOsDados); // Exibe todos os cards inicialmente

    // Adiciona um evento para acionar a busca com a tecla "Enter"
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            iniciarBusca();
        }
    });
});