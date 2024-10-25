import { create } from 'zustand';
import { CollectionResponse, RemerasProduct } from '@/app/lib/definitions-pb';

interface RemerasProductsStore {
  remerasProducts: CollectionResponse<RemerasProduct>;
  setProducts: (remerasProducts: CollectionResponse<RemerasProduct>) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateProduct: (productId: string, data: Partial<RemerasProduct>) => void;
}

const useRemerasProductsStore = create<RemerasProductsStore>((set) => ({
  remerasProducts: {
    page: 1,
    perPage: 30,
    totalPages: 1,
    totalItems: 0,
    items: [],
  },
  setProducts: (remerasProducts) => set({ remerasProducts }),
  updateProductStock: (productId, newStock) => set((state) => ({
    remerasProducts: {
      ...state.remerasProducts,
      items: state.remerasProducts.items.map((product) =>
        product.id === productId ? { ...product, STOCK: newStock } : product
      ),
    },
  })),
  updateProduct: (productId, data) => set((state) => ({
    remerasProducts: {
      ...state.remerasProducts,
      items: state.remerasProducts.items.map((product) =>
        product.id === productId ? { ...product, ...data } : product
      ),
    },
  })),
}));

export default useRemerasProductsStore;
