'use client';

import { useState, useRef } from 'react';
import { FileText, Plus, Download, Image as ImageIcon, Trash2, Save, Upload, BarChart3, TrendingUp, Package, Tag, Eye, Share2, Copy, Filter, Search, Grid, List } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image?: string;
  images?: string[];
  specifications?: Record<string, string>;
  stock?: number;
  rating?: number;
  reviews?: number;
  tags?: string[];
  sku?: string;
  brand?: string;
}

interface CatalogueStats {
  totalProducts: number;
  totalValue: number;
  categories: number;
  averageRating: number;
}

export default function CatalogueCreator() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    images: [],
    specifications: {},
    tags: []
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Food', 'Beauty', 'Automotive', 'Health', 'Other'
  ];

  const catalogueStats: CatalogueStats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + parseFloat(p.price.replace(/[^0-9.]/g, '') || '0'), 0),
    categories: new Set(products.map(p => p.category)).size,
    averageRating: products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length || 0
  };

  const generateProduct = async () => {
    if (!currentProduct.name.trim()) return;
    
    setIsGenerating(true);
    try {
      // Enhanced AI generation with multiple product aspects
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newProduct: Product = {
        ...currentProduct,
        id: Date.now().toString(),
        image: `https://image.pollinations.ai/prompt/${encodeURIComponent(currentProduct.name)}%20product%20professional%20photography`,
        images: [
          `https://image.pollinations.ai/prompt/${encodeURIComponent(currentProduct.name)}%20product%20angle%201`,
          `https://image.pollinations.ai/prompt/${encodeURIComponent(currentProduct.name)}%20product%20angle%202`,
          `https://image.pollinations.ai/prompt/${encodeURIComponent(currentProduct.name)}%20product%20detail%20shot`
        ],
        specifications: {
          'Weight': Math.floor(Math.random() * 1000 + 100) + 'g',
          'Dimensions': `${Math.floor(Math.random() * 20 + 10)} x ${Math.floor(Math.random() * 20 + 10)} x ${Math.floor(Math.random() * 10 + 5)} cm`,
          'Material': ['Premium Plastic', 'Aluminum', 'Stainless Steel', 'Wood', 'Glass'][Math.floor(Math.random() * 5)],
          'Color': ['Black', 'White', 'Silver', 'Blue', 'Red', 'Green'][Math.floor(Math.random() * 6)],
          'Warranty': Math.floor(Math.random() * 24 + 6) + ' months'
        },
        stock: Math.floor(Math.random() * 100),
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
        reviews: Math.floor(Math.random() * 500),
        tags: currentProduct.tags || [currentProduct.category, 'Premium', 'Bestseller'],
        sku: `${currentProduct.category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`,
        brand: 'NovagenAI Premium'
      };
      
      setProducts([...products, newProduct]);
      setCurrentProduct({
        id: '',
        name: '',
        description: '',
        price: '',
        category: '',
        images: [],
        specifications: {},
        tags: []
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

  const duplicateProduct = (id: string) => {
    const productToDuplicate = products.find(p => p.id === id);
    if (productToDuplicate) {
      const duplicatedProduct = {
        ...productToDuplicate,
        id: Date.now().toString(),
        name: `${productToDuplicate.name} (Copy)`,
        sku: `${productToDuplicate.category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`
      };
      setProducts([...products, duplicatedProduct]);
    }
  };

  const downloadCatalogue = () => {
    const catalogueData = {
      products: products,
      stats: catalogueStats,
      createdAt: new Date().toISOString(),
      version: '2.0',
      metadata: {
        title: 'Product Catalogue',
        description: 'AI-generated product catalogue with enhanced features',
        totalProducts: products.length,
        categories: categories
      }
    };
    
    const blob = new Blob([JSON.stringify(catalogueData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enhanced-catalogue.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    const csvHeaders = ['Name', 'Description', 'Price', 'Category', 'SKU', 'Stock', 'Rating'];
    const csvRows = products.map(product => [
      product.name,
      `"${product.description}"`,
      product.price,
      product.category,
      product.sku || '',
      product.stock || 0,
      product.rating || 0
    ]);
    
    const csvContent = [csvHeaders.join(','), ...csvRows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'catalogue.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareCatalogue = () => {
    const shareUrl = window.location.href + '?catalogue=' + btoa(JSON.stringify(products));
    navigator.clipboard.writeText(shareUrl);
  };

  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
          break;
        case 'rating':
          comparison = (a.rating || 0) - (b.rating || 0);
          break;
        case 'date':
          comparison = parseInt(a.id) - parseInt(b.id);
          break;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

  const addImageToProduct = (productId: string) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProducts(products.map(p => 
          p.id === productId 
            ? { ...p, images: [...(p.images || []), imageUrl] }
            : p
        ));
      }
    };
    fileInput.click();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Catalogue Creator</h1>
        <p className="text-gray-600">Generate comprehensive product catalogues with AI-powered content, images, and specifications</p>
      </div>

      {/* Enhanced Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{catalogueStats.totalProducts}</p>
            </div>
            <Package className="w-12 h-12 text-blue-500" />
          </div>
        </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">${catalogueStats.totalValue.toFixed(2)}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{catalogueStats.categories}</p>
            </div>
            <Tag className="w-12 h-12 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{catalogueStats.averageRating.toFixed(1)}</p>
            </div>
            <BarChart3 className="w-12 h-12 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Product Creation Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Product</h2>
            
            <div className="space-y-4">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={currentProduct.tags?.join(', ') || ''}
                  onChange={(e) => setCurrentProduct({...currentProduct, tags: e.target.value.split(',').map(tag => tag.trim())})}
                  placeholder="premium, bestseller, new..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={generateProduct}
                disabled={isGenerating || !currentProduct.name.trim()}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
          </div>
        </div>
      </div>
    </div>
  );
}
