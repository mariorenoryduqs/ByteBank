import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CaracteristicaProdutoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O Nome da característica deve ser preenchido' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'A Descrição da característica deve ser preenchida' })
  descricao: string;
}

export class ImagemProdutoDTO {
  @IsUrl({ message: 'URL da imagem inválida' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'A Descrição da imagem deve ser preenchida' })
  descricao: string;
}

export class CriaProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome do produto deve ser preenchido' })
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'Apenas aceitos valores maiores que zero' })
  valor: number;

  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  quantidade: number;

  @IsString()
  @IsNotEmpty({ message: 'Descrição do produto deve ser preenchida' })
  @MaxLength(1000, {
    message: 'Descrição deve conter 1000 caracteres, no máximo',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto deve ser preenchida' })
  categoria: string;
}
