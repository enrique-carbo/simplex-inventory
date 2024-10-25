import { create } from 'zustand';
import { CollectionResponse, PoloShirtProduct } from '@/app/lib/definitions-pb';

interface PoloShirtsProductsStore {
  poloShirtsProducts: CollectionResponse<PoloShirtProduct>;
  setProducts: (poloShirtsProducts: CollectionResponse<PoloShirtProduct>) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateProduct: (productId: string, data: Partial<PoloShirtProduct>) => void;
}

const usePoloShirtsProductsStore = create<PoloShirtsProductsStore>((set) => ({
  poloShirtsProducts: {
    page: 1,
    perPage: 30,
    totalPages: 1,
    totalItems: 0,
    items: [],
  },
  setProducts: (poloShirtsProducts) => set({ poloShirtsProducts }),
  updateProductStock: (productId, newStock) => set((state) => ({
    poloShirtsProducts: {
      ...state.poloShirtsProducts,
      items: state.poloShirtsProducts.items.map((product) =>
        product.id === productId ? { ...product, STOCK: newStock } : product
      ),
    },
  })),
  updateProduct: (productId, data) => set((state) => ({
    poloShirtsProducts: {
      ...state.poloShirtsProducts,
      items: state.poloShirtsProducts.items.map((product) =>
        product.id === productId ? { ...product, ...data } : product
      ),
    },
  })),
}));

export default usePoloShirtsProductsStore;