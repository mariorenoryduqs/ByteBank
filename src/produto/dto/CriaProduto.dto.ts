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
import { ProdutoEntity } from '../produto.entity';

export class CaracteristicaProdutoDTO {
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Favor preencher o Nome da cadasterística' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Favor preencher a Descrição da característica' })
  descricao: string;

  produto: ProdutoEntity;
}

export class ImagemProdutoDTO {
  id: string;

  @IsUrl({ message: 'URL da imagem inválida' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Favor preencher a Descrição da imagem' })
  descricao: string;

  produto: ProdutoEntity;
}

export class CriaProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsString()
  @IsNotEmpty({ message: 'Favor preencher o Nome do produto' })
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O valor precisa ser positivo' })
  valor: number;

  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  quantidade: number;

  @IsString()
  @IsNotEmpty({ message: 'Favor informar a Descrição do produto' })
  @MaxLength(1000, {
    message: 'A Descrição não pode exceder 1000 caracteres',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Favor informar a Categoria do produto' })
  categoria: string;
}
