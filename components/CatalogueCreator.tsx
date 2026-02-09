'use client';

import { useState } from 'react';
import { FileText, Plus, Download, Image as ImageIcon, Trash2, Save } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image?: string;
}

export default function CatalogueCreator() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const generateProduct = async () => {
    if (!currentProduct.name.trim()) return;
    
    setIsGenerating(true);
    try {
      // Mock API call - replace with actual AI API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newProduct: Product = {
        ...currentProduct,
        id: Date.now().toString(),
        image: `https://image.pollinations.ai/prompt/${encodeURIComponent(currentProduct.name)}%20product%20image`,
      };
      
      setProducts([...products, newProduct]);
      setCurrentProduct({
        id: '',
        name: '',
        description: '',
        price: '',
        category: '',
      });
    } catch (error) {
      console.error('Error generating product:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const downloadCatalogue = () => {
    const catalogueData = {
      products: products,
      createdAt: new Date().toISOString(),
      totalProducts: products.length
    };
    
    const blob = new Blob([JSON.stringify(catalogueData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'catalogue.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Food', 'Other'];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Catalogue Creator</h1>
        <p className="text-gray-600">Generate product catalogues with AI assistance</p>
      </div>

      {/* Product Creation Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={currentProduct.name}
              onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
              placeholder="Enter product name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="text"
              value={currentProduct.price}
              onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
              placeholder="$0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={currentProduct.category}
              onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select category...</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={currentProduct.description}
              onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
              placeholder="Enter product description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none h-20"
            />
          </div>
        </div>
        <button
          onClick={generateProduct}
          disabled={isGenerating || !currentProduct.name.trim()}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add Product
            </>
          )}
        </button>
      </div>

      {/* Catalogue Actions */}
      {products.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Total Products: <span className="font-semibold">{products.length}</span>
            </div>
            <button
              onClick={downloadCatalogue}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Catalogue
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {product.image && (
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-2xl font-bold text-cyan-600 mb-2">{product.price}</p>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mb-2">
                  {product.category}
                </span>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-600">Start by adding your first product to the catalogue.</p>
        </div>
      )}
    </div>
  );
}
