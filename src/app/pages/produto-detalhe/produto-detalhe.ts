import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Fakestore, Produto } from '../../services/fakestore';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './produto-detalhe.html',
  styleUrl: './produto-detalhe.css',
})
export class ProdutoDetalhe implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(Fakestore);
  
  produto: Produto | null = null;
  carregando = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.buscarProduto(id).subscribe({
      next: (p) => {
        this.produto = p;
        this.carregando = false;
      },
      error: () => this.carregando = false
    });
  }
}
