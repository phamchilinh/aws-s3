import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceS3 {
  async getPresignedURL(bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Expires: 5 * 60,
    };
    console.log('keyyyy : ', name);
    const url = s3.getSignedUrl('putObject', params);
    return url;
  }

  getS3() {
    console.log('AWS_ACCESS_KEY_ID: ', process.env.AWS_ACCESS_KEY_ID);
    console.log('AWS_SECRET_ACCESS_KEY: ', process.env.AWS_SECRET_ACCESS_KEY);
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
}
