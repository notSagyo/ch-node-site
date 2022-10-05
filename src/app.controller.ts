import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { ejsDefaultData } from './config/ejs';
import { logger } from './utils/logger';
import { indexViewDir } from './utils/paths';

@ApiTags('views')
@Controller()
export class AppControllerViews {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ description: 'Renders index view' })
  getHome(@Req() req: Request, @Res() res: Response) {
    logger.info('Req. user:', req.user);
    return res.render(indexViewDir, ejsDefaultData);
  }
}
