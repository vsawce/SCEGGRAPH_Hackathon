#ifndef BUTTONS_H_
#define BUTTONS_H_

//#define F_CPU 16000000UL

#include "conf.h"
#include <util/delay.h>
#include "nokia_5110.h"

#define DEBOUNCE_TIME 10

//void buttons__init(); //Initialize buttons. Pinout found on conf.h
void buttons__poll();

#endif /* BUTTONS_H_ */