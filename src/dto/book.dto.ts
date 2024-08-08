import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  publicationDate: Date;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  genres: string[];
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  publicationDate?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];
}
