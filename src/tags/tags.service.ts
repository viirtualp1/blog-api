import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  tags = new Map<string, CreateTagDto>();

  findAll() {
    return Array.from(this.tags.entries(), ([id, tag]) => ({
      id,
      ...tag,
    }));
  }

  findOne(id: string) {
    const tag = this.tags.get(id);
    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }

    return tag;
  }

  create(createTagDto: CreateTagDto) {
    const id = uuidv4();
    this.tags.set(id, createTagDto);

    return {
      id,
      ...createTagDto,
    };
  }

  remove(id: string) {
    const tag = this.tags.get(id);
    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }

    this.tags.delete(id);

    return {
      id,
      ...tag,
    };
  }
}
