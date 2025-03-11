import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { UsuarioService } from '../usuario.service';
export declare class EmailEhUnicoValidator implements ValidatorConstraintInterface {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    validate(value: any, _validationArguments?: ValidationArguments): Promise<boolean>;
}
export declare const EmailEhUnico: (opcoesDeValidacao: ValidationOptions) => (objeto: Object, propriedade: string) => void;
