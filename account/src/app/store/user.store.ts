import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../type';

@Injectable({ providedIn: 'root' })
export class UserStore {
    private readonly _user$ = new BehaviorSubject<User | null>(null);
    readonly user$ = this._user$.asObservable();
    get user(): User | null {
        return this._user$.value;
    }

    setUser(user: User) {
        this._user$.next(user);
    }

    async loadUser() {
        window.addEventListener('message', (e) => {
            if (e.data?.type === 'set-user') {
                this._user$.next(e.data.payload);
            }
        });

        if (window.parent && window.parent !== window) {
            window.parent.postMessage({ type: 'request-user' }, '*');
        }
    }
}
