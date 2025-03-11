import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class AtualizaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailEhUnico({ message: 'E-mail já cadastrado' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha precisa ter 6 caracteres ou mais' })
  @IsOptional()
  senha: string;
}
