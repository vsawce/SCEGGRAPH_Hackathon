/*
  Discord WebHook Example for Mkr Wifi 1010
*/


#include "discord.h"

void setup() {
  Serial.begin(9600);
  wifi__connect();
  discord__send(":flushed:");
  //getLatestMessage();
}

void loop() {
  //getLatestMessage();
  xmit();
}
