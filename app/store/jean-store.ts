import { create } from 'zustand';
import { CollectionResponse, JeansProduct } from '@/app/lib/definitions-pb';

interface JeansProductsStore {
  jeansProducts: CollectionResponse<JeansProduct>;
  setProducts: (jeansProducts: CollectionResponse<JeansProduct>) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateProduct: (productId: string, data: Partial<JeansProduct>) => void;
}

const useJeansProductsStore = create<JeansProductsStore>((set) => ({
  jeansProducts: {
    page: 1,
    perPage: 30,
    totalPages: 1,
    totalItems: 0,
    items: [],
  },
  setProducts: (jeansProducts) => set({ jeansProducts }),
  updateProductStock: (productId, newStock) => set((state) => ({
    jeansProducts: {
      ...state.jeansProducts,
      items: state.jeansProducts.items.map((product) =>
        product.id === productId ? { ...product, STOCK: newStock } : product
      ),
    },
  })),
  updateProduct: (productId, data) => set((state) => ({
    jeansProducts: {
      ...state.jeansProducts,
      items: state.jeansProducts.items.map((product) =>
        product.id === productId ? { ...product, ...data } : product
      ),
    },
  })),
}));

export default useJeansProductsStore;