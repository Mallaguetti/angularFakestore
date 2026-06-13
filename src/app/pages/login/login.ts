import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Fakestore, Produto } from '../../services/fakestore';

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
    // A API FakeStore aceita qualquer par de usuário/senha para teste,
    // mas recomendo usar: username: "mor_2314", password: "83r5^_"
    this.service.login(this.username, this.password).subscribe({
      next: (res) => {
        // Salva token e um ID fictício (usuário fixo para teste: id=1)
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', '1');
        this.carregando = false;
        this.router.navigate(['/perfil']);
      },
      error: () => {
        this.erro = 'Usuário ou senha inválidos. Tente: mor_2314 / 83r5^_';
        this.carregando = false;
      }
    });
  }
}
