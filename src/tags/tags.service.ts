import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.tag.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.tag.findUniqueOrThrow({ where: { id } });
  }

  async create(createTagDto: CreateTagDto) {
    return await this.prisma.tag.create({ data: createTagDto });
  }

  async remove(id: string) {
    await this.prisma.tag.delete({ where: { id } });
    return { success: true };
  }
}
