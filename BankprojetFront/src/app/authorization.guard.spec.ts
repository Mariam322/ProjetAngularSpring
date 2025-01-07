import { TestBed } from '@angular/core/testing';
import { AuthorizationGuard } from './authorization.guard'; // Assurez-vous que le chemin est correct
import { AuthService } from 'src/services/auth.service'; // Assurez-vous que le chemin du service est correct
import { Router } from '@angular/router'; // Assurez-vous d'importer le Router

describe('AuthorizationGuard', () => {
  let guard: AuthorizationGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorizationGuard, // Déclare le guard pour l'injecter
        { provide: AuthService, useValue: { isAuthenticated: true } }, // Mock du AuthService
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy() } } // Mock du Router
      ]
    });
    guard = TestBed.inject(AuthorizationGuard); // Injection du guard
    authService = TestBed.inject(AuthService); // Injection du AuthService
    router = TestBed.inject(Router); // Injection du Router
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();  // Vérifie que le guard est créé correctement
  });

  it('should allow activation if authenticated', () => {
    authService.isAuthenticated = true; // Authentification réussie
    const result = guard.canActivate(null as any, null as any); // Simule l'appel de canActivate
    expect(result).toBeTrue(); // Devrait permettre l'accès
  });

  it('should redirect to access-denied if not authenticated', () => {
    authService.isAuthenticated = false; // Authentification échouée
    const result = guard.canActivate(null as any, null as any); // Simule l'appel de canActivate
    expect(router.navigateByUrl).toHaveBeenCalledWith('/admin/access-denied'); // Vérifie que la redirection a eu lieu
    expect(result).toBeFalse(); // Devrait interdire l'accès
  });

  it('should check canActivateChild and allow access if authenticated', () => {
    authService.isAuthenticated = true; // Authentification réussie
    const result = guard.canActivateChild(null as any, null as any); // Simule l'appel de canActivateChild
    expect(result).toBeTrue(); // Devrait permettre l'accès
  });

  it('should check canActivateChild and deny access if not authenticated', () => {
    authService.isAuthenticated = false; // Authentification échouée
    const result = guard.canActivateChild(null as any, null as any); // Simule l'appel de canActivateChild
    expect(result).toBeFalse(); // Devrait interdire l'accès
  });
});
