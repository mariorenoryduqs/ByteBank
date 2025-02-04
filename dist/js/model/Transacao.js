export var TipoTransacao;
(function (TipoTransacao) {
    TipoTransacao["DEPOSITO"] = "Dep\u00F3sito";
    TipoTransacao["TRANSFERENCIA"] = "Transfer\u00EAncia";
    TipoTransacao["PAGAMENTO_BOLETO"] = "Pagamento de Boleto";
})(TipoTransacao || (TipoTransacao = {}));
export class Transacao {
    tipoTransacao;
    valor;
    data = new Date();
    titular_origem;
    titular_destino;
    getTransacao() {
        return JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }) || [];
    }
    getTipoTransacao() {
        return this.tipoTransacao;
    }
    getValorTransacao() {
        return this.valor;
    }
    getData() {
        return this.data;
    }
    getTitularOrigem() {
        return this.titular_origem;
    }
    getTitularDestino() {
        return this.titular_destino;
    }
    setValorTransacao(valor) {
        this.valor = valor;
    }
    setTransacao(valor, data, tipotransacao) {
        this.setValorTransacao(valor);
        this.setData(data);
        this.setTipoTransacao(tipotransacao);
    }
    setData(data) {
        this.data = data;
    }
    setTipoTransacao(tipoTransacao) {
        this.tipoTransacao = tipoTransacao;
    }
    setTitularOrigem() {
        this.titular_origem = this.titular_origem;
    }
    setTitularDestino() {
        this.titular_destino = this.titular_destino;
    }
    static fromJSON(obj) {
        return new Transacao(obj.valor, obj.data, obj.tipoTransacao, obj.titularOrigem, obj.titularDestino);
    }
    /*constructor(nome: string) {
        this.titular = nome;
    }*/
    constructor(valor, data, tipoTransacao, titularOrigem, titularDestino) {
        this.valor = valor;
        this.data = data;
        this.tipoTransacao = tipoTransacao;
        this.titular_destino = titularDestino;
        this.titular_origem = titularOrigem;
    }
}
//const novaTransacao = new Transacao();
//export default novaTransacao;
