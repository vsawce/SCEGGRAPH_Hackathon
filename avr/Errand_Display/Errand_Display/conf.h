#ifndef CONF_H_
#define CONF_H_

/********************************************************************/
/*  SETUP CONFIGURATION FILE (for ports, etc)						*/
/*																	*/
/*  DUE TO F_CPU, conf.h MUST BE INCLUDED BEFORE ANY <avr/delay.h>	*/
/********************************************************************/

/* ATMega328P CLOCK SPEED */
#define F_CPU 16000000UL

/*---------------------------------------------------------------------------/
/ I/O PORTS
/---------------------------------------------------------------------------*/
/* SPI */
#define CE	 2	//PB2, CE
#define MOSI 3	//PB3, DIN
#define MISO 4	//PB4
#define SCK  5	//PB5, CLK

/* NOKIA 5110 LCD */
//#define CE 7	//D7 PD7
#define DC 5	//D5 PD5
#define RST 6	//D6 PD6



#endif /* CONF */
