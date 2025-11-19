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
        console.log('load user');
        const stored = localStorage.getItem('user');
        if (stored) {
            const parseData = JSON.parse(stored);
            this._user$.next(parseData);
        }
    }
}
