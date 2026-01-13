import React, { useEffect, useState } from 'react';
import { adminApi, AdminProduct } from '../../services/adminApi';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await adminApi.products.getAll({
        pageNumber: currentPage,
        pageSize: 10,
        searchTerm: searchTerm || undefined,
      });
      setProducts(result.items);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await adminApi.products.delete(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const getStatusBadge = (status: number) => {
    const statuses = ['Draft', 'Active', 'Passive', 'Out of Stock', 'Discontinued'];
    const colors = ['gray', 'green', 'yellow', 'red', 'red'];
    return (
      <span className={`px-2 py-1 text-xs rounded bg-${colors[status]}-100 text-${colors[status]}-800`}>
        {statuses[status]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.categoryName}</div>
                </td>
                <td className="px-6 py-4 text-sm">{product.sku}</td>
                <td className="px-6 py-4 text-sm">
                  ${product.price.toFixed(2)}
                  {product.compareAtPrice && (
                    <div className="text-xs text-gray-500 line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">{product.stockQuantity}</td>
                <td className="px-6 py-4">{getStatusBadge(product.status)}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
