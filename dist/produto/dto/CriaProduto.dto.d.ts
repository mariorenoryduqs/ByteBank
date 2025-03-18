import { ProdutoEntity } from '../produto.entity';
export declare class CaracteristicaProdutoDTO {
    id: string;
    nome: string;
    descricao: string;
    produto: ProdutoEntity;
}
export declare class ImagemProdutoDTO {
    id: string;
    url: string;
    descricao: string;
    produto: ProdutoEntity;
}
export declare class CriaProdutoDTO {
    usuarioId: string;
    fornecedorId: string;
    nome: string;
    valor: number;
    quantidade: number;
    descricao: string;
    caracteristicas: CaracteristicaProdutoDTO[];
    imagens: ImagemProdutoDTO[];
    categoria: string;
}
