#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>

//Ethernet Shield configuration
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 18, 221);
//IPAddress ip(10, 197, 12, 223);
const char* mqttServer = "test.mosquitto.org";
const int mqttPort = 1883;

EthernetClient ethClient;
PubSubClient mqttClient(ethClient);

//Topics
const char* sendTopic = "ArduinoCatolicaNicolas/request";
const char* responseTopic = "ArduinoCatolicaNicolas/response";

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message received in: " + String(topic));

  if (strcmp(topic, responseTopic) == 0) {
    bool estado = (payload[0] == '1');

    if (estado) {
      digitalWrite(7, HIGH);
      mqttClient.publish(sendTopic, "LED ON!");
    } else {
      digitalWrite(7, LOW);
      mqttClient.publish(sendTopic, "LED OFF!");
    }
  }
}

void reconnect() {
  while (!mqttClient.connected()) {
    Serial.print("Connecting to MQTT...");
    if (mqttClient.connect("ArduinoClient")) {
      Serial.println("Connected!");
      mqttClient.subscribe(responseTopic);
    } else {
      Serial.print("Failed, code: ");
      Serial.println(mqttClient.state());
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(9600);
  Ethernet.begin(mac, ip);
  delay(1500);

  mqttClient.setServer(mqttServer, mqttPort);
  mqttClient.setCallback(callback);

  pinMode(7, OUTPUT);
  reconnect();
}

void loop() {
  if (!mqttClient.connected()) {
    reconnect();
  }

  mqttClient.loop();
}
