import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar">
      <a routerLink="/" class="logo">🛍️ FakeStore</a>
      <div class="nav-links">
        <a routerLink="/">Início</a>
        <a routerLink="/login">Entrar</a>
        <a routerLink="/perfil">Meu Perfil</a>
      </div>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #1b5e20;
        padding: 0 2rem;
        color: white;
        height: 60px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .logo {
        font-size: 1.5rem;
        font-weight: 700;
        text-decoration: none;
        color: white;
      }
      .nav-links a {
        color: white;
        text-decoration: none;
        margin-left: 1.5rem;
        font-weight: 500;
        transition: opacity 0.2s;
      }
      .nav-links a:hover {
        opacity: 0.8;
      }
      main {
        min-height: calc(100vh - 60px);
        background: #f5f7fa;
      }
    `,
  ],
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fakestoreAngular');
}
