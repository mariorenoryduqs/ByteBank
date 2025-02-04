
export enum TipoTransacao {
    DEPOSITO = "Depósito",
    TRANSFERENCIA = "Transferência",
    PAGAMENTO_BOLETO = "Pagamento de Boleto"
}

export type GrupoTransacao = {
    label: string;
    transacoes: Transacao[];
}



export class Transacao  {
    private tipoTransacao: TipoTransacao;
    private valor: number;
    private data: Date = new Date();
    private titular_origem : string;
    private titular_destino : string;

    getTransacao() : Transacao[]{
        return JSON.parse(localStorage.getItem("transacoes"), (key: string, value: any) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }) || [];
    }

    getTipoTransacao() : TipoTransacao {

        return this.tipoTransacao;
    }

    getValorTransacao() : number {

        return this.valor;
    }

    getData() : Date {
       return this.data;
    }

    getTitularOrigem(){
        return this.titular_origem;
    }

    getTitularDestino(){
        return this.titular_destino;
    }


    setValorTransacao(valor: number){

        this.valor = valor;
    }

    setTransacao(valor: number, data: Date, tipotransacao: TipoTransacao){
        this.setValorTransacao(valor);
        this.setData(data);
        this.setTipoTransacao(tipotransacao);
    }

    setData(data: Date){
        this.data = data;
    }

    setTipoTransacao(tipoTransacao: TipoTransacao){
        this.tipoTransacao = tipoTransacao;
    }

    setTitularOrigem(){
        this.titular_origem = this.titular_origem;
    }

    setTitularDestino(){
        this.titular_destino = this.titular_destino;
    }


    static fromJSON(obj: any): Transacao {
        return new Transacao(obj.valor, obj.data, obj.tipoTransacao, obj.titularOrigem, obj.titularDestino);
    }

    /*constructor(nome: string) {
        this.titular = nome;
    }*/
   constructor(valor:number, data: Date, tipoTransacao: TipoTransacao, titularOrigem: string, titularDestino: string){
        this.valor = valor;
        this.data = data;
        this.tipoTransacao = tipoTransacao;
        this.titular_destino = titularDestino;
        this.titular_origem = titularOrigem;
    }
}

//const novaTransacao = new Transacao();

//export default novaTransacao;


