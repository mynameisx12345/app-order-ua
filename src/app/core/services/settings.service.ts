import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings$ = new BehaviorSubject(<Settings>{queueLimit:5});
  constructor() { }
}

interface Settings{
  queueLimit?: number
}