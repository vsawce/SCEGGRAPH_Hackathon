/*
 * Errand_Display.c
 *
 * Created: 1/8/2021 3:36:49 PM
 * Author : vsaw3
 */ 

#include "conf.h"
#include <avr/io.h>
#include <avr/interrupt.h>
#include <util/delay.h>
#include <string.h>
#include "spi.h"
#include "nokia_5110.h"
#include "buttons.h"
#include "uart.h"
#include "uart_printf.h"
#include "esp8266_esp01.h"



int main(void)
{
	//char test[5][15] = {"Trash: Vincent", "Dishes: Chris", "Vac: Quin", "Cook: Mick", "Idle: Sarah"};
	uart__init(9600);
	spi__init();	
	nokia__init();
	//buttons__init();
	nokia__default();
	//nokia__update();
	//sei();
    while (1) 
    {
		//nokia__fill();
		//nokia__update();
		//uart__polled_put('a');
		//_delay_ms(100);
		//nokia__next_state();
		buttons__poll();
		//nokia__update();
    }
}

