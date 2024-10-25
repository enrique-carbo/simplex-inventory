import { create } from 'zustand';
import { CollectionResponse, ShortsProduct } from '@/app/lib/definitions-pb';

interface shortsProductsStore {
  shortsProducts: CollectionResponse<ShortsProduct>;
  setProducts: (shortsProducts: CollectionResponse<ShortsProduct>) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateProduct: (productId: string, data: Partial<ShortsProduct>) => void;
}

const useshortsProductsStore = create<shortsProductsStore>((set) => ({
  shortsProducts: {
    page: 1,
    perPage: 30,
    totalPages: 1,
    totalItems: 0,
    items: [],
  },
  setProducts: (shortsProducts) => set({ shortsProducts }),
  updateProductStock: (productId, newStock) => set((state) => ({
    shortsProducts: {
      ...state.shortsProducts,
      items: state.shortsProducts.items.map((product) =>
        product.id === productId ? { ...product, STOCK: newStock } : product
      ),
    },
  })),
  updateProduct: (productId, data) => set((state) => ({
    shortsProducts: {
      ...state.shortsProducts,
      items: state.shortsProducts.items.map((product) =>
        product.id === productId ? { ...product, ...data } : product
      ),
    },
  })),
}));

export default useshortsProductsStore;
