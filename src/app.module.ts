import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), PostsModule, TagsModule, PrismaModule],
  controllers: [],
  providers: [PrismaModule],
})
export class AppModule {}
