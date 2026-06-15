import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [TagsModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
