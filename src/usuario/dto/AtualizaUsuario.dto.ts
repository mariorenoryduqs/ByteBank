import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class AtualizaUsuarioDTO {
  @IsNotEmpty({ message: 'Nome não preenchido' })
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailEhUnico({ message: 'E-mail já existente' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha precisa ter, no mínimo, 6 caracteres' })
  @IsOptional()
  senha: string;
}
