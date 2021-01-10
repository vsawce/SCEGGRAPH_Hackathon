#ifndef UART_PRINTF_H_
#define UART_PRINTF_H_

#include "conf.h"
#include <stdio.h>
#include <string.h>
#include "uart.h"

void uart__printf(char *message); /* Prints string/char array */
void uart__print_new_line(); /* New CRLF line (\r\n) */
void uart__print_hex(unsigned char data); /* Byte in hex representation (0x??), for debug */

#endif /* UART_PRINTF_H_ */