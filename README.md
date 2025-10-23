# Documentação da API DFTrans

## Índice

- [Visão Geral](#visão-geral)
- [Base URL](#base-url)
- [Endpoints](#endpoints)
  - [Linhas](#linhas)
  - [Paradas](#paradas)
  - [Horários](#horários)
  - [Itinerários](#itinerários)
  - [Referências](#referências)
  - [Estações](#estações)
  - [Áreas de Integração](#áreas-de-integração)
  - [Bicicletários](#bicicletários)
  - [Postos SBA](#postos-sba)
  - [GPS/Veículos](#gpsveículos)
  - [Percurso](#percurso)
- [Exemplos de Uso](#exemplos-de-uso)
- [Notas Importantes](#notas-importantes)

---

## Visão Geral

A API DFTrans fornece acesso a informações sobre o sistema de transporte público do Distrito Federal, incluindo linhas de ônibus, paradas, horários, itinerários, estações e muito mais.

Esta API é utilizada pelo sistema **ParadaEmDia** para fornecer informações em tempo real aos usuários.

---

## Base URL

```
https://www.sistemas.dftrans.df.gov.br
```

**Protocolo:** HTTPS  
**Formato de Resposta:** JSON / GeoJSON

---

## Endpoints

### Linhas

#### 1. Buscar Linha por Número

Retorna informações detalhadas de uma linha específica pelo seu número.

**Endpoint:**
```
GET /linha/numero/{numeroLinha}
```

**Parâmetros:**
- `numeroLinha` (string): Número da linha (ex: "099.1", "100.1")

**Exemplo de Requisição:**
```javascript
fetch('https://www.sistemas.dftrans.df.gov.br/linha/numero/099.1')
  .then(response => response.json())
  .then(data => console.log(data));
```

**Exemplo de Resposta:**
```json
{
  "sequencial": 123,
  "numero": "099.1",
  "descricao": "RODOVIÁRIA DO PLANO PILOTO / CEILÂNDIA (P SUL)",
  "sentido": "IDA",
  "faixaTarifaria": {
    "tarifa": 5.50
  },
  "operadoras": ["URBI", "PIONEIRA"]
}
```

---

#### 2. Buscar Linhas por Referência

Retorna linhas que passam entre duas referências (origem e destino).

**Endpoint:**
```
GET /linha/{tipoOrigem}/{seqOrigem}/{tipoDestino}/{seqDestino}
```

**Parâmetros:**
- `tipoOrigem` (string): Tipo da origem ("R" para referência, "E" para estação, "P" para parada)
- `seqOrigem` (integer): Sequencial da origem
- `tipoDestino` (string): Tipo do destino
- `seqDestino` (integer): Sequencial do destino

**Exemplo de Requisição:**
```javascript
fetch('https://www.sistemas.dftrans.df.gov.br/linha/R/1234/R/5678')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

#### 3. Buscar Linhas (Filtro)

Busca linhas por termo de pesquisa com limite de resultados.

**Endpoint:**
```
GET /linha/find/{termo}/{limite}
```

**Parâmetros:**
- `termo` (string): Termo de busca (número ou descrição da linha)
- `limite` (integer): Número máximo de resultados

**Exemplo de Requisição:**
```javascript
fetch('https://www.sistemas.dftrans.df.gov.br/linha/find/099/10')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

#### 4. Buscar Linhas por Código de Parada

Retorna todas as linhas que passam por uma parada específica.

**Endpoint:**
```
GET /linha/parada/codigo/{codParada}
```

**Parâmetros:**
- `codParada` (string): Código da parada (ex: "3458")

**Exemplo de Requisição:**
```javascript
fetch('https://www.sistemas.dftrans.df.gov.br/linha/parada/codigo/3458')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

#### 5. Buscar Linhas por Estação

Retorna todas as linhas que passam por uma estação específica.

**Endpoint:**
```
GET /linha/estacao/{seqEstacao}
```

**Parâmetros:**
- `seqEstacao` (integer): Sequencial da estação

---

### Paradas

#### 1. Buscar Parada por Código

Retorna informações detalhadas de uma parada específica.

**Endpoint:**
```
GET /parada/cod/{codParada}
```

**Parâmetros:**
- `codParada` (string): Código da parada

**Exemplo de Requisição:**
```javascript
fetch('https://www.sistemas.dftrans.df.gov.br/parada/cod/3458')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

#### 2. Buscar Todas as Paradas (GeoJSON)

Retorna todas as paradas do sistema em formato GeoJSON.

**Endpoint:**
```
GET /parada/geo/paradas
```

---

#### 3. Buscar Paradas de uma Linha (GeoJSON)

Retorna todas as paradas de uma linha específica em formato GeoJSON.

**Endpoint:**
```
GET /parada/geo/paradas/linha/{seqLinha}
```

**Parâmetros:**
- `seqLinha` (integer): Sequencial da linha

---

### Horários

#### 1. Buscar Horários por Número da Linha

Retorna os horários de uma linha específica.

**Endpoint:**
```
GET /horario/linha/numero/{numeroLinha}
```

**Parâmetros:**
- `numeroLinha` (string): Número da linha

**Exemplo de Requisição:**
```javascript
fetch('https://www.sistemas.dftrans.df.gov.br/horario/linha/numero/099.1')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

#### 2. Buscar Horários por Sequencial da Linha

Retorna os horários de uma linha pelo seu sequencial.

**Endpoint:**
```
GET /horario/linha/{seqLinha}
```

**Parâmetros:**
- `seqLinha` (integer): Sequencial da linha

---

### Itinerários

#### 1. Buscar Itinerário por Número da Linha

Retorna o itinerário detalhado de uma linha.

**Endpoint:**
```
GET /itinerario/linha/numero/{numeroLinha}
```

**Parâmetros:**
- `numeroLinha` (string): Número da linha

---

### Referências

#### 1. Buscar Referências por Termo

Busca referências (pontos de interesse) por termo de pesquisa.

**Endpoint:**
```
GET /referencia/find/{termo}/{limite}
```

**Parâmetros:**
- `termo` (string): Termo de busca
- `limite` (integer): Número máximo de resultados (opcional, padrão: 30)

**Exemplo de Requisição:**
```javascript
fetch('https://www.sistemas.dftrans.df.gov.br/referencia/find/Brasília/30')
  .then(response => response.json())
  .then(data => console.log(data));
```

**Nota:** O caractere `/` deve ser codificado como `%26%2347%3B` (HTML entity).

---

### Estações

#### 1. Buscar Estação por Sequencial

Retorna informações de uma estação específica.

**Endpoint:**
```
GET /estacao/{seqEstacao}
```

**Parâmetros:**
- `seqEstacao` (integer): Sequencial da estação

---

#### 2. Buscar Todas as Estações (GeoJSON)

Retorna todas as estações em formato GeoJSON.

**Endpoint:**
```
GET /estacao/geo/estacoes
```

---

### Áreas de Integração

#### 1. Buscar Áreas de Integração entre Referências

Retorna áreas de integração possíveis entre origem e destino.

**Endpoint:**
```
GET /areaintegracao/{tipoOrigem}/{seqOrigem}/{tipoDestino}/{seqDestino}
```

---

#### 2. Buscar Todas as Áreas de Integração (GeoJSON)

**Endpoint:**
```
GET /areaintegracao/geo/areas
```

---

#### 3. Buscar Área de Integração Específica (GeoJSON)

**Endpoint:**
```
GET /areaintegracao/geo/{seqAreaIntegracao}
```

**Parâmetros:**
- `seqAreaIntegracao` (integer): Sequencial da área de integração

---

### Bicicletários

#### 1. Buscar Todos os Bicicletários (GeoJSON)

Retorna todos os bicicletários em formato GeoJSON.

**Endpoint:**
```
GET /bicicletario/geo/bicicletarios
```

---

### Postos SBA

#### 1. Buscar Todos os Postos SBA (GeoJSON)

Retorna todos os postos de atendimento SBA em formato GeoJSON.

**Endpoint:**
```
GET /postosba/geo/postos
```

---

### GPS/Veículos

#### 1. Buscar Posição Recente dos Veículos de uma Linha (GeoJSON)

Retorna a posição GPS recente dos veículos de uma linha específica.

**Endpoint:**
```
GET /gps/linha/{numeroLinha}/geo/recent
```

**Parâmetros:**
- `numeroLinha` (string): Número da linha

---

### Percurso

#### 1. Buscar Percurso de uma Linha (GeoJSON)

Retorna o traçado geográfico do percurso de uma linha.

**Endpoint:**
```
GET /percurso/linha/{seqLinha}
```

**Parâmetros:**
- `seqLinha` (integer): Sequencial da linha

---

## Exemplos de Uso

### Exemplo 1: Buscar Linhas que Passam por uma Parada

```javascript
async function buscarLinhasPorParada(codParada) {
  try {
    const response = await fetch(
      `https://www.sistemas.dftrans.df.gov.br/linha/parada/codigo/${codParada}`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao buscar linhas');
    }
    
    const linhas = await response.json();
    
    console.log(`Linhas que passam pela parada ${codParada}:`);
    linhas.forEach(linha => {
      console.log(`- ${linha.numero}: ${linha.descricao}`);
    });
    
    return linhas;
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Uso
buscarLinhasPorParada('3458');
```

---

### Exemplo 2: Buscar Horários de uma Linha

```javascript
async function buscarHorariosLinha(numeroLinha) {
  try {
    const response = await fetch(
      `https://www.sistemas.dftrans.df.gov.br/horario/linha/numero/${numeroLinha}`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao buscar horários');
    }
    
    const horarios = await response.json();
    
    console.log(`Horários da linha ${numeroLinha}:`);
    horarios.horarios.forEach(h => {
      console.log(`${h.diaSemana} - ${h.turno}:`);
      console.log(h.horarios.join(', '));
    });
    
    return horarios;
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Uso
buscarHorariosLinha('099.1');
```

---

### Exemplo 3: Buscar Referências com Autocomplete

```javascript
async function buscarReferencias(termo) {
  try {
    // Codificar caractere '/' como HTML entity
    const termoEncoded = termo.replace('/', '%26%2347%3B');
    
    const response = await fetch(
      `https://www.sistemas.dftrans.df.gov.br/referencia/find/${termoEncoded}/10`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao buscar referências');
    }
    
    const referencias = await response.json();
    
    console.log(`Referências encontradas para "${termo}":`);
    referencias.forEach(ref => {
      console.log(`- ${ref.descricao} (ID: ${ref.sequencialRef})`);
    });
    
    return referencias;
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Uso
buscarReferencias('Brasília');
```

---

### Exemplo 4: Integração com jQuery

```javascript
// Buscar linha por número usando jQuery
function pesquisarLinhaPorNumero(numeroLinha) {
  $.get(
    'https://www.sistemas.dftrans.df.gov.br/linha/numero/' + numeroLinha,
    function(data, status) {
      if (status == 'success') {
        console.log('Linha encontrada:', data);
        console.log('Número:', data.numero);
        console.log('Descrição:', data.descricao);
        console.log('Tarifa: R$', data.faixaTarifaria.tarifa);
      }
    }
  ).fail(function() {
    console.error('Falha na requisição');
  });
}

// Uso
pesquisarLinhaPorNumero('099.1');
```

---

## Notas Importantes

### 1. Codificação de Caracteres Especiais

O caractere `/` (barra) em termos de busca deve ser codificado como `%26%2347%3B` (HTML entity `&#47;`).

**Exemplo:**
```javascript
const termo = "Brasília/Taguatinga";
const termoEncoded = termo.replace('/', '%26%2347%3B');
```

---

### 2. Formato GeoJSON

Endpoints que retornam dados geográficos usam o formato GeoJSON. As coordenadas são sempre `[longitude, latitude]`.

---

### 3. Tipos de Referência

| Tipo | Descrição |
|------|-----------|
| `R` | Referência (ponto de interesse) |
| `E` | Estação (terminal/metrô) |
| `P` | Parada de ônibus |

---

### 4. Tipos de Estação

| Tipo | Descrição |
|------|-----------|
| `B` | Terminal BRT |
| `M` | Estação de Metrô |
| `R` | Terminal Rodoviário |

---

### 5. CORS

A API permite requisições de origens diferentes (CORS habilitado).

---

## Recursos Adicionais

- Sistema ParadaEmDia: Interface web que utiliza esta API
- OpenLayers: Biblioteca de mapas utilizada no projeto
- GeoJSON: Formato padrão para dados geográficos

---

**API DFTrans - Distrito Federal**
