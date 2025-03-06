import { create } from 'zustand';
import { CollectionResponse, RemerasMangasLargasProduct } from '@/app/lib/definitions-pb';

interface RemerasMangasLargasProductsStore {
  remerasLargasProducts: CollectionResponse<RemerasMangasLargasProduct>;
  setProducts: (remerasLargasProducts: CollectionResponse<RemerasMangasLargasProduct>) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateProduct: (productId: string, data: Partial<RemerasMangasLargasProduct>) => void;
}

const useRemerasMangasLargasProductsStore = create<RemerasMangasLargasProductsStore>((set) => ({
  remerasLargasProducts: {
    page: 1,
    perPage: 30,
    totalPages: 1,
    totalItems: 0,
    items: [],
  },
  setProducts: (remerasLargasProducts) => set({ remerasLargasProducts }),
  updateProductStock: (productId, newStock) => set((state) => ({
    remerasLargasProducts: {
      ...state.remerasLargasProducts,
      items: state.remerasLargasProducts.items.map((product) =>
        product.id === productId ? { ...product, STOCK: newStock } : product
      ),
    },
  })),
  updateProduct: (productId, data) => set((state) => ({
    remerasLargasProducts: {
      ...state.remerasLargasProducts,
      items: state.remerasLargasProducts.items.map((product) =>
        product.id === productId ? { ...product, ...data } : product
      ),
    },
  })),
}));

export default useRemerasMangasLargasProductsStore;
