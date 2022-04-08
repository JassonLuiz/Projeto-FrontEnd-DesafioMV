export class Contribuinte {

    id: number;
    nome: string;
    cpf: string;
    item: string;
    dataCafe: string;

    constructor(nome: string, cpf: string, item: string, dataCafe: string){
        this.nome = nome;
        this.cpf = cpf;
        this.item = item;
        this.dataCafe = dataCafe;
    }
}