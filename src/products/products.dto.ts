import { Product } from "./products.entity";

export class ProductDto extends Product {
    categoriesIds: string[]
}