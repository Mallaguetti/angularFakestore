import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Fakestore, Produto } from '../../services/fakestore';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private service = inject(Fakestore);
  private cdr = inject(ChangeDetectorRef);

  produtos: Produto[] = [];
  carregando = false;
  erro = '';

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.erro = '';
    this.produtos = [];
    this.cdr.detectChanges(); // feedback imediato

    this.service.listarProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erro = 'Erro ao carregar produtos.';
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
