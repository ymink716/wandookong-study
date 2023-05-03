import { SetMetadata } from '@nestjs/common';

// TODO: config 작성 후 하드코딩 값 변경
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
