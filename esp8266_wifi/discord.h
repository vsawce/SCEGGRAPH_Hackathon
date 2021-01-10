#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ArduinoHttpClient.h>
#include "config.h"

const char ssid[] = CONFIG_SSID;    //Network SSID
const char pwd[] = CONFIG_PWD;    //WPA Network password

const char host[] = "discordapp.com";
const int port = 443;
const String discord_webhook = CONFIG_WEBHOOK;
const String discord_tts = CONFIG_TTS;

uint8_t incomingByte = 0;

WiFiClientSecure client;
HttpClient http_client = HttpClient(client, host, port);

void wifi__connect() {
  // We start by connecting to a WiFi network

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  /* Explicitly set the ESP8266 to be a WiFi-client, otherwise, it by default,
     would try to act as both a client and an access-point and could cause
     network-issues with your other WiFi-devices on your WiFi-network. */
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pwd);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void discord__send(String ct) {
  Serial.println("Sending \"" + ct + "\" to Discord webhook...");
  Serial.println("Text-to-speech: " + discord_tts);
  Serial.println();
  
  http_client.post(discord_webhook, "application/json", "{\"content\":\"" + ct + "\", \"tts\":" + discord_tts + "}");
  
  int status_code = http_client.responseStatusCode(); //Debugging purposes
  String response = http_client.responseBody(); //Utilize for sending via UART to Nano. Use this UART data to transmit

  Serial.print("HTTP status code: ");
  Serial.println(status_code);
  Serial.print("HTTP response: ");
  Serial.println(response);
  
}

void xmit() {
  if (Serial.available() > 0) {
    incomingByte = Serial.read();
    if (incomingByte == '1')
      discord__send("!chores remind dishes"); 
    else if (incomingByte == '2')
      discord__send("!chores remind trash"); 
    else if (incomingByte == '3')
      discord__send("!chores remind vacuum"); 
  }
}
