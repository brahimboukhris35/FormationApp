import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private isBrowser: boolean;

  constructor() {
    // Vérifier si l'environnement est un navigateur
    this.isBrowser = typeof window !== 'undefined' && window.localStorage !== undefined;
  }

  setUserId(id: number): void {
    if (this.isBrowser) {
      localStorage.setItem('userId', id.toString());
    }
  }

  getUserId(): number | null {
    if (this.isBrowser) {
      const id = localStorage.getItem('userId');
      return id ? +id : null;
    }
    return null;
  }

  clearUser(): void {
    if (this.isBrowser) {
      localStorage.removeItem('userId');
    }
  }

  setRoleId(id: number): void {
    if (this.isBrowser) {
      localStorage.setItem('roleId', id.toString());
    }
  }

  getRoleId(): number | null {
    if (this.isBrowser) {
      const id = localStorage.getItem('roleId');
      return id ? +id : null;
    }
    return null;
  }

  clearRole(): void {
    if (this.isBrowser) {
      localStorage.removeItem('roleId');
    }
  }
}
