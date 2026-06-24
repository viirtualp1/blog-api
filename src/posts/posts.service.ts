import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TagsService } from '../tags/tags.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import type { PaginationParams } from './dto/query-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    private tagsService: TagsService,
    private prisma: PrismaService,
  ) {}

  async findAll(pagination: PaginationParams) {
    const { page, limit, skip, take } = pagination;

    const [data, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take,
        orderBy: { id: 'desc' },
      }),
      this.prisma.post.count(),
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: string) {
    return await this.prisma.post.findUniqueOrThrow({
      where: { id },
    });
  }

  async create(body: CreatePostDto) {
    if (body.tagIds && body.tagIds.length > 0) {
      for (const tagId of body.tagIds) {
        try {
          await this.tagsService.findOne(tagId);
        } catch {
          throw new NotFoundException(`Tag with id ${tagId} not found`);
        }
      }
    }

    return await this.prisma.post.create({ data: body });
  }

  async update(id: string, body: UpdatePostDto) {
    if (body.tagIds && body.tagIds.length > 0) {
      for (const tagId of body.tagIds) {
        try {
          await this.tagsService.findOne(tagId);
        } catch {
          throw new NotFoundException(`Tag with id ${tagId} not found`);
        }
      }
    }

    return await this.prisma.post.update({
      where: { id },
      data: body,
    });
  }

  async remove(id: string) {
    await this.prisma.post.delete({ where: { id } });
    return { success: true };
  }
}
