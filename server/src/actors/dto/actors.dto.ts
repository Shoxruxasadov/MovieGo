import { IsNotEmpty } from 'class-validator';

export class ActorsDto {
  @IsNotEmpty()
  name: string | null;

  role: string | null;

  @IsNotEmpty()
  image: string;
}
