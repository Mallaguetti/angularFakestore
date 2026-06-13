import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Fakestore, Usuario } from '../../services/fakestore';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  private router = inject(Router);
  private service = inject(Fakestore);
  private cdr = inject(ChangeDetectorRef);

  usuario: Usuario | null = null;
  carregando = true;
  erro = '';

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!userId || !token) {
      this.router.navigate(['/login']);
      return;
    }
    this.service.obterUsuario(Number(userId)).subscribe({
      next: (user) => {
        this.usuario = user;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erro = 'Erro ao carregar dados. Faça login novamente.';
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
