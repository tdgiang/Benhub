import { Module } from '@nestjs/common';
import { PostsService } from './application/posts.service';
import { PostsController } from './interface/posts.controller';
import { PostsRepository } from './infrastructure/posts.repository';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsService],
})
export class PostsModule {}
