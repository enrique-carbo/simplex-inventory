"use client";

import React, { useEffect, useState } from "react";
import pb from "@/app/lib/pocketbase";
import useCapsProductsStore from "@/app/store/caps-store";
import type { CapsProduct } from "@/app/lib/definitions-pb";

const CapsPage: React.FC = () => {
  const { capsProducts, setProducts, updateProductStock } =
    useCapsProductsStore();
  const [error, setError] = useState<string | null>(null);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [pendingUpdates, setPendingUpdates] = useState<Set<string>>(new Set());

  const fetchProducts = async () => {
    try {
      const response = await pb
        .collection("prod_gorras")
        .getFullList<CapsProduct>({
          expand: "BRAND_ID",
        });
      setProducts({
        page: 1,
        perPage: 30,
        totalPages: 1,
        totalItems: response.length,
        items: response,
      });
      setProductsLoaded(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Error al obtener las gorras: ${err.message}`);
      } else {
        setError("Error inesperado al obtener las gorras");
      }
    }
  };

  useEffect(() => {
    if (!productsLoaded && capsProducts.items.length === 0) {
      fetchProducts();
    }
  }, [productsLoaded, capsProducts.items.length]);

  const handleStockChange = async (productId: string, newStock: number) => {
    if (newStock < 0) return;

    updateProductStock(productId, newStock);
    setPendingUpdates((prev) => new Set(prev).add(productId));

    try {
      await pb.collection("prod_gorras").update(productId, {
        STOCK: newStock,
      });

      setPendingUpdates((prev) => {
        const updated = new Set(prev);
        updated.delete(productId);
        return updated;
      });
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Error al actualizar el stock: ${err.message}`);
        const originalProduct = capsProducts.items.find(
          (p) => p.id === productId
        );
        if (originalProduct) {
          updateProductStock(productId, originalProduct.STOCK);
        }
      }
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded">
        <h1 className="text-xl font-bold">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Gorras</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-900">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                ID Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Marca
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Color
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Costo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Precio
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {capsProducts.items.map((product) => (
              <tr
                key={product.id}
                className={pendingUpdates.has(product.id) ? "bg-yellow-50" : ""}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.ID_PRODUCT}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.NAME}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        handleStockChange(product.id, product.STOCK - 1)
                      }
                      disabled={pendingUpdates.has(product.id)}
                    >
                      -
                    </button>
                    <span>{product.STOCK}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        handleStockChange(product.id, product.STOCK + 1)
                      }
                      disabled={pendingUpdates.has(product.id)}
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {product.expand?.BRAND_ID?.NAME || product.BRAND_ID}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">{product.COLOR}</td>

                <td className="px-6 py-4 whitespace-nowrap">{product.COST}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.PRICE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CapsPage;
