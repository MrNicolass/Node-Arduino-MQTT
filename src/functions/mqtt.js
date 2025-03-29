const mqttConnection = {
    host: 'test.mosquitto.org',
    port: 8081,
    protocol: 'wss'
}

const client = mqtt.connect(mqttConnection);

client.on('connect', () => {
    console.log('MQTT Connected!')
})

client.on('erro', (error) => {
    console.log('Upss...something went wrong! ' + error)
})

function onLED() {
    console.log('Ligando LED!')
    client.publish('ArduinoCatolicaNicolas/response', '1');
}

function offLED() {
    console.log('Desligando LED!')
    client.publish('ArduinoCatolicaNicolas/response', '0');
}

client.subscribe('ArduinoCatolicaNicolas/request',);

client.on('message', (topic, message) => {
    let teste = document.getElementsByClassName('response');

    if (message.includes('ON')) {
        teste[0].innerHTML = `<h2>Arduino answered: <span style="color: green;">${message}</span></h2>`;
    } else {
        teste[0].innerHTML = `<h2>Arduino answered: <span style="color: red;">${message}</span></h2>`;
    }
});

//Expose globally the functions
window.onLED = onLED;
window.offLED = offLED;