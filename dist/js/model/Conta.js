import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./Transacao.js";
export class Conta {
    titular;
    dataAbertuda;
    dataEncerramento;
    saldo;
    limite;
    transacoes = [];
    constructor(nome) {
        this.titular = nome;
        this.dataAbertuda = new Date();
        this.limite = 0;
        this.saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
        this.transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }) || [];
    }
    getGruposTransacoes() {
        const gruposTransacoes = [];
        //const listaTransacoes2: Transacao[] = structuredClone(this.transacoes);
        const listaTransacoes = structuredClone(this.transacoes).map(t => Transacao.fromJSON(t));
        console.log(listaTransacoes.map(t => t instanceof Transacao));
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.getData().getTime() - t1.getData().getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.getData().toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    }
    getSaldo() {
        this.saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
        return this.saldo;
    }
    getDataAcesso() {
        return new Date();
    }
    registrarTransacao(novaTransacao) {
        if (novaTransacao.getTipoTransacao() == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.getValorTransacao());
        }
        else if (novaTransacao.getTipoTransacao() == TipoTransacao.TRANSFERENCIA || novaTransacao.getTipoTransacao() == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.getValorTransacao());
            novaTransacao.setValorTransacao(novaTransacao.getValorTransacao() * -1);
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        this.transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(this.transacoes));
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
        this.saldo += valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
    debitar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente!");
        }
        this.saldo -= valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
}
const conta = new Conta("Mario Sergio Renor");
export default conta;
