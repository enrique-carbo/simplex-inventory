import { create } from 'zustand';
import { CollectionResponse, CapsProduct } from '@/app/lib/definitions-pb';

interface CapsProductsStore {
  capsProducts: CollectionResponse<CapsProduct>;
  setProducts: (capsProducts: CollectionResponse<CapsProduct>) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateProduct: (productId: string, data: Partial<CapsProduct>) => void;
}

const useCapsProductsStore = create<CapsProductsStore>((set) => ({
  capsProducts: {
    page: 1,
    perPage: 30,
    totalPages: 1,
    totalItems: 0,
    items: [],
  },
  setProducts: (capsProducts) => set({ capsProducts }),
  updateProductStock: (productId, newStock) => set((state) => ({
    capsProducts: {
      ...state.capsProducts,
      items: state.capsProducts.items.map((product) =>
        product.id === productId ? { ...product, STOCK: newStock } : product
      ),
    },
  })),
  updateProduct: (productId, data) => set((state) => ({
    capsProducts: {
      ...state.capsProducts,
      items: state.capsProducts.items.map((product) =>
        product.id === productId ? { ...product, ...data } : product
      ),
    },
  })),
}));

export default useCapsProductsStore;
