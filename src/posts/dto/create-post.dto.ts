import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  /**
   * The title of the post
   * @example 'My First Post'
   */
  @IsString()
  @MinLength(3)
  title: string;

  /**
   * The content of the post
   * @example 'This is the content of my first post.'
   */
  @IsString()
  @MinLength(10)
  content: string;

  /**
   * The tag IDs of the post
   * @example ['d290f1ee-6c54-4b01-90e6-d701748f0851']
   */
  @IsArray()
  @IsOptional()
  tagIds: string[];
}
