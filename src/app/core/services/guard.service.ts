import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLogService } from 'src/app/user-log/user-log.service';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private readonly userService: UserLogService,
    private readonly cacheService: CacheService,
    private readonly router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.cacheService.loadLocal('userInfo') || state.url === '/home'){
      this.userService.login({}).subscribe();
      return true;
    } else {
      this.router.navigate(['/log-in']);
      return false;
    }
  }
}
