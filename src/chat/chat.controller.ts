import { Controller, Get, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ejsDefaultData } from 'src/config/ejs';
import { chatViewDir } from 'src/utils/paths';

@ApiTags('views')
@Controller('chat')
export class ChatControllerViews {
  @Get()
  @ApiResponse({ description: 'Renders chat view' })
  getChatView(@Res() res: Response) {
    res.render(chatViewDir, ejsDefaultData);
  }
}
