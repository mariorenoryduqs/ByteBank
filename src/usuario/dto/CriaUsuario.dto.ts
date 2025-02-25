import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'Nome não preenchido' })
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailEhUnico({ message: 'E-mail já existente' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter, no mínimo, 6 caracteres' })
  senha: string;
}
