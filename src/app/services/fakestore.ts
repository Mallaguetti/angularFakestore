import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Produto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Usuario {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: { lat: string; long: string };
  };
  phone: string;
}

@Injectable({
  providedIn: 'root',
})

export class Fakestore {
  private baseUrl = 'https://fakestoreapi.com';
  private http = inject(HttpClient);

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/products`);
  }

  buscarProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/products/${id}`);
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, {
      username,
      password,
    });
  }

  obterUsuario(userId: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/users/${userId}`);
  }
}
