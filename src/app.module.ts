import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [PostsModule, TagsModule],
  controllers: [],
})
export class AppModule {}
