import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ServiceS3 } from './s3/serviceS3';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly serviceS3: ServiceS3,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/presigned')
  getPresignedURL(@Query('fileName') fileName: string): Promise<string> {
    return this.serviceS3.getPresignedURL('imagesbucketss', fileName);
  }
}
