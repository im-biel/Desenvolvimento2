// Temporadas

const seasonsData = [
    {
      month: 1,
      year: 2024,
      title: 'Temporada 1',
      jogadores: [
        // Gols
        { nome: 'Kristofer', categoria: 'gols', valor: 18 },
  
        // Assistências
        { nome: 'Maria', categoria: 'assistencias', valor: 15 },
  
        // Vitórias
        { nome: 'Ana', categoria: 'vitorias', valor: 5 },
  
        // Partidas Jogadas
        { nome: 'Pedro', categoria: 'partidasJogadas', valor: 20 },
  
        // Partidas Sem Sofrer Gols
        { nome: 'Pedro', categoria: 'jogosSemSofrerGols', valor: 20 },
  
      ]
    },
    {
      month: 2,
      year: 2024,
      title: 'Temporada 2',
      jogadores: [
        // Gols
        
        // Assistências
        
        // Vitórias
        
        // Partidas Jogadas
        
        // Partidas Sem Sofrer Gols
        
      ]
    },
    
  ];
  
  function generateSeasonCards(month, year, category) {
    // Filtrar as temporadas baseadas no mês e ano selecionados
    let filteredSeasons = seasonsData;
  
    if (month !== 0) {
      filteredSeasons = filteredSeasons.filter(season => season.month === month);
    }
    if (year !== 0) {
      filteredSeasons = filteredSeasons.filter(season => season.year === year);
    }
  
    // Selecionar o contêiner onde os cards serão inseridos
    const seasonCardsContainer = document.getElementById('seasonCards');
    seasonCardsContainer.innerHTML = ''; // Limpar conteúdo existente
  
    // Iterar sobre as temporadas filtradas e criar os cards dinamicamente
    filteredSeasons.forEach(season => {
      const jogadoresFiltrados = season.jogadores.filter(jogador => jogador.categoria === category);
  
      if (jogadoresFiltrados.length > 0) {
        const cardHtml = `
          <div class="col-md-4 mb-4">
            <div class="card card-season">
              <div class="card-body">
                <h5 class="card-title">${season.title}</h5>
                ${jogadoresFiltrados.map((jogador, index) => `
                  <p class="card-text">${index + 1}º | ${jogador.nome}: ${jogador.valor}</p>
                `).join('')}
              </div>
            </div>
          </div>
        `;
        seasonCardsContainer.insertAdjacentHTML('beforeend', cardHtml);
      }
    });
  
    // Se não houver temporadas para o filtro selecionado, exibir mensagem
    if (filteredSeasons.length === 0 || seasonCardsContainer.innerHTML === '') {
      seasonCardsContainer.innerHTML = '<p class="text-center">Nenhuma temporada encontrada para este filtro.</p>';
    }
  }
  
  document.getElementById('seasonForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar o envio padrão do formulário
  
    const selectedMonth = parseInt(document.getElementById('selectMonth').value);
    const selectedYear = parseInt(document.getElementById('selectYear').value);
    const selectedCategory = document.getElementById('selectCategory').value;
  
    generateSeasonCards(selectedMonth, selectedYear, selectedCategory);
  });
  
  // Inicialmente, gerar os cards com todos os dados
  generateSeasonCards(0, 0, 'gols');

// Redirecionamento de página

// Função para navegar entre as seções e controlar a visibilidade
function navigateToSection(sectionId) {
    // Atualizar a URL sem recarregar a página
    history.pushState(null, '', sectionId);

    // Esconder todas as seções principais
    $('.content-section').hide();

    // Mostrar a seção correspondente com base no ID
    if (sectionId === '#section-nossas-salas') {
      $('#section-nossas-salas').show();

    } else if (sectionId === '#section-temporadas') {
      $('#section-temporadas').show();

    } else if (sectionId === '#section-anuncios') {
      $('#section-anuncios').show();

    } else if (sectionId === '#section-atualizacoes') {
      $('#section-atualizacoes').show();

    } else if (sectionId === '#section-campeonatos') {
      $('#section-campeonatos').show();

    } else if (sectionId === '#section-sejavip') {
      $('#section-sejavip').show();
    }

    // Caso especial 
    if (sectionId === '#section-anuncios') {
      $('#section-anuncios').show();
      $('#section-atualizacoes').show();
    } else if (sectionId === '#section-atualizacoes') {
      $('#section-anuncios').show();
      $('#section-atualizacoes').show();

    }
  }


  // Adicionar eventos de clique aos elementos para navegar entre seções
  $(document).ready(function () {
    $('#nossas-salas').click(function () {
      navigateToSection('#section-nossas-salas');
    });

    $('#temporadas').click(function () {
      navigateToSection('#section-temporadas');
    });

    $('#anuncios').click(function () {
      navigateToSection('#section-anuncios');
    });

    $('#atualizacoes').click(function () {
      navigateToSection('#section-atualizacoes');
    });

    $('#campeonatos').click(function () {
      navigateToSection('#section-campeonatos');
    });

    $('#sejavip').click(function () {
      navigateToSection('#section-sejavip');
    });

    // Verificar a URL atual ao carregar a página
    const currentPath = window.location.hash;
    if (currentPath) {
      navigateToSection(currentPath);
    } else {
      // Mostrar uma seção padrão se não houver hash na URL
      $('#section-nossas-salas').show();
    }
  });
  