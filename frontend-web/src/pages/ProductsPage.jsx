import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit2, Trash2, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Modal from '../components/Modal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';

// Read backend URL from Vite env; fallback to the original URL when not provided.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://sample-task-management.vercel.app/api';

const ProductsPage = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    stock: ''
  });

  // Fetch products
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products', searchQuery, selectedCategory],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/product/products`, {
        params: {
          search: searchQuery,
          category: selectedCategory
        }
      });
      return response.data.data;
    }
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/category/categories`);
      return response.data.data;
    }
  });

  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: (data) => axios.post(`${API_BASE_URL}/product/product`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      setIsModalOpen(false);
      resetForm();
      toast.success('Product added successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add product');
    }
  });

  // Edit product mutation
  const editProductMutation = useMutation({
    mutationFn: ({ id, data }) => axios.put(`${API_BASE_URL}/product/product/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      setIsModalOpen(false);
      resetForm();
      toast.success('Product updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update product');
    }
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({ 
    mutationFn: (id) => axios.delete(`${API_BASE_URL}/product/product/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Product deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      categoryId: parseInt(formData.categoryId)
    };

    if (editingProduct) {
      editProductMutation.mutate({ id: editingProduct.id, data });
    } else {
      addProductMutation.mutate(data);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categoryId: product.categoryId.toString(),
      price: product.price.toString(),
      stock: product.stock.toString()
    });
    setIsModalOpen(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProductMutation.mutate(productToDelete.id);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', categoryId: '', price: '', stock: '' });
    setEditingProduct(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar onAddProduct={handleAddNew} />
      
      <div className="lg:pl-72">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {productsLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 animate-pulse"
                >
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))
            ) : products?.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
                <Package size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              products?.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white cursor-pointer rounded-xl border border-gray-200 p-5 
                    hover:shadow-lg hover:border-primary-100 transition-all duration-300
                    animate-fade-in"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-900 group-hover:text-primary-600 
                      transition-colors line-clamp-2"
                    >
                      {product.name}
                    </h3>
                    <div className="flex space-x-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity gap-2 max-md:gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        aria-label={`Edit ${product.name}`}
                        className="p-1.5 rounded-lg cursor-pointer text-gray-500 max-md:text-blue-600 max-md:bg-blue-50 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        aria-label={`Delete ${product.name}`}
                        className="p-1.5 rounded-lg cursor-pointer max-md:text-red-600 max-md:bg-red-50 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    Category: {product.category.name}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-blue-600">
                      ${parseFloat(product.price).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Stock: {product.stock}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col gap-6">
          <div className="space-y-4 flex flex-col gap-4">
            <div className="space-y-1.5 flex flex-col gap-2">
              <Input
                label="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Select
                label="Category"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                options={categories.map((cat) => ({
                  value: cat.id.toString(),
                  label: cat.name
                }))}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Input
                  label="Price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Input
                  label="Stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-gray-100 border-t gap-4">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className='bg-blue-600'
              loading={addProductMutation.isPending || editProductMutation.isPending}
            >
              {editingProduct ? 'Update' : 'Add'} Product
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={confirmDelete}
        productName={productToDelete?.name}
        isLoading={deleteProductMutation.isPending}
      />
    </div>
  );
};

export default ProductsPage;