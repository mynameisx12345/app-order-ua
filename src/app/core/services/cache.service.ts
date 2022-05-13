import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  saveSession(data:SaveOptions){
    data.expirationMins = data.expirationMins || 0;
    const expirationMs = data.expirationMins > 0 ? data.expirationMins * 60 * 1000 : 0;

    const rec = {
      value: typeof data.content === 'string' ? data.content : JSON.stringify(data.content),
      expiration: expirationMs > 0 ? new Date().getTime() + expirationMs : null,
      hasExpiration : expirationMs > 0
    }

    sessionStorage.setItem(data.key, JSON.stringify(rec));
  }

  loadSession(key:string){
    const item = sessionStorage.getItem(key);
    if(item !== null){
      const rec = JSON.parse(item);
      const now = new Date().getTime();

      if(!rec || (rec.hasExpiration && rec.expiration <= now) ){
        return null;
      } else {
        return JSON.parse(rec.value)
      }
    }
    return null;
  }

  saveLocal(data: SaveOptions){
    data.expirationMins = data.expirationMins || 0;
    const expirationMs = data.expirationMins > 0 ? data.expirationMins * 60 * 1000 : 0;

    const rec = {
      value: typeof data.content === 'string' ? data.content : JSON.stringify(data.content),
      expiration: expirationMs > 0 ? new Date().getTime() + expirationMs : null,
      hasExpiration : expirationMs > 0
    }

    localStorage.setItem(data.key, JSON.stringify(rec));
  }

  loadLocal(key:string){
    const item = localStorage.getItem(key);
    if(item !== null){
      const rec = JSON.parse(item);
      const now = new Date().getTime();

      if(!rec || (rec.hasExpiration && rec.expiration <= now) ){
        return null;
      } else {
        return JSON.parse(rec.value)
      }
    }
    return null;
  }

  removeLocal(key:string){
    localStorage.removeItem(key);
  }
}

interface SaveOptions{
  key: string;
  content?: any;
  expirationMins?:number;
}