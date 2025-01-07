import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './authentication.guard';  // Assurez-vous que le chemin est correct

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard] // Déclare le guard pour l'injecter
    });
    guard = TestBed.inject(AuthGuard);  // Injection du guard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();  // Vérifie que le guard est créé correctement
  });
});
