#ifndef NOKIA_5110_H_
#define NOKIA_5110_H_

#include "conf.h"
#include <avr/pgmspace.h>
#include <util/delay.h>
#include <stdint.h>
#include <stdlib.h>
#include "spi.h"

#define WHITE 0 
#define BLACK 1

extern uint8_t scale;

void nokia__cmd(uint8_t cmd);
void nokia__data(uint8_t data);
void nokia__init();
void nokia__cursor(uint8_t x, uint8_t y); //Move cursor to x and y position. x is from 0 to 83, y is from 0 to 5 (Page 10 of datasheet)
void nokia__cursor_origin();
void nokia__update();
void nokia__wipe();
void nokia__fill();
void nokia__pixel(uint8_t x, uint8_t y, uint8_t whtblk);
void nokia__scale(uint8_t sc);
void nokia__char(char c, uint8_t x, uint8_t y);
void nokia__str(char str[], uint8_t str_size, uint8_t x, uint8_t y);

#endif /* NOKIA_5110_H_ */