# Tipos de Dados - API DFTrans

## Estruturas de Dados Retornadas pela API

Este documento descreve as estruturas de dados (schemas) retornadas pelos endpoints da API DFTrans.

---

## Linha

Representa uma linha de ônibus.

```typescript
interface Linha {
  sequencial: number;           // ID único da linha
  numero: string;               // Número da linha (ex: "099.1")
  descricao: string;            // Descrição/nome da linha
  sentido: "IDA" | "VOLTA" | "CIRCULAR";
  faixaTarifaria?: {
    tarifa: number;             // Valor da tarifa em reais
  };
  operadoras?: string[];        // Lista de operadoras
}
```

**Exemplo:**
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

## Parada

Representa uma parada de ônibus.

```typescript
interface Parada {
  codDftrans: string;           // Código da parada
  descricao: string;            // Descrição/localização
  sentido?: string;             // Sentido da via
  latitude: number;             // Latitude (WGS84)
  longitude: number;            // Longitude (WGS84)
  sequencial?: number;          // ID único (opcional)
}
```

**Exemplo:**
```json
{
  "codDftrans": "3458",
  "descricao": "QUADRA 102 SUL",
  "sentido": "SUL/NORTE",
  "latitude": -15.8267,
  "longitude": -47.8978
}
```

---

## Horário

Representa os horários de uma linha.

```typescript
interface Horario {
  linha: string;                // Número da linha
  horarios: HorarioDia[];       // Lista de horários por dia
}

interface HorarioDia {
  diaSemana: string;            // "SEGUNDA", "TERÇA", etc.
  turno: string;                // "Madrugada", "Manhã", "Tarde", "Noite"
  horarios: string[];           // Lista de horários (ex: ["05:30", "06:00"])
}
```

**Exemplo:**
```json
{
  "linha": "099.1",
  "horarios": [
    {
      "diaSemana": "SEGUNDA",
      "turno": "Manhã",
      "horarios": ["05:30", "06:00", "06:30", "07:00"]
    },
    {
      "diaSemana": "SEGUNDA",
      "turno": "Tarde",
      "horarios": ["12:00", "13:00", "14:00"]
    }
  ]
}
```

---

## Itinerário

Representa o itinerário de uma linha.

```typescript
interface Itinerario {
  linha: string;                // Número da linha
  sentido: string;              // Sentido da linha
  origem: string;               // Ponto de origem
  destino: string;              // Ponto de destino
  extensao: number;             // Extensão em km
  trechos: Trecho[];            // Lista de trechos
}

interface Trecho {
  sequencia: number;            // Ordem do trecho
  descricao: string;            // Descrição do trecho
}
```

**Exemplo:**
```json
{
  "linha": "099.1",
  "sentido": "IDA",
  "origem": "RODOVIÁRIA DO PLANO PILOTO",
  "destino": "CEILÂNDIA (P SUL)",
  "extensao": 28.5,
  "trechos": [
    {
      "sequencia": 1,
      "descricao": "EIXO MONUMENTAL"
    },
    {
      "sequencia": 2,
      "descricao": "EPIA SUL"
    }
  ]
}
```

---

## Referência

Representa um ponto de referência (local de interesse).

```typescript
interface Referencia {
  sequencialRef: number;        // ID único da referência
  descricao: string;            // Nome/descrição
  tipo: "R" | "E" | "P";       // R=Referência, E=Estação, P=Parada
  latitude?: number;            // Latitude (opcional)
  longitude?: number;           // Longitude (opcional)
}
```

**Exemplo:**
```json
{
  "sequencialRef": 1234,
  "descricao": "RODOVIÁRIA DE BRASÍLIA",
  "tipo": "R",
  "latitude": -15.7942,
  "longitude": -47.8822
}
```

---

## Estação

Representa uma estação (terminal ou metrô).

```typescript
interface Estacao {
  seqEstacao: number;           // ID único da estação
  descricao: string;            // Nome da estação
  tipo: "B" | "M" | "R" | string;  // B=BRT, M=Metrô, R=Rodoviário
  latitude: number;             // Latitude
  longitude: number;            // Longitude
  realizaVenda?: boolean;       // Faz venda de cartões
  realizaEmissao?: boolean;     // Faz emissão de cartões
}
```

**Exemplo:**
```json
{
  "seqEstacao": 42,
  "descricao": "TERMINAL CEILÂNDIA SUL",
  "tipo": "B",
  "latitude": -15.8267,
  "longitude": -48.1078,
  "realizaVenda": true,
  "realizaEmissao": true
}
```

---

## Área de Integração

Representa uma área onde é possível fazer integração entre linhas.

```typescript
interface AreaIntegracao {
  sequencial: number;           // ID único da área
  descricao: string;            // Nome/descrição da área
  latitude?: number;            // Latitude (centro)
  longitude?: number;           // Longitude (centro)
}
```

**Exemplo:**
```json
{
  "sequencial": 10,
  "descricao": "ÁREA DE INTEGRAÇÃO CEILÂNDIA",
  "latitude": -15.8267,
  "longitude": -48.1078
}
```

---

## Bicicletário

Representa um bicicletário.

```typescript
interface Bicicletario {
  descricao: string;            // Nome/localização
  capacidade?: number;          // Capacidade de bicicletas
  latitude: number;             // Latitude
  longitude: number;            // Longitude
}
```

**Exemplo:**
```json
{
  "descricao": "BICICLETÁRIO RODOVIÁRIA",
  "capacidade": 50,
  "latitude": -15.7942,
  "longitude": -47.8822
}
```

---

## Posto SBA

Representa um posto de atendimento SBA.

```typescript
interface PostoSBA {
  descricao: string;            // Nome/localização
  realizaVenda: boolean;        // Faz venda de cartões
  realizaEmissao: boolean;      // Faz emissão de cartões
  latitude: number;             // Latitude
  longitude: number;            // Longitude
}
```

**Exemplo:**
```json
{
  "descricao": "POSTO SBA RODOVIÁRIA",
  "realizaVenda": true,
  "realizaEmissao": true,
  "latitude": -15.7942,
  "longitude": -47.8822
}
```

---

## Veículo (GPS)

Representa a posição de um veículo em tempo real.

```typescript
interface VeiculoGPS {
  veiculo: string;              // ID do veículo
  operadora: string;            // Nome da operadora
  velocidade: number;           // Velocidade em km/h
  timestamp: string;            // Data/hora da posição (ISO 8601)
  latitude: number;             // Latitude
  longitude: number;            // Longitude
}
```

**Exemplo:**
```json
{
  "veiculo": "12345",
  "operadora": "URBI",
  "velocidade": 45,
  "timestamp": "2024-10-23T14:30:00Z",
  "latitude": -15.8267,
  "longitude": -47.8978
}
```

---

## GeoJSON

Muitos endpoints retornam dados no formato GeoJSON (RFC 7946).

### FeatureCollection

```typescript
interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

interface Feature {
  type: "Feature";
  geometry: Geometry;
  properties: object;           // Propriedades específicas do feature
}

interface Geometry {
  type: "Point" | "LineString" | "Polygon";
  coordinates: number[] | number[][] | number[][][];
}
```

### Point (Parada, Estação, etc.)

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-47.8978, -15.8267]
      },
      "properties": {
        "codDftrans": "3458",
        "descricao": "QUADRA 102 SUL"
      }
    }
  ]
}
```

**Nota:** Coordenadas são sempre `[longitude, latitude]`, não `[latitude, longitude]`.

### LineString (Percurso)

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-47.8822, -15.7942],
          [-47.8900, -15.8000],
          [-47.9000, -15.8100]
        ]
      },
      "properties": {
        "linha": "099.1",
        "sentido": "IDA"
      }
    }
  ]
}
```

### Polygon (Área de Integração)

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-47.8822, -15.7942],
          [-47.8900, -15.7942],
          [-47.8900, -15.8000],
          [-47.8822, -15.8000],
          [-47.8822, -15.7942]
        ]]
      },
      "properties": {
        "descricao": "ÁREA DE INTEGRAÇÃO"
      }
    }
  ]
}
```

---

## Enumerações

### Tipos de Referência

```typescript
type TipoReferencia = "R" | "E" | "P";

// R = Referência (ponto de interesse)
// E = Estação (terminal/metrô)
// P = Parada de ônibus
```

### Tipos de Estação

```typescript
type TipoEstacao = "B" | "M" | "R" | string;

// B = Terminal BRT
// M = Estação de Metrô
// R = Terminal Rodoviário
```

### Sentidos

```typescript
type Sentido = "IDA" | "VOLTA" | "CIRCULAR";
```

### Dias da Semana

```typescript
type DiaSemana = 
  | "SEGUNDA"
  | "TERÇA"
  | "QUARTA"
  | "QUINTA"
  | "SEXTA"
  | "SÁBADO"
  | "DOMINGO";
```

### Turnos

```typescript
type Turno = "Madrugada" | "Manhã" | "Tarde" | "Noite";

// Madrugada: 00:00 - 05:59
// Manhã:     06:00 - 11:59
// Tarde:     12:00 - 17:59
// Noite:     18:00 - 23:59
```

---

## Códigos HTTP

### Respostas de Sucesso

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |

### Respostas de Erro

| Código | Descrição |
|--------|-----------|
| 400 | Bad Request - Parâmetros inválidos |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

---

## Tratamento de Erros

Quando ocorre um erro, a API pode retornar:

```typescript
interface ErrorResponse {
  error?: string;               // Mensagem de erro
  message?: string;             // Descrição do erro
  status?: number;              // Código HTTP
}
```

**Exemplo de tratamento:**

```javascript
try {
  const response = await fetch('https://www.sistemas.dftrans.df.gov.br/linha/numero/999.9');
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error('Erro:', error.message);
}
```

---

## Validação de Dados

### Validar Número de Linha

```javascript
function validarNumeroLinha(numero) {
  // Formato: XXX.X ou XXXX.X
  const regex = /^\d{3,4}\.\d$/;
  return regex.test(numero);
}

// Exemplos válidos: "099.1", "100.1", "1234.5"
```

### Validar Código de Parada

```javascript
function validarCodigoParada(codigo) {
  // Formato: 4 dígitos
  const regex = /^\d{4}$/;
  return regex.test(codigo);
}

// Exemplos válidos: "3458", "9637", "0001"
```

### Validar Coordenadas

```javascript
function validarCoordenadas(lat, lon) {
  // Distrito Federal aproximadamente:
  // Latitude: -16.0 a -15.5
  // Longitude: -48.3 a -47.3
  
  return (
    lat >= -16.0 && lat <= -15.5 &&
    lon >= -48.3 && lon <= -47.3
  );
}
```

---

## Conversão de Dados

### Converter GeoJSON para Array de Objetos

```javascript
function geojsonParaArray(geojson) {
  return geojson.features.map(feature => ({
    ...feature.properties,
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0]
  }));
}
```

### Converter Horários para Minutos

```javascript
function horarioParaMinutos(horario) {
  const [horas, minutos] = horario.split(':').map(Number);
  return horas * 60 + minutos;
}

// "05:30" => 330 minutos
```

### Formatar Tarifa

```javascript
function formatarTarifa(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

// 5.50 => "R$ 5,50"
```

---

## Exemplos de TypeScript

### Definir Tipos

```typescript
// tipos.ts
export interface Linha {
  sequencial: number;
  numero: string;
  descricao: string;
  sentido: "IDA" | "VOLTA" | "CIRCULAR";
  faixaTarifaria?: {
    tarifa: number;
  };
  operadoras?: string[];
}

export interface Parada {
  codDftrans: string;
  descricao: string;
  sentido?: string;
  latitude: number;
  longitude: number;
}
```

### Usar Tipos

```typescript
// api.ts
import { Linha, Parada } from './tipos';

async function buscarLinha(numero: string): Promise<Linha> {
  const response = await fetch(
    `https://www.sistemas.dftrans.df.gov.br/linha/numero/${numero}`
  );
  return await response.json();
}

async function buscarParada(codigo: string): Promise<Parada> {
  const response = await fetch(
    `https://www.sistemas.dftrans.df.gov.br/parada/cod/${codigo}`
  );
  return await response.json();
}
```

---

**API DFTrans - Distrito Federal**
