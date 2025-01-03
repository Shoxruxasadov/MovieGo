import { IsNotEmpty } from 'class-validator';

export class ActorsDto {
  name: string | null;
  role: string | null;

  @IsNotEmpty()
  image: string;
}
