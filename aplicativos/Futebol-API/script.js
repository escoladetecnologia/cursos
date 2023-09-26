// Função para buscar dados do site
function buscarDadosDoSite() {
    // Use a função fetch para buscar os dados do site
    fetch('https://www.placardefutebol.com.br/')
        .then(response => response.text())
        .then(data => {
            // Aqui você deve analisar o 'data' para extrair os resultados do jogo
            // e criar dinamicamente os cards de jogo
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // Seletores CSS para encontrar os elementos relevantes
            const campeonatoSelector = '.match-card-league-name';
            const tempoJogoSelector = '.badge.badge-success.status-name.blink';
            const time1Selector = '.text-right.team_link';
            const placarTime1Selector = '.badge.badge-default';
            const placarTime2Selector = '.badge.badge-default';
            const time2Selector = '.text-left.team_link';

            // Encontre todos os cards de jogo
            const cardsDeJogo = doc.querySelectorAll('.match-card');

            // Itere sobre os cards de jogo e extraia as informações
            cardsDeJogo.forEach(card => {
                const campeonato = card.querySelector(campeonatoSelector).textContent;
                const tempoJogo = card.querySelector(tempoJogoSelector).textContent;
                const nomeTime1 = card.querySelector(time1Selector).textContent;
                const placarTime1 = card.querySelector(placarTime1Selector).textContent;
                const placarTime2 = card.querySelector(placarTime2Selector).textContent;
                const nomeTime2 = card.querySelector(time2Selector).textContent;

                // Agora, você pode usar essas informações para criar os cards de jogo dinamicamente
                // Por exemplo, você pode criar elementos HTML e adicionar ao DOM
                const cardDeJogo = document.createElement('div');
                cardDeJogo.classList.add('game-card');
                cardDeJogo.innerHTML = `
                    <h2>${campeonato}</h2>
                    <p>Tempo de Jogo: ${tempoJogo}</p>
                    <h5>${nomeTime1} ${placarTime1} - ${placarTime2} ${nomeTime2}</h5>
                    <button class="favorite-button">Favorito</button>
                `;

                // Adicione o card de jogo ao container (substitua 'container' pelo seletor do seu container)
                const container = document.querySelector('.container');
                container.appendChild(cardDeJogo);
            });
        })
        .catch(error => {
            console.error('Ocorreu um erro ao buscar os dados do site:', error);
        });
}

// Chame a função para buscar dados do site
buscarDadosDoSite();
