
// Cart state managed by Jotai (without LocalStorage)
import { atomWithStorage } from "jotai/utils";




  interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
    isNew: boolean;
    discountPercentage: number | null;
    tags: string[];
  }



// Persistent cart state using localStorage
export const cartAtom = atomWithStorage<Product[]>("cart", []);

