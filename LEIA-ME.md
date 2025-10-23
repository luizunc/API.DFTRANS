# Documentação da API DFTrans

> **Comece aqui!** Este é o ponto de entrada da documentação.

## Bem-vindo!

Esta pasta contém a **documentação completa** da API DFTrans para fornecer informações sobre o transporte público do Distrito Federal.

---

## O que você encontrará aqui?

### Documentação Completa
- **[README.md](README.md)** - Documentação detalhada com todos os endpoints
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Guia rápido para consultas
- **[TIPOS_DE_DADOS.md](TIPOS_DE_DADOS.md)** - Estruturas de dados e tipos
- **[INDEX.md](INDEX.md)** - Índice geral e guia de navegação

### Exemplos Práticos
- **[exemplos.js](site_exemplo/exemplos.js)** - 18 exemplos em JavaScript
- **[exemplo.html](site_exemplo/exemplo.html)** - Página interativa de demonstração

---

## Início Rápido

### 1. Para Testar Visualmente
Abra o arquivo **[exemplo.html](site_exemplo/exemplo.html)** no seu navegador e teste a API interativamente!

### 2. Para Consultar Endpoints
Veja o **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** para uma referência rápida.

### 3. Para Copiar Código
Use os exemplos prontos em **[exemplos.js](site_exemplo/exemplos.js)**.

---

## Exemplos Rápidos

### Buscar uma linha
```javascript
fetch('https://www.sistemas.dftrans.df.gov.br/linha/numero/099.1')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Buscar linhas de uma parada
```javascript
fetch('https://www.sistemas.dftrans.df.gov.br/linha/parada/codigo/3458')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Buscar horários
```javascript
fetch('https://www.sistemas.dftrans.df.gov.br/horario/linha/numero/099.1')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## Recursos Disponíveis

| Recurso | Descrição | Arquivo |
|---------|-----------|---------|
| **Linhas** | Informações sobre linhas de ônibus | [README.md](README.md#linhas) |
| **Paradas** | Localização e dados de paradas | [README.md](README.md#paradas) |
| **Horários** | Horários de partida das linhas | [README.md](README.md#horários) |
| **Itinerários** | Percurso detalhado das linhas | [README.md](README.md#itinerários) |
| **Referências** | Pontos de interesse | [README.md](README.md#referências) |
| **Estações** | Terminais e estações de metrô | [README.md](README.md#estações) |
| **Integração** | Áreas de integração | [README.md](README.md#áreas-de-integração) |
| **Bicicletários** | Localização de bicicletários | [README.md](README.md#bicicletários) |
| **Postos SBA** | Postos de atendimento | [README.md](README.md#postos-sba) |
| **GPS** | Posição de veículos em tempo real | [README.md](README.md#gpsveículos) |

---

## Links Úteis

### Documentação
- [Documentação Completa](README.md)
- [Guia Rápido](QUICK_REFERENCE.md)
- [Tipos de Dados](TIPOS_DE_DADOS.md)
- [Índice Geral](INDEX.md)

### Exemplos
- [Exemplos JavaScript](site_exemplo/exemplos.js)
- [Página de Demonstração](site_exemplo/exemplo.html)

### API
- **Base URL:** https://www.sistemas.dftrans.df.gov.br
- **Formato:** JSON / GeoJSON
- **Autenticação:** Não requerida
- **CORS:** Habilitado

---

## Estrutura dos Arquivos

```
API/
├── LEIA-ME.md              ← Você está aqui!
├── INDEX.md                ← Índice geral e navegação
├── README.md               ← Documentação completa
├── QUICK_REFERENCE.md      ← Referência rápida
├── TIPOS_DE_DADOS.md       ← Estruturas de dados
└── site_exemplo/           ← Site de exemplos
    ├── exemplo.html        ← Página de demonstração
    ├── exemplo.css         ← Estilos da página
    └── exemplos.js         ← 18 exemplos em JavaScript
```

---

## Casos de Uso Comuns

### Buscar informações de transporte
```javascript
// Buscar linha específica
const linha = await fetch(
  'https://www.sistemas.dftrans.df.gov.br/linha/numero/099.1'
).then(r => r.json());

console.log(linha.descricao);
console.log('Tarifa: R$', linha.faixaTarifaria.tarifa);
```

### Exibir paradas no mapa
```javascript
// Buscar todas as paradas (GeoJSON)
const paradas = await fetch(
  'https://www.sistemas.dftrans.df.gov.br/parada/geo/paradas'
).then(r => r.json());

// Usar com OpenLayers, Leaflet, etc.
paradas.features.forEach(feature => {
  const [lon, lat] = feature.geometry.coordinates;
  console.log(feature.properties.descricao, lat, lon);
});
```

### Consultar próximos horários
```javascript
// Buscar horários da linha
const horarios = await fetch(
  'https://www.sistemas.dftrans.df.gov.br/horario/linha/numero/099.1'
).then(r => r.json());

// Filtrar por dia e turno
const hoje = 'SEGUNDA';
const turno = 'Manhã';

const horariosHoje = horarios.horarios.filter(h => 
  h.diaSemana === hoje && h.turno === turno
);

console.log('Próximos horários:', horariosHoje[0].horarios);
```

### Rastrear veículos
```javascript
// Buscar posição dos veículos
const veiculos = await fetch(
  'https://www.sistemas.dftrans.df.gov.br/gps/linha/099.1/geo/recent'
).then(r => r.json());

veiculos.features.forEach(veiculo => {
  const props = veiculo.properties;
  console.log(`Veículo ${props.veiculo}: ${props.velocidade} km/h`);
});
```

---

## Notas Importantes

### 1. Formato de Coordenadas
Em GeoJSON, as coordenadas são sempre **[longitude, latitude]**, não [latitude, longitude].

```javascript
// Correto
const coords = [-47.8978, -15.8267]; // [lon, lat]

// Incorreto
const coords = [-15.8267, -47.8978]; // [lat, lon]
```

### 2. Codificação de Caracteres
O caractere `/` deve ser codificado como `%26%2347%3B` em termos de busca.

```javascript
const termo = 'Brasília/Taguatinga';
const encoded = termo.replace('/', '%26%2347%3B');
// Resultado: 'Brasília%26%2347%3BTaguatinga'
```

### 3. CORS Habilitado
A API permite requisições de qualquer origem, facilitando o uso em aplicações web.

### 4. Sem Autenticação
Não é necessário API key ou token de autenticação.

---

## Aprenda Mais

### Para Iniciantes
1. Comece com o [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
2. Teste com [exemplo.html](site_exemplo/exemplo.html)
3. Copie código de [exemplos.js](site_exemplo/exemplos.js)

### Para Desenvolvedores
1. Leia o [README.md](README.md) completo
2. Implemente tipagem com [TIPOS_DE_DADOS.md](TIPOS_DE_DADOS.md)
3. Adapte os exemplos de [site_exemplo/exemplos.js](site_exemplo/exemplos.js) para seu projeto

### Para Arquitetos de Software
1. Entenda a estrutura em [INDEX.md](INDEX.md)
2. Planeje integração com base nos tipos de dados
3. Implemente cache e tratamento de erros

---

## Ferramentas Recomendadas

### Bibliotecas de Mapas
- **OpenLayers** - Biblioteca de mapas popular
- **Leaflet** - Alternativa leve e popular
- **Mapbox GL JS** - Mapas modernos e performáticos

### Cliente HTTP
- **Fetch API** - Nativo do navegador (recomendado)
- **Axios** - Cliente HTTP com mais recursos
- **jQuery.ajax** - Para projetos legados

### TypeScript
Use as interfaces definidas em [TIPOS_DE_DADOS.md](TIPOS_DE_DADOS.md) para tipagem forte.

---

## Suporte

### Problemas com a API?
A API é mantida pela **DFTrans** (Governo do Distrito Federal).

### Problemas com a Documentação?
Entre em contato com o desenvolvedor desta documentação.

### Dúvidas sobre Uso?
Consulte:
1. [INDEX.md](INDEX.md) - Índice geral
2. [README.md](README.md) - Documentação completa
3. [exemplos.js](site_exemplo/exemplos.js) - Exemplos práticos

---

## Próximos Passos

1. Abra [exemplo.html](site_exemplo/exemplo.html) e teste a API
2. Leia [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
3. Copie código de [exemplos.js](site_exemplo/exemplos.js)
4. Consulte [README.md](README.md) quando necessário
5. Use [TIPOS_DE_DADOS.md](TIPOS_DE_DADOS.md) para tipagem

---

## Recursos da Documentação

- **21 endpoints** documentados
- **18 exemplos** práticos em JavaScript
- **Página HTML** interativa de demonstração
- **Guia rápido** para consultas
- **Tipos de dados** completos com TypeScript
- **Índice geral** para fácil navegação

---

## Destaques

### Pronto para Produção
Todos os exemplos são testados e prontos para uso em produção.

### Interface Visual
Página HTML com design moderno para testar a API visualmente.

### Documentação Completa
Cobertura de 100% dos endpoints da API DFTrans.

### Exemplos Práticos
18 exemplos cobrindo desde casos simples até complexos.

### Fácil Navegação
Índice detalhado e links cruzados entre documentos.

---

## Comece Agora!

**Escolha seu caminho:**

- **Quero testar rapidamente** - Abra [exemplo.html](site_exemplo/exemplo.html)
- **Quero ler a documentação** - Veja [README.md](README.md)
- **Quero uma referência rápida** - Consulte [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- **Quero copiar código** - Use [exemplos.js](site_exemplo/exemplos.js)
- **Quero entender tudo** - Comece pelo [INDEX.md](INDEX.md)

---

**Boa sorte com seu projeto!**

---

**API DFTrans - Distrito Federal**  
**Documentação criada em 2024**
