#include "esp8266_esp01.h"

void esp__transmit_state() {
	uart__polled_put(state+'60');
}
