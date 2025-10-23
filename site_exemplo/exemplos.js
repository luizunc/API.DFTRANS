/**
 * Exemplos de Uso da API DFTrans
 * 
 * Este arquivo contém exemplos práticos de como utilizar
 * os diversos endpoints da API DFTrans.
 */

// ============================================
// CONFIGURAÇÃO BASE
// ============================================

const API_BASE_URL = 'https://www.sistemas.dftrans.df.gov.br';

/**
 * Função auxiliar para fazer requisições GET
 */
async function apiGet(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

// ============================================
// EXEMPLOS - LINHAS
// ============================================

/**
 * Exemplo 1: Buscar informações de uma linha específica
 */
async function exemplo1_buscarLinha() {
  console.log('=== Exemplo 1: Buscar Linha ===');
  
  const numeroLinha = '099.1';
  const linha = await apiGet(`/linha/numero/${numeroLinha}`);
  
  console.log('Número:', linha.numero);
  console.log('Descrição:', linha.descricao);
  console.log('Sentido:', linha.sentido);
  console.log('Tarifa: R$', linha.faixaTarifaria?.tarifa);
  console.log('Operadoras:', linha.operadoras);
  
  return linha;
}

/**
 * Exemplo 2: Buscar linhas que passam por uma parada
 */
async function exemplo2_linhasPorParada() {
  console.log('=== Exemplo 2: Linhas por Parada ===');
  
  const codParada = '3458';
  const linhas = await apiGet(`/linha/parada/codigo/${codParada}`);
  
  console.log(`Total de linhas na parada ${codParada}:`, linhas.length);
  
  linhas.forEach((linha, index) => {
    console.log(`${index + 1}. ${linha.numero} - ${linha.descricao}`);
  });
  
  return linhas;
}

/**
 * Exemplo 3: Buscar linhas entre duas referências
 */
async function exemplo3_linhasEntreReferencias() {
  console.log('=== Exemplo 3: Linhas entre Referências ===');
  
  const tipoOrigem = 'R';
  const seqOrigem = 1234;
  const tipoDestino = 'R';
  const seqDestino = 5678;
  
  const linhas = await apiGet(
    `/linha/${tipoOrigem}/${seqOrigem}/${tipoDestino}/${seqDestino}`
  );
  
  if (linhas.length === 0) {
    console.log('Nenhuma linha direta encontrada.');
    console.log('É necessário fazer integração.');
  } else {
    console.log('Linhas disponíveis:');
    linhas.forEach(linha => {
      console.log(`- ${linha.numero}: ${linha.descricao}`);
      console.log(`  Tarifa: R$ ${linha.faixaTarifaria?.tarifa}`);
    });
  }
  
  return linhas;
}

/**
 * Exemplo 4: Buscar linhas com filtro (autocomplete)
 */
async function exemplo4_buscarLinhasComFiltro() {
  console.log('=== Exemplo 4: Buscar Linhas com Filtro ===');
  
  const termo = '099';
  const limite = 10;
  
  const linhas = await apiGet(`/linha/find/${termo}/${limite}`);
  
  console.log(`Linhas encontradas para "${termo}":`);
  linhas.forEach(linha => {
    console.log(`- ${linha.numero}: ${linha.descricao}`);
  });
  
  return linhas;
}

// ============================================
// EXEMPLOS - PARADAS
// ============================================

/**
 * Exemplo 5: Buscar informações de uma parada
 */
async function exemplo5_buscarParada() {
  console.log('=== Exemplo 5: Buscar Parada ===');
  
  const codParada = '3458';
  const parada = await apiGet(`/parada/cod/${codParada}`);
  
  console.log('Código:', parada.codDftrans);
  console.log('Descrição:', parada.descricao);
  console.log('Sentido:', parada.sentido);
  console.log('Coordenadas:', `${parada.latitude}, ${parada.longitude}`);
  
  return parada;
}

/**
 * Exemplo 6: Buscar todas as paradas (GeoJSON)
 */
async function exemplo6_todasParadas() {
  console.log('=== Exemplo 6: Todas as Paradas (GeoJSON) ===');
  
  const geojson = await apiGet('/parada/geo/paradas');
  
  console.log('Tipo:', geojson.type);
  console.log('Total de paradas:', geojson.features.length);
  
  // Mostrar as primeiras 5 paradas
  console.log('Primeiras 5 paradas:');
  geojson.features.slice(0, 5).forEach(feature => {
    const props = feature.properties;
    const coords = feature.geometry.coordinates;
    console.log(`- ${props.codDftrans}: ${props.descricao}`);
    console.log(`  Coordenadas: [${coords[0]}, ${coords[1]}]`);
  });
  
  return geojson;
}

/**
 * Exemplo 7: Buscar paradas de uma linha específica
 */
async function exemplo7_paradasDaLinha() {
  console.log('=== Exemplo 7: Paradas de uma Linha ===');
  
  const seqLinha = 123;
  const geojson = await apiGet(`/parada/geo/paradas/linha/${seqLinha}`);
  
  console.log('Total de paradas na linha:', geojson.features.length);
  
  geojson.features.forEach((feature, index) => {
    const props = feature.properties;
    console.log(`${index + 1}. ${props.codDftrans} - ${props.descricao}`);
  });
  
  return geojson;
}

// ============================================
// EXEMPLOS - HORÁRIOS
// ============================================

/**
 * Exemplo 8: Buscar horários de uma linha
 */
async function exemplo8_horariosLinha() {
  console.log('=== Exemplo 8: Horários de uma Linha ===');
  
  const numeroLinha = '099.1';
  const horarios = await apiGet(`/horario/linha/numero/${numeroLinha}`);
  
  console.log(`Horários da linha ${numeroLinha}:`);
  
  horarios.horarios?.forEach(h => {
    console.log(`\n${h.diaSemana} - ${h.turno}:`);
    console.log(h.horarios.join(', '));
  });
  
  return horarios;
}

/**
 * Exemplo 9: Filtrar horários por dia e turno
 */
async function exemplo9_filtrarHorarios() {
  console.log('=== Exemplo 9: Filtrar Horários ===');
  
  const numeroLinha = '099.1';
  const diaBusca = 'SEGUNDA';
  const turnoBusca = 'Manhã';
  
  const horarios = await apiGet(`/horario/linha/numero/${numeroLinha}`);
  
  const horariosFiltrados = horarios.horarios?.filter(h => 
    h.diaSemana === diaBusca && h.turno === turnoBusca
  );
  
  console.log(`Horários de ${diaBusca} - ${turnoBusca}:`);
  horariosFiltrados?.forEach(h => {
    console.log(h.horarios.join(', '));
  });
  
  return horariosFiltrados;
}

// ============================================
// EXEMPLOS - ITINERÁRIOS
// ============================================

/**
 * Exemplo 10: Buscar itinerário de uma linha
 */
async function exemplo10_itinerarioLinha() {
  console.log('=== Exemplo 10: Itinerário de uma Linha ===');
  
  const numeroLinha = '099.1';
  const itinerario = await apiGet(`/itinerario/linha/numero/${numeroLinha}`);
  
  console.log('Linha:', itinerario.linha);
  console.log('Sentido:', itinerario.sentido);
  console.log('Origem:', itinerario.origem);
  console.log('Destino:', itinerario.destino);
  console.log('Extensão:', itinerario.extensao, 'km');
  
  console.log('\nTrechos:');
  itinerario.trechos?.forEach(trecho => {
    console.log(`${trecho.sequencia}. ${trecho.descricao}`);
  });
  
  return itinerario;
}

// ============================================
// EXEMPLOS - REFERÊNCIAS
// ============================================

/**
 * Exemplo 11: Buscar referências (autocomplete)
 */
async function exemplo11_buscarReferencias() {
  console.log('=== Exemplo 11: Buscar Referências ===');
  
  let termo = 'Brasília';
  const limite = 10;
  
  // Codificar caractere '/' se necessário
  termo = termo.replace('/', '%26%2347%3B');
  
  const referencias = await apiGet(`/referencia/find/${termo}/${limite}`);
  
  console.log(`Referências encontradas para "${termo}":`);
  referencias.forEach(ref => {
    console.log(`- ${ref.descricao} (ID: ${ref.sequencialRef})`);
    console.log(`  Tipo: ${ref.tipo}`);
  });
  
  return referencias;
}

// ============================================
// EXEMPLOS - ESTAÇÕES
// ============================================

/**
 * Exemplo 12: Buscar informações de uma estação
 */
async function exemplo12_buscarEstacao() {
  console.log('=== Exemplo 12: Buscar Estação ===');
  
  const seqEstacao = 42;
  const estacao = await apiGet(`/estacao/${seqEstacao}`);
  
  console.log('Sequencial:', estacao.seqEstacao);
  console.log('Descrição:', estacao.descricao);
  console.log('Tipo:', estacao.tipo);
  console.log('Coordenadas:', `${estacao.latitude}, ${estacao.longitude}`);
  
  // Identificar tipo de estação
  const tipoEstacao = {
    'B': 'Terminal BRT',
    'M': 'Estação de Metrô',
    'R': 'Terminal Rodoviário'
  };
  console.log('Tipo completo:', tipoEstacao[estacao.tipo] || 'Terminal');
  
  return estacao;
}

/**
 * Exemplo 13: Buscar todas as estações (GeoJSON)
 */
async function exemplo13_todasEstacoes() {
  console.log('=== Exemplo 13: Todas as Estações ===');
  
  const geojson = await apiGet('/estacao/geo/estacoes');
  
  console.log('Total de estações:', geojson.features.length);
  
  // Agrupar por tipo
  const porTipo = {};
  geojson.features.forEach(feature => {
    const tipo = feature.properties.tipo || 'Outro';
    porTipo[tipo] = (porTipo[tipo] || 0) + 1;
  });
  
  console.log('\nEstações por tipo:');
  Object.entries(porTipo).forEach(([tipo, count]) => {
    console.log(`- Tipo ${tipo}: ${count}`);
  });
  
  return geojson;
}

// ============================================
// EXEMPLOS - GPS/VEÍCULOS
// ============================================

/**
 * Exemplo 14: Buscar posição dos veículos em tempo real
 */
async function exemplo14_veiculosTempoReal() {
  console.log('=== Exemplo 14: Veículos em Tempo Real ===');
  
  const numeroLinha = '099.1';
  const geojson = await apiGet(`/gps/linha/${numeroLinha}/geo/recent`);
  
  console.log(`Veículos da linha ${numeroLinha}:`);
  console.log('Total de veículos:', geojson.features.length);
  
  geojson.features.forEach((feature, index) => {
    const props = feature.properties;
    const coords = feature.geometry.coordinates;
    
    console.log(`\nVeículo ${index + 1}:`);
    console.log(`- ID: ${props.veiculo}`);
    console.log(`- Operadora: ${props.operadora}`);
    console.log(`- Velocidade: ${props.velocidade} km/h`);
    console.log(`- Posição: [${coords[0]}, ${coords[1]}]`);
    console.log(`- Timestamp: ${props.timestamp}`);
  });
  
  return geojson;
}

// ============================================
// EXEMPLOS - PERCURSO
// ============================================

/**
 * Exemplo 15: Buscar percurso de uma linha (GeoJSON)
 */
async function exemplo15_percursoLinha() {
  console.log('=== Exemplo 15: Percurso de uma Linha ===');
  
  const seqLinha = 123;
  const geojson = await apiGet(`/percurso/linha/${seqLinha}`);
  
  console.log('Tipo:', geojson.type);
  console.log('Features:', geojson.features.length);
  
  geojson.features.forEach(feature => {
    const props = feature.properties;
    const coords = feature.geometry.coordinates;
    
    console.log('\nPercurso:');
    console.log('- Linha:', props.linha);
    console.log('- Sentido:', props.sentido);
    console.log('- Total de pontos:', coords.length);
  });
  
  return geojson;
}

// ============================================
// EXEMPLOS - INTEGRAÇÃO
// ============================================

/**
 * Exemplo 16: Buscar áreas de integração
 */
async function exemplo16_areasIntegracao() {
  console.log('=== Exemplo 16: Áreas de Integração ===');
  
  const tipoOrigem = 'R';
  const seqOrigem = 1234;
  const tipoDestino = 'R';
  const seqDestino = 5678;
  
  const areas = await apiGet(
    `/areaintegracao/${tipoOrigem}/${seqOrigem}/${tipoDestino}/${seqDestino}`
  );
  
  console.log('Áreas de integração disponíveis:', areas.length);
  
  areas.forEach((area, index) => {
    console.log(`\n${index + 1}. ${area.descricao}`);
    console.log(`   Sequencial: ${area.sequencial}`);
  });
  
  return areas;
}

// ============================================
// EXEMPLOS - CASOS DE USO COMPLEXOS
// ============================================

/**
 * Exemplo 17: Planejamento de viagem completo
 */
async function exemplo17_planejamentoViagem() {
  console.log('=== Exemplo 17: Planejamento de Viagem ===');
  
  const codParadaOrigem = '3458';
  const codParadaDestino = '9637';
  
  // 1. Buscar informações das paradas
  console.log('\n1. Buscando informações das paradas...');
  const paradaOrigem = await apiGet(`/parada/cod/${codParadaOrigem}`);
  const paradaDestino = await apiGet(`/parada/cod/${codParadaDestino}`);
  
  console.log('Origem:', paradaOrigem.descricao);
  console.log('Destino:', paradaDestino.descricao);
  
  // 2. Buscar linhas que passam em cada parada
  console.log('\n2. Buscando linhas disponíveis...');
  const linhasOrigem = await apiGet(`/linha/parada/codigo/${codParadaOrigem}`);
  const linhasDestino = await apiGet(`/linha/parada/codigo/${codParadaDestino}`);
  
  // 3. Encontrar linhas em comum (diretas)
  console.log('\n3. Verificando linhas diretas...');
  const linhasDiretas = linhasOrigem.filter(lo => 
    linhasDestino.some(ld => ld.numero === lo.numero)
  );
  
  if (linhasDiretas.length > 0) {
    console.log('Linhas diretas encontradas:');
    linhasDiretas.forEach(linha => {
      console.log(`- ${linha.numero}: ${linha.descricao}`);
    });
    
    // 4. Buscar horários da primeira linha direta
    const primeiraLinha = linhasDiretas[0];
    console.log(`\n4. Horários da linha ${primeiraLinha.numero}:`);
    const horarios = await apiGet(`/horario/linha/numero/${primeiraLinha.numero}`);
    
    // Mostrar horários de hoje
    const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long' }).toUpperCase();
    const horariosHoje = horarios.horarios?.filter(h => 
      h.diaSemana.includes(hoje.substring(0, 3))
    );
    
    console.log(`Horários de hoje (${hoje}):`);
    horariosHoje?.forEach(h => {
      console.log(`${h.turno}: ${h.horarios.slice(0, 5).join(', ')}...`);
    });
  } else {
    console.log('Nenhuma linha direta encontrada.');
    console.log('É necessário fazer integração.');
  }
  
  return {
    origem: paradaOrigem,
    destino: paradaDestino,
    linhasDiretas
  };
}

/**
 * Exemplo 18: Monitoramento de veículos com atualização
 */
async function exemplo18_monitoramentoVeiculos() {
  console.log('=== Exemplo 18: Monitoramento de Veículos ===');
  
  const numeroLinha = '099.1';
  let contador = 0;
  const maxAtualizacoes = 3;
  
  // Função para buscar e exibir posição dos veículos
  async function atualizarPosicoes() {
    contador++;
    console.log(`\nAtualização ${contador}/${maxAtualizacoes}`);
    console.log('Timestamp:', new Date().toLocaleTimeString());
    
    const geojson = await apiGet(`/gps/linha/${numeroLinha}/geo/recent`);
    
    console.log(`Total de veículos: ${geojson.features.length}`);
    
    geojson.features.forEach((feature, index) => {
      const props = feature.properties;
      const coords = feature.geometry.coordinates;
      
      console.log(`Veículo ${props.veiculo}: [${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}] - ${props.velocidade} km/h`);
    });
    
    if (contador < maxAtualizacoes) {
      console.log('\nAguardando 30 segundos para próxima atualização...');
      setTimeout(atualizarPosicoes, 30000);
    } else {
      console.log('\nMonitoramento finalizado.');
    }
  }
  
  // Iniciar monitoramento
  await atualizarPosicoes();
}

// ============================================
// FUNÇÃO PARA EXECUTAR TODOS OS EXEMPLOS
// ============================================

/**
 * Executa todos os exemplos em sequência
 */
async function executarTodosExemplos() {
  console.log('========================================');
  console.log('EXEMPLOS DE USO DA API DFTRANS');
  console.log('========================================\n');
  
  try {
    await exemplo1_buscarLinha();
    console.log('\n');
    
    await exemplo2_linhasPorParada();
    console.log('\n');
    
    await exemplo4_buscarLinhasComFiltro();
    console.log('\n');
    
    await exemplo5_buscarParada();
    console.log('\n');
    
    await exemplo8_horariosLinha();
    console.log('\n');
    
    await exemplo11_buscarReferencias();
    console.log('\n');
    
    console.log('========================================');
    console.log('EXEMPLOS EXECUTADOS COM SUCESSO!');
    console.log('========================================');
  } catch (error) {
    console.error('Erro ao executar exemplos:', error);
  }
}

// ============================================
// EXPORTAR FUNÇÕES (para uso em módulos)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    exemplo1_buscarLinha,
    exemplo2_linhasPorParada,
    exemplo3_linhasEntreReferencias,
    exemplo4_buscarLinhasComFiltro,
    exemplo5_buscarParada,
    exemplo6_todasParadas,
    exemplo7_paradasDaLinha,
    exemplo8_horariosLinha,
    exemplo9_filtrarHorarios,
    exemplo10_itinerarioLinha,
    exemplo11_buscarReferencias,
    exemplo12_buscarEstacao,
    exemplo13_todasEstacoes,
    exemplo14_veiculosTempoReal,
    exemplo15_percursoLinha,
    exemplo16_areasIntegracao,
    exemplo17_planejamentoViagem,
    exemplo18_monitoramentoVeiculos,
    executarTodosExemplos
  };
}
