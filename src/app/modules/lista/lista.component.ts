import { Component } from '@angular/core';
import { ListaService } from './service/lista.service';
import { Subject, takeUntil } from 'rxjs';
import{ switchMap } from 'rxjs/operators';
import { Pessoa } from '../cadastro/models/pessoa';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {

  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf',  'acoes'];
  dataSource: Pessoa[] = [];
  private readonly unsubscribeAll: Subject<any> = new Subject();
    
  constructor(
    private readonly service: ListaService,
    private readonly router: Router,
    private readonly _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.retornaDadosATabela();
    this.getListaDePessoas();
  }

  private getListaDePessoas(): void {
    this.service.getListaDeUsuarios()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (pessoas: Pessoa[]) => {
          this.adicionaDadoATabela(pessoas);
        },
        error: err => console.log(err)
    })
  }

  public editar(id: number): void { 
    this.router.navigate(['editar', id]);
  }

  public deletar(pessoa: Pessoa): void { 
    this.service.deletePessoa(pessoa.id)
      .pipe(
        switchMap(
          () => this.service.getListaDeUsuarios()
        ),
        takeUntil(this.unsubscribeAll))
      .subscribe({
        next: _ => {
          const index = this.dataSource.indexOf(pessoa);
          this.dataSource.splice(index, 1);
          this.adicionaDadoATabela(this.dataSource);
          this.openSnackBar('Usuário deletado com sucesso!', 'Fechar');
        },
        error: err => console.log(err)
        
    })
  }

    private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
    }
  
  private adicionaDadoATabela(pessoas: Pessoa[]): void {
    this.service.setTabelaBS(pessoas);
  }

  private retornaDadosATabela(): void {
    this.service.getTabelaBS()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (pessoas: Pessoa[]) => {
          console.log('valor alterado', pessoas)
          this.dataSource = pessoas;
        },
        error: err => console.log(err)
    })
  }
}
