import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import fs from 'fs/promises';
import imageType from 'image-type';
import path from 'path';
import { ejsDefaultData } from 'src/config/ejs';
import { logger } from 'src/utils/logger';
import {
  errorViewDir,
  loginViewDir,
  logoutViewDir,
  signupViewDir,
  uploadsDirLocal,
} from 'src/utils/paths';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

// Views =====================================================================//
@ApiTags('views')
@Controller()
export class UserControllerViews {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  @ApiResponse({ description: 'Renders login view' })
  async getLogin(@Res() res: Response) {
    res.render(loginViewDir, ejsDefaultData);
  }

  @Get('signup')
  @ApiResponse({ description: 'Renders signup view' })
  async getSignup(@Res() res: Response) {
    res.render(signupViewDir, ejsDefaultData);
  }

  @Get('logout')
  @ApiResponse({ description: 'Renders logout view' })
  getLogout(@Req() req: Request, @Res() res: Response) {
    const destroyedUser = res.locals.oldEjsDefaultData.user;
    let success = true;

    req.logout((err) => {
      logger.log(err);
      success = false;
    });

    if (!success) {
      return res.render(errorViewDir, {
        ejsDefaultData,
        errorTitle: 'Logout error',
        errorDescription: 'Logout failed',
      });
    }

    ejsDefaultData.reset();
    res.render(logoutViewDir, { user: destroyedUser });
  }

  @Get('error')
  @ApiResponse({ description: 'Renders error view' })
  getError(@Query() query, @Res() res: Response) {
    const errorTitle = query.errorTitle || 'Error';
    const errorDescription = query.errorDescription || 'Unknown error';

    logger.error(`${errorTitle} - ${errorDescription}`);
    res.status(401).render(errorViewDir, {
      ejsDefaultData,
      errorTitle: errorTitle,
      errorDescription: errorDescription,
    });
  }
}

// API =======================================================================//
@ApiTags('user')
@Controller('api/user')
export class UserControllerApi {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @Post('login')
  @Redirect('/', HttpStatus.MOVED_PERMANENTLY)
  postLogin() {
    return;
  }

  @Post('signup')
  async postSignup(@Req() req: Request, @Res() res: Response) {
    if (!req.user) return;

    // If file is provided and is an image, upload it
    if (req.file) {
      const imgExtension = (await imageType(req.file.buffer))?.ext;
      imgExtension &&
        fs.writeFile(
          path.join(uploadsDirLocal, `${req.user?.id}.${imgExtension}`),
          req.file.buffer,
        );
    }
    res.redirect('/signup-messages');
  }

  @Post('logout')
  @Redirect('/logout')
  postLogout() {
    return;
  }
}
