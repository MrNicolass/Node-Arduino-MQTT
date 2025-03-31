# Node-Arduino-MQTT

## Introdução

O projeto foi desenvolvido visando fazer a conexão entre um navegador web e um Arduino UNO por meio do protocolo MQTT. O objetivo é permitir que o navegador envie uma mensagem (comando) e o Arduino intercepte e o execute, ligando ou desligando um LED.

Os principais elementos para o desenvolvimento desta aplicação são:

- Um servidor local **Node.js** construído com o framework **Express.js**, responsável por exibir a página HTML e gerenciar as mensagens MQTT.
- A biblioteca **PubSubClient.h** em C++ para conectar o Arduino ao MQTT.

## Ferramentas

### Middleware

Foi utilizado o middleware da **Mosquitto Organization**, um servidor público que gerencia mensagens MQTT. As portas disponíveis são:

```
1883  : MQTT, sem criptografia, sem autenticação;
1884  : MQTT, sem criptografia, com autenticação;
8883  : MQTT, criptografado, sem autenticação;
8884  : MQTT, criptografado, certificado do cliente necessário;
8885  : MQTT, criptografado, autenticado;
8080  : MQTT via WebSockets, sem criptografia, sem autenticação;
8081  : MQTT via WebSockets, criptografado, sem autenticação;
```

Como navegadores não suportam MQTT nativamente, utilizamos a porta **8081**, que funciona via **WebSockets** com criptografia, mas sem necessidade de autenticação.

### Web Server

A aplicação foi desenvolvida em **JavaScript** com **Node.js** e estruturada da seguinte forma:

- Inicializa o servidor na porta 3000 e importa os arquivos necessários.
- Contém o arquivo `routes.js`, que gerencia as rotas da aplicação.
- Armazena os arquivos HTML.
- Contém `mqtt.js`, responsável pela comunicação MQTT.
- Contém arquivos CSS e outros recursos.
- Contém o código em C++ para o Arduino.

### Comunicação MQTT

A comunicação MQTT é feita através das seguintes funções no arquivo `mqtt.js`:

```js
function onLED() {
    client.publish("ArduinoCatolicaNicolas/response", "true");
}

function offLED() {
    client.publish("ArduinoCatolicaNicolas/response", "false");
}
```

A conexão, verificação de erros e subscrição na rota `ArduinoCatolicaNicolas/request` ocorrem diretamente no código.

## Arduino

O código do **Arduino UNO** utiliza as bibliotecas **PubSubClient.h** e **Ethernet.h** para conexão MQTT. Como o dispositivo tem limitações de memória e processamento, utilizamos a porta **1883** (sem criptografia).

As principais funções no código do Arduino são:

```cpp
void callback(char* topic, byte* payload, unsigned int length) {
    // Executa a lógica para ligar/desligar o LED
}

void reconnect() {
    // Tenta reconectar ao servidor MQTT até obter sucesso
}

void setup() {
    // Configuração inicial do Arduino
}

void loop() {
    // Mantém a conexão e escuta mensagens MQTT
}
```

## Arquitetura do Projeto

### Fluxo de Comunicação

1. O **navegador** envia um comando para o servidor Express.
2. O **Express** envia uma mensagem MQTT ao Arduino.
3. O **Arduino** interpreta a mensagem e liga/desliga o LED.
4. O **Arduino** envia uma resposta ao Express.
5. O **Express** exibe a mensagem de status no navegador.

---

## Contribuidores
A equipe envolvida neste projeto é constituída por alunos da 6ª Fase (20251) do curso de Engenharia de Software do Centro Universitário Católica SC de Jaraguá do Sul.

<div align="center">
<table>
  <tr>
    <td align="center"><a href="https://github.com/HigorAz"><img loading="lazy" src="https://avatars.githubusercontent.com/u/141787745?v=4" width="115"><br><sub>Higor Azevedo</sub></a></td>
    <td align="center"><a href="https://github.com/AoiteFoca"><img loading="lazy" src="https://avatars.githubusercontent.com/u/141975272?v=4" width="115"><br><sub>Nathan Cielusinski</sub></a></td>
    <td align="center"><a href="https://github.com/MrNicolass"><img loading="lazy" src="https://avatars.githubusercontent.com/u/80847876?v=4" width="115"><br><sub>Nicolas Gustavo Conte</sub></a></td>
  </tr>
</div>
