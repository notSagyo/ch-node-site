import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import multer from 'multer';
import passport from 'passport';
import { UserControllerApi, UserControllerViews } from './user.controller';
import { UserService } from './user.service';

const upload = multer();

@Module({
  controllers: [UserControllerViews, UserControllerApi],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        upload.none(),
        passport.authenticate('login', {
          failureRedirect:
            '/error' +
            '?errorTitle=Login error' +
            '&errorDescription=Invalid credentials: email/password combination' +
            ' do not match an existing user',
        }),
      )
      .forRoutes({ path: 'api/user/login', method: RequestMethod.POST })
      .apply(
        upload.single('avatar'),
        passport.authenticate('registration', {
          failureRedirect:
            '/error' +
            '?errorTitle=Registration error' +
            '&errorDescription=User with the same email/username/phone already exists',
        }),
      )
      .forRoutes({ path: '/api/user/signup', method: RequestMethod.GET });
  }
}
