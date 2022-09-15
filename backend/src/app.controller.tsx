/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('')
export class AppController {
  
  @UseGuards(JwtAuthGuard)
  @Get('/')
  findAll() {
    return {message: 'welcome new user'}
  }
}
