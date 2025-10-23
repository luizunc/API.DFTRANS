# Guia Rápido - API DFTrans

## Início Rápido

### Base URL
```
https://www.sistemas.dftrans.df.gov.br
```

### Exemplo Básico
```javascript
fetch('https://www.sistemas.dftrans.df.gov.br/linha/numero/099.1')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## Endpoints Principais

### Linhas

| Endpoint | Descrição | Exemplo |
|----------|-----------|---------|
| `/linha/numero/{numeroLinha}` | Buscar linha por número | `/linha/numero/099.1` |
| `/linha/parada/codigo/{codParada}` | Linhas de uma parada | `/linha/parada/codigo/3458` |
| `/linha/estacao/{seqEstacao}` | Linhas de uma estação | `/linha/estacao/42` |
| `/linha/find/{termo}/{limite}` | Buscar linhas (filtro) | `/linha/find/099/10` |
| `/linha/{tipo1}/{seq1}/{tipo2}/{seq2}` | Linhas entre referências | `/linha/R/1234/R/5678` |

### Paradas

| Endpoint | Descrição | Exemplo |
|----------|-----------|---------|
| `/parada/cod/{codParada}` | Buscar parada por código | `/parada/cod/3458` |
| `/parada/geo/paradas` | Todas as paradas (GeoJSON) | `/parada/geo/paradas` |
| `/parada/geo/paradas/linha/{seqLinha}` | Paradas de uma linha | `/parada/geo/paradas/linha/123` |

### Horários

| Endpoint | Descrição | Exemplo |
|----------|-----------|---------|
| `/horario/linha/numero/{numeroLinha}` | Horários por número | `/horario/linha/numero/099.1` |
| `/horario/linha/{seqLinha}` | Horários por sequencial | `/horario/linha/123` |

### Itinerários

| Endpoint | Descrição | Exemplo |
|----------|-----------|---------|
| `/itinerario/linha/numero/{numeroLinha}` | Itinerário da linha | `/itinerario/linha/numero/099.1` |

### Referências

| Endpoint | Descrição | Exemplo |
|----------|-----------|---------|
| `/referencia/find/{termo}/{limite}` | Buscar referências | `/referencia/find/Brasília/30` |

### Estações

| Endpoint | Descrição | Exemplo |
|----------|-----------|---------|
| `/estacao/{seqEstacao}` | Buscar estação | `/estacao/42` |
| `/estacao/geo/estacoes` | Todas estações (GeoJSON) | `/estacao/geo/estacoes` |

### GPS/Veículos

| Endpoint | Descrição | Exemplo |
|----------|-----------|---------|
| `/gps/linha/{numeroLinha}/geo/recent` | Posição dos veículos | `/gps/linha/099.1/geo/recent` |

### Percurso

| Endpoint | Descrição | Exemplo |
|----------|-----------|---------|
| `/percurso/linha/{seqLinha}` | Traçado da linha (GeoJSON) | `/percurso/linha/123` |

### Áreas de Integração

| Endpoint | Descrição | Exemplo |
|----------|-----------|---------|
| `/areaintegracao/geo/areas` | Todas as áreas (GeoJSON) | `/areaintegracao/geo/areas` |
| `/areaintegracao/geo/{seq}` | Área específica | `/areaintegracao/geo/10` |
| `/areaintegracao/{t1}/{s1}/{t2}/{s2}` | Áreas entre refs | `/areaintegracao/R/1234/R/5678` |

### Outros

| Endpoint | Descrição | Exemplo |
|----------|-----------|---------|
| `/bicicletario/geo/bicicletarios` | Bicicletários (GeoJSON) | `/bicicletario/geo/bicicletarios` |
| `/postosba/geo/postos` | Postos SBA (GeoJSON) | `/postosba/geo/postos` |

---

## Snippets Úteis

### Buscar Linha
```javascript
const linha = await fetch(
  'https://www.sistemas.dftrans.df.gov.br/linha/numero/099.1'
).then(r => r.json());
```

### Buscar Linhas de uma Parada
```javascript
const linhas = await fetch(
  'https://www.sistemas.dftrans.df.gov.br/linha/parada/codigo/3458'
).then(r => r.json());
```

### Buscar Horários
```javascript
const horarios = await fetch(
  'https://www.sistemas.dftrans.df.gov.br/horario/linha/numero/099.1'
).then(r => r.json());
```

### Buscar Referências (com encoding)
```javascript
const termo = 'Brasília'.replace('/', '%26%2347%3B');
const refs = await fetch(
  `https://www.sistemas.dftrans.df.gov.br/referencia/find/${termo}/10`
).then(r => r.json());
```

### Buscar Veículos em Tempo Real
```javascript
const veiculos = await fetch(
  'https://www.sistemas.dftrans.df.gov.br/gps/linha/099.1/geo/recent'
).then(r => r.json());
```

### Com jQuery
```javascript
$.get('https://www.sistemas.dftrans.df.gov.br/linha/numero/099.1', 
  function(data) {
    console.log(data);
  }
);
```

---

## Tipos e Códigos

### Tipos de Referência
- `R` - Referência (ponto de interesse)
- `E` - Estação (terminal/metrô)
- `P` - Parada de ônibus

### Tipos de Estação
- `B` - Terminal BRT
- `M` - Estação de Metrô
- `R` - Terminal Rodoviário

### Sentidos
- `IDA` - Sentido de ida
- `VOLTA` - Sentido de volta
- `CIRCULAR` - Linha circular

### Dias da Semana
- `SEGUNDA`, `TERÇA`, `QUARTA`, `QUINTA`, `SEXTA`, `SÁBADO`, `DOMINGO`

### Turnos
- `Madrugada` (00:00 - 05:59)
- `Manhã` (06:00 - 11:59)
- `Tarde` (12:00 - 17:59)
- `Noite` (18:00 - 23:59)

---

## Notas Importantes

1. **Caractere `/`**: Deve ser codificado como `%26%2347%3B`
2. **GeoJSON**: Coordenadas são `[longitude, latitude]`
3. **CORS**: Habilitado para uso em frontend
4. **Formato**: Todas as respostas são JSON ou GeoJSON
5. **HTTPS**: Sempre use HTTPS, não HTTP

---

## Recursos

- [Documentação Completa](README.md)
- [Exemplos de Código](site_exemplo/exemplos.js)
- [Página de Demonstração](site_exemplo/exemplo.html)

---

**API DFTrans - Distrito Federal**
