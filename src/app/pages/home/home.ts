import { Component, inject, OnInit } from '@angular/core';
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

export class Home implements OnInit{
    private service = inject(Fakestore);
  produtos: Produto[] = [];
  carregando = false;
  erro = '';

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.service.listarProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Erro ao carregar produtos.';
        this.carregando = false;
      }
    });
  }
}
