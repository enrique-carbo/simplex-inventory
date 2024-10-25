import { create } from 'zustand';
import { CollectionResponse, JacketProduct } from '@/app/lib/definitions-pb';

interface JacketsProductsStore {
  jacketsProducts: CollectionResponse<JacketProduct>;
  setProducts: (jacketsProducts: CollectionResponse<JacketProduct>) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateProduct: (productId: string, data: Partial<JacketProduct>) => void;
}

const useJacketsProductsStore = create<JacketsProductsStore>((set) => ({
  jacketsProducts: {
    page: 1,
    perPage: 30,
    totalPages: 1,
    totalItems: 0,
    items: [],
  },
  setProducts: (jacketsProducts) => set({ jacketsProducts }),
  updateProductStock: (productId, newStock) => set((state) => ({
    jacketsProducts: {
      ...state.jacketsProducts,
      items: state.jacketsProducts.items.map((product) =>
        product.id === productId ? { ...product, STOCK: newStock } : product
      ),
    },
  })),
  updateProduct: (productId, data) => set((state) => ({
    jacketsProducts: {
      ...state.jacketsProducts,
      items: state.jacketsProducts.items.map((product) =>
        product.id === productId ? { ...product, ...data } : product
      ),
    },
  })),
}));

export default useJacketsProductsStore;
