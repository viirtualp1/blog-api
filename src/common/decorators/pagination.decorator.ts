import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationParams } from '../../posts/dto/query-posts.dto';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationParams => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const page = parseInt(request.query.page as string, 10) || 1;
    const limit = parseInt(request.query.limit as string, 10) || 10;

    const skip = (page - 1) * limit;

    return {
      page,
      limit,
      skip,
      take: limit,
    };
  },
);
