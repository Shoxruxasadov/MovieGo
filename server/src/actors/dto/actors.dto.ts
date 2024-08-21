import { IsNotEmpty } from 'class-validator';

export class ActorsDto {
  @IsNotEmpty()
  name: string;

  role: string | null;

  @IsNotEmpty()
  image: string;
}
