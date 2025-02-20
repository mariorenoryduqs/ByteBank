import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome deve ser preenchido' })
  nome: string;

  @IsEmail(undefined, { message: 'E-mail inválido' })
  @EmailEhUnico({ message: 'E-Mail já cadastrado' })
  email: string;

  @MinLength(6, { message: 'A senha deve conter 6 caracteres, no mínimo' })
  senha: string;
}
