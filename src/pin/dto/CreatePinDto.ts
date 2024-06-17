import { IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreatePinDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  imageUrl: string;

  @IsUrl()
  sourceUrl: string;

  @IsNumber()
  @IsOptional()
  userId: number;
}
