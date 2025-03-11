import { CaracteristicaProdutoDTO, ImagemProdutoDTO } from './CriaProduto.dto';
export declare class AtualizaProdutoDTO {
    usuarioId: string;
    nome: string;
    valor: number;
    quantidade: number;
    descricao: string;
    caracteristicas: CaracteristicaProdutoDTO[];
    imagens: ImagemProdutoDTO[];
    categoria: string;
}
