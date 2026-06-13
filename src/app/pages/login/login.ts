import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Fakestore } from '../../services/fakestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private service = inject(Fakestore);
  private cdr = inject(ChangeDetectorRef);

  username = '';
  password = '';
  erro = '';
  carregando = false;

  fazerLogin(): void {
    if (!this.username || !this.password) {
      this.erro = 'Preencha todos os campos.';
      return;
    }
    this.carregando = true;
    this.erro = '';
    this.cdr.detectChanges();

    this.service.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', '1');
        this.carregando = false;
        this.router.navigate(['/perfil']);
        // não precisa de detectChanges aqui pois haverá navegação
      },
      error: () => {
        this.erro = 'Usuário ou senha inválidos. Tente: mor_2314 / 83r5^_';
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
