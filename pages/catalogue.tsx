'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '../components/ui/Button';

export default function CataloguePage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: '$99.99', description: 'Description for product 1' },
    { id: 2, name: 'Product 2', price: '$149.99', description: 'Description for product 2' },
    { id: 3, name: 'Product 3', price: '$199.99', description: 'Description for product 3' },
  ]);

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please Sign In
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be signed in to access the catalogue creator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Catalogue Creator
            </h1>
            <p className="text-xl text-gray-600">
              Design beautiful product catalogues instantly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  {product.price}
                </div>
                <Button className="w-full">
                  Edit Product
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg">
              Add New Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
