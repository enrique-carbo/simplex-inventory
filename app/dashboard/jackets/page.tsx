"use client";

import React, { useEffect, useState } from "react";
import pb from "@/app/lib/pocketbase";
import useJacketsProductsStore from "@/app/store/jackets-store";
import type { JacketProduct } from "@/app/lib/definitions-pb";

const CottonSweatersPage: React.FC = () => {
  const { jacketsProducts, setProducts, updateProductStock } =
  useJacketsProductsStore();
  const [error, setError] = useState<string | null>(null);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [pendingUpdates, setPendingUpdates] = useState<Set<string>>(new Set());

  const fetchProducts = async () => {
    try {
      const response = await pb
        .collection("prod_camperas")
        .getFullList<JacketProduct>({
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
        setError(`Error al obtener las camperas: ${err.message}`);
      } else {
        setError("Error inesperado al obtener las camperas");
      }
    }
  };

  useEffect(() => {
    if (!productsLoaded && jacketsProducts.items.length === 0) {
      fetchProducts();
    }
  }, [productsLoaded, jacketsProducts.items.length]);

  const handleStockChange = async (productId: string, newStock: number) => {
    if (newStock < 0) return;

    updateProductStock(productId, newStock);
    setPendingUpdates((prev) => new Set(prev).add(productId));

    try {
      await pb.collection("prod_camperas").update(productId, {
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
        const originalProduct = jacketsProducts.items.find(
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
      <h1 className="text-3xl font-bold mb-10">Camperas</h1>

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
                Talle
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
            {jacketsProducts.items.map((product) => (
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
                <td className="px-6 py-4 whitespace-nowrap">{product.SIZE}</td>        
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

export default CottonSweatersPage;