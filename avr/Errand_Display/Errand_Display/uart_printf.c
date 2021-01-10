#include "uart_printf.h"

void uart__printf(char *message)
{
	const size_t message_length = strlen(message); 
	for(size_t i = 0; i < message_length; i++)
	{
		uart__polled_put(message[i]); 
	}
}


void uart__print_new_line() {
	uart__polled_put('\r');
	uart__polled_put('\n');
}

void uart__print_hex(unsigned char data) {
	unsigned char upperNibble, lowerNibble;
	upperNibble = (data & 0xF0) >> 4;
	if (upperNibble <= 9) {
		upperNibble += 48;
	}
	else {
		upperNibble += 55;
	}
	lowerNibble = data & 0x0F;
	if (lowerNibble <= 9) {
		lowerNibble += 48;
	}
	else {
		lowerNibble += 55;
	}
	uart__polled_put('0');
	uart__polled_put('x');
	uart__polled_put(upperNibble);
	uart__polled_put(lowerNibble);
}