import { Injectable, Logger, NestMiddleware, UseGuards } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectKnex, Knex } from 'nestjs-knex';
import { nextTick } from 'process';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Injectable()
export class AllUserJwtMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  async use(req: Request, res: Response, next: NextFunction) {
    Logger.log('inside alluserjwt middleware');
    const { authorization } = req.headers;
    console.log(authorization)

    // check if the token exists
    if (!authorization) {
      const jwt = await this.authService.generateJwt();
      Logger.log(`the new user has been assigned to new token: ${jwt}`);
      res.header('X-Auth-Token', jwt);
      next();
    } else {
      Logger.log('the user has token already');
      next();
    }
  }
}