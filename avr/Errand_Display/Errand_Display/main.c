/*
 * Errand_Display.c
 *
 * Created: 1/8/2021 3:36:49 PM
 * Author : vsaw3
 */ 

#include "conf.h"
#include <avr/io.h>
#include <util/delay.h>
#include <string.h>
#include "spi.h"
#include "nokia_5110.h"


int main(void)
{
	char test[5][15] = {"Trash: Vincent", "Dishes: Chris", "Vac: Quin", "Cook: Mick", "Idle: Sarah"};
	spi__init();	
	nokia__init();
	//nokia__str(test, 16, 0, 0);
	//nokia__update();
	nokia__cursor_origin();
	nokia__str(test[0], strlen(test[0]), 0, 0);
	nokia__str(test[1], strlen(test[1]), 0, 8);
	nokia__str(test[2], strlen(test[2]), 0, 16);
	nokia__str(test[3], strlen(test[3]), 0, 24);
	nokia__str(test[4], strlen(test[4]), 0, 32);
	//nokia__char('A', 0, 0);
	//nokia__scale(2);
	//nokia__char('B', 20, 0);
	//nokia__scale(3);
	//nokia__char('C', 40, 0);
	//nokia__fill();
	nokia__update();
	
    while (1) 
    {
		
		//nokia__fill();
		//nokia__update();
		_delay_ms(1000);
    }
}

