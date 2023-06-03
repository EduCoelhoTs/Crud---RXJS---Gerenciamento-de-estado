import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CadastroService } from './service/cadastro.service';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from './models/pessoa';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit, OnDestroy {

  public form!: FormGroup<any>;
  private readonly unsubscribeAll: Subject<any> = new Subject();
  public spinner: boolean = false;
  public id!: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly service: CadastroService,
    private readonly _snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.id = +this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.initForm();
    if (this.id) {
      this.getPessoaParaEdicao();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }


  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  private loadForm(data: Pessoa): void {
    this.form.patchValue({
      nome: data?.nome,
      cpf: data?.cpf,
      email: data?.email
    })
  }

  private getPessoaParaEdicao(): void {
    this.service.getPessoaPorId(this.id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
      next: (pessoa: Pessoa) => {
        this.loadForm(pessoa);
        },
        error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  public cadastrar(): void {
    this.spinner = true;
    this.service.cadastraPessoa(this.form.value)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: _ => {
          this.form.reset();
          this.openSnackBar('Cadastro realizado com sucesso!', 'Fechar');
          this.router.navigate(['']);
          this.spinner = false;
        },
        error: err => console.log(err)
    })
  }

  public editar(): void {
    this.service.editarPessoa(this.id, this.form.value)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: _ => {
          this.form.reset();
          this.openSnackBar('Edição realizada com sucesso!', 'Fechar');
          this.router.navigate(['']);
          this.spinner = false;
        },
        error: err => console.log(err)
    })
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
