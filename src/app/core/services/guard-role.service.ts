import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserLogService } from 'src/app/user-log/user-log.service';

@Injectable({
  providedIn: 'root'
})
export class GuardRoleService implements CanActivate {

  constructor(
    private readonly userService: UserLogService,
    private readonly router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let  clerkAccess = ['QR Scan Result','Daily Sales Report'];
    let isClerk = false;
    let isAdmin = false;
    this.userService.currentUser$.pipe(
      tap((user:any)=>{
        if(user.user_type ==='admin'){
          isAdmin = true;
        } else if(user.user_type === 'clerk'){
          isClerk = true;
        }
      })
    ).subscribe();
    let isValidUser = isAdmin || (isClerk && clerkAccess.includes(label));
    if(!isValidUser){
      this.router.navigate(['/home']);
    }
    return isValidUser;
  }
}
