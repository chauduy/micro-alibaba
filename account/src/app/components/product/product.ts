import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteProduct } from '@app/type';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product.html',
    styleUrl: './product.scss',
})
export class Product {
    @Input() product: FavoriteProduct | null = null;
    @Input() isHideInfo: boolean = false;

    goToProduct(product_id: number) {
        window.parent.postMessage({ type: 'go-to-product', product_id }, '*');
    }
}
