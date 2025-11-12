import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FavoriteProduct } from '../type';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from 'lib/firebase';

@Injectable({ providedIn: 'root' })
export class FavoriteStore {
    private readonly _favoriteList$ = new BehaviorSubject<FavoriteProduct[] | null>(null);
    readonly favoriteList$ = this._favoriteList$.asObservable();
    get favoriteList(): FavoriteProduct[] | null {
        return this._favoriteList$.value;
    }

    setList(list: FavoriteProduct[] | null) {
        this._favoriteList$.next(list);
    }

    async loadFavoriteList(uid: string) {
        try {
            const listRef = doc(db, 'customers', uid, 'favorite', 'listData');
            const listSnap = await getDoc(listRef);

            if (listSnap.exists()) {
                const data = listSnap.data();
                const items = data?.['list'];
                this._favoriteList$.next(Array.isArray(items) ? items : []);
            } else {
                this._favoriteList$.next([]);
            }
        } catch (error) {
            console.error(error);
            this._favoriteList$.next([]);
        }
    }

    async removeFromList(id: number, uid: string) {
        const currentList = this.favoriteList ?? [];
        const updatedList = currentList.filter((item) => item?.id !== id);
        this._favoriteList$.next(updatedList);

        try {
            const favoriteRef = doc(db, 'customers', uid, 'favorite', 'listData');
            await setDoc(favoriteRef, { list: updatedList }, { merge: true });
        } catch (error) {
            console.error('Failed to update favorite list in Firestore:', error);
        }
    }
}
