import { create } from 'zustand';
import { CollectionResponse, CottonSweaterProduct } from '@/app/lib/definitions-pb';

interface CottonSweatersProductsStore {
  cottonSweatersProducts: CollectionResponse<CottonSweaterProduct>;
  setProducts: (cottonSweatersProducts: CollectionResponse<CottonSweaterProduct>) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateProduct: (productId: string, data: Partial<CottonSweaterProduct>) => void;
}

const useCottonSweatersProductsStore = create<CottonSweatersProductsStore>((set) => ({
  cottonSweatersProducts: {
    page: 1,
    perPage: 30,
    totalPages: 1,
    totalItems: 0,
    items: [],
  },
  setProducts: (cottonSweatersProducts) => set({ cottonSweatersProducts }),
  updateProductStock: (productId, newStock) => set((state) => ({
    cottonSweatersProducts: {
      ...state.cottonSweatersProducts,
      items: state.cottonSweatersProducts.items.map((product) =>
        product.id === productId ? { ...product, STOCK: newStock } : product
      ),
    },
  })),
  updateProduct: (productId, data) => set((state) => ({
    cottonSweatersProducts: {
      ...state.cottonSweatersProducts,
      items: state.cottonSweatersProducts.items.map((product) =>
        product.id === productId ? { ...product, ...data } : product
      ),
    },
  })),
}));

export default useCottonSweatersProductsStore;
