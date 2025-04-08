export type CampoFormulario<T> = {
    nome: keyof T;
    tipo: string;
    label: string;
    placeholder?: string;
    required?: boolean;
  };
  
export type PropsFormulario<T> = {
    campos: CampoFormulario<T>[];
    valores: T;
    setValores: React.Dispatch<React.SetStateAction<T>>;
    onSubmit: (evento: React.FormEvent<HTMLElement>) => void;
    tituloBotao?: string;
  };
  