# Índice da Documentação - API DFTrans

Bem-vindo à documentação completa da API DFTrans! Esta pasta contém todos os recursos necessários para integrar e utilizar a API do sistema de transporte público do Distrito Federal.

---

## Arquivos Disponíveis

### 1. [README.md](README.md) - Documentação Principal
**Descrição:** Documentação completa e detalhada da API DFTrans.

**Conteúdo:**
- Visão geral da API
- Base URL e configuração
- Todos os endpoints disponíveis
- Exemplos de requisições e respostas
- Códigos de resposta HTTP
- Notas importantes e boas práticas

**Quando usar:** Para consultar endpoints específicos e entender como fazer requisições.

---

### 2. [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Guia Rápido
**Descrição:** Referência rápida com os endpoints mais utilizados.

**Conteúdo:**
- Tabela resumida de endpoints
- Snippets de código prontos para uso
- Tipos e códigos importantes
- Notas essenciais

**Quando usar:** Para consultas rápidas durante o desenvolvimento.

---

### 3. [TIPOS_DE_DADOS.md](TIPOS_DE_DADOS.md) - Estruturas de Dados
**Descrição:** Documentação detalhada dos tipos de dados retornados pela API.

**Conteúdo:**
- Interfaces TypeScript de todos os tipos
- Exemplos JSON de cada estrutura
- Formato GeoJSON explicado
- Enumerações e constantes
- Validação de dados
- Conversão de formatos

**Quando usar:** Para entender a estrutura dos dados e implementar tipagem forte.

---

### 4. [exemplos.js](site_exemplo/exemplos.js) - Exemplos de Código JavaScript
**Descrição:** Arquivo JavaScript com 18 exemplos práticos de uso da API.

**Conteúdo:**
- Exemplos de todos os endpoints principais
- Casos de uso complexos
- Funções reutilizáveis
- Tratamento de erros
- Código comentado e organizado

**Quando usar:** Para copiar e adaptar código para seu projeto.

**Como executar:**
```bash
# No Node.js
node exemplos.js

# No navegador
<script src="exemplos.js"></script>
```

---

### 5. [exemplo.html](site_exemplo/exemplo.html) - Página de Demonstração
**Descrição:** Página HTML interativa com exemplos visuais da API.

**Conteúdo:**
- Interface visual para testar endpoints
- 6 exemplos interativos
- Exibição de resultados em tempo real
- Design moderno e responsivo

**Quando usar:** Para testar a API visualmente sem escrever código.

**Como usar:**
1. Abra o arquivo `exemplo.html` no navegador
2. Preencha os campos de entrada
3. Clique nos botões para fazer requisições
4. Veja os resultados na tela

---

## Começando

### Para Iniciantes

1. **Leia primeiro:** [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
2. **Teste visualmente:** Abra [exemplo.html](site_exemplo/exemplo.html) no navegador
3. **Copie código:** Use exemplos de [exemplos.js](site_exemplo/exemplos.js)

### Para Desenvolvedores Experientes

1. **Consulte:** [README.md](README.md) para endpoints completos
2. **Implemente tipagem:** Use [TIPOS_DE_DADOS.md](TIPOS_DE_DADOS.md)
3. **Adapte código:** Modifique [exemplos.js](site_exemplo/exemplos.js) conforme necessário

---

## Guia por Caso de Uso

### Quero buscar informações de uma linha específica

1. **Endpoint:** `/linha/numero/{numeroLinha}`
2. **Documentação:** [README.md - Linhas](README.md#1-buscar-linha-por-número)
3. **Exemplo:** [exemplos.js - exemplo1_buscarLinha](site_exemplo/exemplos.js)
4. **Tipo de dados:** [TIPOS_DE_DADOS.md - Linha](TIPOS_DE_DADOS.md#linha)

---

### Quero saber quais linhas passam em uma parada

1. **Endpoint:** `/linha/parada/codigo/{codParada}`
2. **Documentação:** [README.md - Linhas por Parada](README.md#4-buscar-linhas-por-código-de-parada)
3. **Exemplo:** [exemplos.js - exemplo2_linhasPorParada](site_exemplo/exemplos.js)
4. **Teste visual:** [exemplo.html - Exemplo 2](site_exemplo/exemplo.html)

---

### Quero consultar horários de uma linha

1. **Endpoint:** `/horario/linha/numero/{numeroLinha}`
2. **Documentação:** [README.md - Horários](README.md#horários)
3. **Exemplo:** [exemplos.js - exemplo8_horariosLinha](site_exemplo/exemplos.js)
4. **Tipo de dados:** [TIPOS_DE_DADOS.md - Horário](TIPOS_DE_DADOS.md#horário)

---

### Quero buscar referências (autocomplete)

1. **Endpoint:** `/referencia/find/{termo}/{limite}`
2. **Documentação:** [README.md - Referências](README.md#referências)
3. **Exemplo:** [exemplos.js - exemplo11_buscarReferencias](site_exemplo/exemplos.js)
4. **Nota:** Lembre-se de codificar o caractere `/` como `%26%2347%3B`

---

### Quero exibir paradas em um mapa

1. **Endpoint:** `/parada/geo/paradas` (GeoJSON)
2. **Documentação:** [README.md - Paradas GeoJSON](README.md#2-buscar-todas-as-paradas-geojson)
3. **Exemplo:** [exemplos.js - exemplo6_todasParadas](site_exemplo/exemplos.js)
4. **Formato:** [TIPOS_DE_DADOS.md - GeoJSON](TIPOS_DE_DADOS.md#geojson)

---

### Quero rastrear veículos em tempo real

1. **Endpoint:** `/gps/linha/{numeroLinha}/geo/recent`
2. **Documentação:** [README.md - GPS/Veículos](README.md#gpsveículos)
3. **Exemplo:** [exemplos.js - exemplo14_veiculosTempoReal](site_exemplo/exemplos.js)
4. **Tipo de dados:** [TIPOS_DE_DADOS.md - Veículo GPS](TIPOS_DE_DADOS.md#veículo-gps)

---

### Quero planejar uma viagem completa

1. **Exemplo completo:** [exemplos.js - exemplo17_planejamentoViagem](site_exemplo/exemplos.js)
2. **Endpoints usados:**
   - `/parada/cod/{codParada}` - Informações das paradas
   - `/linha/parada/codigo/{codParada}` - Linhas disponíveis
   - `/horario/linha/numero/{numeroLinha}` - Horários

---

## Ferramentas e Recursos

### Bibliotecas Recomendadas

#### Para Mapas (GeoJSON)
- **OpenLayers** - Usado no ParadaEmDia
- **Leaflet** - Alternativa leve
- **Mapbox GL JS** - Mapas modernos

#### Para Requisições HTTP
- **Fetch API** - Nativo do navegador
- **Axios** - Cliente HTTP popular
- **jQuery.ajax** - Usado no código legado

#### Para TypeScript
- Use as interfaces em [TIPOS_DE_DADOS.md](TIPOS_DE_DADOS.md)

---

## Estatísticas da API

### Endpoints Disponíveis

| Categoria | Quantidade |
|-----------|------------|
| Linhas | 5 endpoints |
| Paradas | 3 endpoints |
| Horários | 2 endpoints |
| Itinerários | 1 endpoint |
| Referências | 1 endpoint |
| Estações | 2 endpoints |
| Áreas de Integração | 3 endpoints |
| Bicicletários | 1 endpoint |
| Postos SBA | 1 endpoint |
| GPS/Veículos | 1 endpoint |
| Percurso | 1 endpoint |
| **Total** | **21 endpoints** |

---

## Busca Rápida

### Por Palavra-chave

- **Linha:** [README.md](README.md#linhas) | [exemplos.js](site_exemplo/exemplos.js) | [TIPOS_DE_DADOS.md](TIPOS_DE_DADOS.md#linha)
- **Parada:** [README.md](README.md#paradas) | [exemplos.js](site_exemplo/exemplos.js) | [TIPOS_DE_DADOS.md](TIPOS_DE_DADOS.md#parada)
- **Horário:** [README.md](README.md#horários) | [exemplos.js](site_exemplo/exemplos.js) | [TIPOS_DE_DADOS.md](TIPOS_DE_DADOS.md#horário)
- **GeoJSON:** [README.md](README.md#2-formato-geojson) | [TIPOS_DE_DADOS.md](TIPOS_DE_DADOS.md#geojson)
- **Veículos:** [README.md](README.md#gpsveículos) | [exemplos.js](site_exemplo/exemplos.js) | [TIPOS_DE_DADOS.md](TIPOS_DE_DADOS.md#veículo-gps)

---

## Perguntas Frequentes

### Como faço para começar?

1. Leia o [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
2. Abra [exemplo.html](site_exemplo/exemplo.html) para testar
3. Copie código de [exemplos.js](site_exemplo/exemplos.js)

### Preciso de autenticação?

Não! A API é pública e não requer autenticação.

### Posso usar em produção?

Sim, mas implemente:
- Cache local
- Tratamento de erros
- Rate limiting (evite requisições excessivas)

### Como reportar problemas?

A API é mantida pela DFTrans. Para problemas com a documentação, entre em contato com o desenvolvedor do ParadaEmDia.

### Existe limite de requisições?

Não há documentação oficial sobre limites, mas recomenda-se usar com moderação.

---

## Suporte

### Recursos Oficiais

- **API Base:** https://www.sistemas.dftrans.df.gov.br
- **Sistema ParadaEmDia:** [../index.html](../index.html)

### Documentação

- **Completa:** [README.md](README.md)
- **Rápida:** [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- **Tipos:** [TIPOS_DE_DADOS.md](TIPOS_DE_DADOS.md)

---

## Próximos Passos

1. Leia a documentação relevante para seu caso de uso
2. Teste os exemplos fornecidos
3. Adapte o código para seu projeto
4. Implemente tratamento de erros
5. Adicione cache se necessário
6. Teste em produção

---

## Changelog

### Versão 1.0 (2024)
- Documentação completa da API
- 18 exemplos práticos em JavaScript
- Página HTML de demonstração
- Guia rápido de referência
- Documentação de tipos de dados
- Índice geral

---

## Contribuindo

Esta documentação foi criada para facilitar o uso da API DFTrans. Se você encontrar erros ou tiver sugestões de melhorias, sinta-se à vontade para contribuir!

---

## Licença

Esta documentação é fornecida "como está" para fins educacionais e de desenvolvimento. A API DFTrans é propriedade do Governo do Distrito Federal.

---

**Desenvolvido para o sistema ParadaEmDia**  
**API DFTrans - Distrito Federal**  
**Última atualização: 2024**
