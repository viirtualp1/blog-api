import { IsString, MinLength } from 'class-validator';

export class CreateTagDto {
  /**
   * The name of the tag
   * @example 'Technology'
   */
  @IsString()
  @MinLength(2)
  name: string;
}
