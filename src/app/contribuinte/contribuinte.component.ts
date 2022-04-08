import { Component, OnInit } from '@angular/core';
import { ContribuinteService } from '../contribuinte.service';
import { Contribuinte } from './contribuinte';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contribuinte',
  templateUrl: './contribuinte.component.html',
  styleUrls: ['./contribuinte.component.css']
})
export class ContribuinteComponent implements OnInit {

  formulario: FormGroup;
  contribuintes: Contribuinte[] = [];
  colunas: string[] = ['id', 'nome', 'cpf', 'item', 'dataCafe', 'actionsColumn'];
  dataSource = new MatTableDataSource<Contribuinte>();
 
  constructor(
    private service: ContribuinteService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.criaFormulario();
    this.listarContribuintes();
  }

  criaFormulario(){
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataCafe: ['', Validators.required],
      item: ['', Validators.required]
    })
  }

  listarContribuintes(){
    this.service.listar().subscribe( response => {
      this.contribuintes = response;
    })
  }

  submite(){
    const formValor = this.formulario.value;
    const contribuinte: Contribuinte = new Contribuinte(formValor.nome, formValor.cpf, formValor.item, formValor.dataCafe);
    this.service.salvar(contribuinte).subscribe( response =>{
      let lista: Contribuinte[] = [ ... this.contribuintes, response];
      this.contribuintes = lista;
      location.reload();
    })
  }
    
  deletar(id) {
    this.service.deletar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Contribuinte) => u.id !== id
      );
      location.reload();
    });
  }
  
  
}
