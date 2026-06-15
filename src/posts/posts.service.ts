import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TagsService } from '../tags/tags.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationParams } from './pagination.decorator';

@Injectable()
export class PostsService {
  constructor(private tagsService: TagsService) {}

  posts = new Map<string, CreatePostDto>();

  findAll(pagination: PaginationParams) {
    const { page, limit } = pagination;

    const posts = Array.from(this.posts.entries(), ([id, post]) => ({
      id,
      ...post,
    }));

    return posts.slice((page - 1) * limit, page * limit);
  }

  findOne(id: string) {
    const post = this.posts.get(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  create(body: CreatePostDto) {
    const id = uuidv4();

    if (body.tagIds && body.tagIds.length > 0) {
      body.tagIds.forEach((tagId) => {
        const tag = this.tagsService.findOne(tagId);
        if (!tag) {
          throw new NotFoundException(`Tag with id ${tagId} not found`);
        }
      });
    }

    this.posts.set(id, body);

    return {
      id,
      ...body,
    };
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    const post = this.posts.get(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    if (updatePostDto.tagIds && updatePostDto.tagIds.length > 0) {
      updatePostDto.tagIds.forEach((tagId) => {
        const tag = this.tagsService.findOne(tagId);
        if (!tag) {
          throw new NotFoundException(`Tag with id ${tagId} not found`);
        }
      });
    }

    const updatedPost = { ...post, ...updatePostDto };
    this.posts.set(id, updatedPost);

    return updatedPost;
  }

  remove(id: string) {
    const post = this.posts.get(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    this.posts.delete(id);

    return { success: true };
  }
}
