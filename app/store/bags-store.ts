import { create } from 'zustand';
import { CollectionResponse, BagsProduct } from '@/app/lib/definitions-pb';

interface BagsProductsStore {
  bagsProducts: CollectionResponse<BagsProduct>;
  setProducts: (bagsProducts: CollectionResponse<BagsProduct>) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateProduct: (productId: string, data: Partial<BagsProduct>) => void;
}

const useBagsProductsStore = create<BagsProductsStore>((set) => ({
  bagsProducts: {
    page: 1,
    perPage: 30,
    totalPages: 1,
    totalItems: 0,
    items: [],
  },
  setProducts: (bagsProducts) => set({ bagsProducts }),
  updateProductStock: (productId, newStock) => set((state) => ({
    bagsProducts: {
      ...state.bagsProducts,
      items: state.bagsProducts.items.map((product) =>
        product.id === productId ? { ...product, STOCK: newStock } : product
      ),
    },
  })),
  updateProduct: (productId, data) => set((state) => ({
    bagsProducts: {
      ...state.bagsProducts,
      items: state.bagsProducts.items.map((product) =>
        product.id === productId ? { ...product, ...data } : product
      ),
    },
  })),
}));

export default useBagsProductsStore;
