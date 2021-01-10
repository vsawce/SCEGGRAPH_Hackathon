#include "buttons.h"


void buttons__poll() {
	uint16_t timer = 0;
	while (!(PINC & (1<<BUT1))) {
		timer++;
		_delay_ms(1);
	}
	if (timer > DEBOUNCE_TIME) {
		nokia__select_state();
	}
	
	timer = 0;
	while (!(PINC & (1<<BUT2))) {
		timer++;
		_delay_ms(1);
	}
	if (timer > DEBOUNCE_TIME)
		nokia__next_state();
}