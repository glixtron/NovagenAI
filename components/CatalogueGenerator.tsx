import React, { useState, useRef } from 'react';
import { ShoppingBagIcon, SparklesIcon, UploadIcon, PlusIcon, TrashIcon, DownloadIcon, MagicWandIcon } from './Icons';
import { generateCatalogueDesign } from '../services/geminiService';
import { CatalogueDesign, Product } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CatalogueGenerator: React.FC = () => {
  // State for products
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ name: '', description: '', price: '', category: '' });
  const [productImage, setProductImage] = useState<File | null>(null);

  // State for design
  const [command, setCommand] = useState('');
  const [design, setDesign] = useState<CatalogueDesign | null>(null);
  const [isDesigning, setIsDesigning] = useState(false);
  const catalogueRef = useRef<HTMLDivElement>(null);

  // --- Handlers ---

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;

    let imageBase64 = undefined;
    if (productImage) {
      imageBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(productImage);
      });
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name!,
      description: newProduct.description || '',
      price: newProduct.price!,
      category: newProduct.category || 'General',
      image: imageBase64
    };

    setProducts([...products, product]);
    setNewProduct({ name: '', description: '', price: '', category: '' });
    setProductImage(null);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleGenerateDesign = async () => {
    if (products.length === 0) return;
    setIsDesigning(true);
    try {
      const newDesign = await generateCatalogueDesign(products, command || "Create a professional and modern catalogue.", design || undefined);
      setDesign(newDesign);
      setCommand('');
    } catch (e) {
      console.error(e);
      alert("Design generation failed.");
    } finally {
      setIsDesigning(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!catalogueRef.current || !design) return;
    
    // Simple HTML to PDF export
    const canvas = await html2canvas(catalogueRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${design.title.replace(/\s+/g, '_')}.pdf`);
  };

  // --- Render Helpers ---

  const getLayoutClass = () => {
    switch (design?.layout) {
      case 'grid-2': return 'grid-cols-1 md:grid-cols-2';
      case 'grid-3': return 'grid-cols-1 md:grid-cols-3';
      case 'list': return 'grid-cols-1';
      case 'featured': return 'grid-cols-1 md:grid-cols-3'; // Featured handles logic differently usually
      default: return 'grid-cols-1 md:grid-cols-2';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up pb-20">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">AI Catalogue Creator</h2>
        <p className="text-slate-500">Add products, describe your style, and let AI build your catalogue.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar: Product Manager & Commander */}
        <div className="w-full lg:w-1/3 space-y-6">
          
          {/* Add Product Form */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
             <h3 className="font-bold text-slate-700 mb-4 flex items-center">
               <ShoppingBagIcon className="w-4 h-4 mr-2" /> Add Products
             </h3>
             <div className="space-y-3">
               <input 
                 className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-sm outline-none focus:border-pink-500"
                 placeholder="Product Name"
                 value={newProduct.name}
                 onChange={e => setNewProduct({...newProduct, name: e.target.value})}
               />
               <input 
                 className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-sm outline-none focus:border-pink-500"
                 placeholder="Category (e.g. Shoes, Tech)"
                 value={newProduct.category}
                 onChange={e => setNewProduct({...newProduct, category: e.target.value})}
               />
               <div className="flex gap-2">
                 <input 
                   className="w-1/2 p-2 bg-slate-50 border border-slate-200 rounded text-sm outline-none focus:border-pink-500"
                   placeholder="Price ($)"
                   value={newProduct.price}
                   onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                 />
                 <label className="w-1/2 flex items-center justify-center bg-slate-50 border border-slate-200 border-dashed rounded cursor-pointer hover:bg-slate-100 transition-colors">
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    <span className="text-xs text-slate-500 truncate px-2">{productImage ? productImage.name : 'Upload Image'}</span>
                 </label>
               </div>
               <textarea 
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-sm outline-none focus:border-pink-500 resize-none h-16"
                  placeholder="Short Description"
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
               />
               <button 
                 onClick={addProduct}
                 className="w-full py-2 bg-slate-800 text-white rounded font-medium text-sm hover:bg-slate-900 transition-colors flex items-center justify-center"
               >
                 <PlusIcon className="w-4 h-4 mr-1" /> Add to List
               </button>
             </div>

             {/* Product List Mini */}
             <div className="mt-6 max-h-40 overflow-y-auto space-y-2">
               {products.map(p => (
                 <div key={p.id} className="flex justify-between items-center p-2 bg-slate-50 rounded text-sm border border-slate-100">
                    <span className="truncate w-32 font-medium">{p.name}</span>
                    <span className="text-slate-500">{p.price}</span>
                    <button onClick={() => removeProduct(p.id)} className="text-red-400 hover:text-red-600">
                      <TrashIcon className="w-3 h-3" />
                    </button>
                 </div>
               ))}
               {products.length === 0 && <p className="text-xs text-center text-slate-400 py-2">No products added yet.</p>}
             </div>
          </div>

          {/* AI Command Center */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center">
               <MagicWandIcon className="w-4 h-4 mr-2" /> AI Designer
             </h3>
             <textarea 
               className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm outline-none focus:border-pink-500 resize-none h-24 mb-3"
               placeholder={design ? "Example: Change background to pastel blue, make the font larger..." : "Example: Create a modern minimalist catalogue for a fashion brand..."}
               value={command}
               onChange={e => setCommand(e.target.value)}
             />
             <button 
               onClick={handleGenerateDesign}
               disabled={isDesigning || products.length === 0}
               className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all flex items-center justify-center"
             >
               {isDesigning ? 'Designing...' : <>{design ? 'Update Design' : 'Generate Catalogue'} <SparklesIcon className="w-4 h-4 ml-2" /></>}
             </button>
          </div>

        </div>

        {/* Right Area: Catalogue Preview */}
        <div className="w-full lg:w-2/3">
           {!design ? (
             <div className="h-full min-h-[500px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
               <ShoppingBagIcon className="w-16 h-16 mb-4 opacity-20" />
               <p>Add products and click Generate to see your catalogue.</p>
             </div>
           ) : (
             <div className="relative">
                <div className="absolute -top-12 right-0 flex gap-2">
                   <button onClick={handleDownloadPDF} className="bg-slate-800 text-white px-4 py-2 rounded text-sm font-medium flex items-center hover:bg-slate-900">
                     <DownloadIcon className="w-4 h-4 mr-2" /> Download PDF
                   </button>
                </div>
                
                {/* Canvas Area */}
                <div 
                   ref={catalogueRef}
                   className={`w-full min-h-[800px] shadow-2xl rounded-sm p-8 transition-colors duration-500 ${design.backgroundColor.startsWith('#') ? '' : design.backgroundColor}`}
                   style={{ 
                     backgroundColor: design.backgroundColor.startsWith('#') ? design.backgroundColor : undefined,
                     color: design.textColor.startsWith('#') ? design.textColor : undefined,
                     fontFamily: design.fontFamily
                   }}
                >
                   {/* Header */}
                   <div className="text-center mb-12 border-b-2 pb-6" style={{ borderColor: design.accentColor }}>
                     <h1 className="text-5xl font-bold mb-2 uppercase tracking-widest">{design.title}</h1>
                     <p className="opacity-75 text-lg italic">{products.length} Exclusive Items</p>
                   </div>

                   {/* Grid */}
                   <div className={`grid gap-8 ${getLayoutClass()}`}>
                      {products.map((p, i) => (
                        <div 
                          key={p.id} 
                          className={`p-6 rounded-lg transition-transform hover:-translate-y-1 ${design.cardBackgroundColor.startsWith('#') ? '' : design.cardBackgroundColor}`}
                          style={{ backgroundColor: design.cardBackgroundColor.startsWith('#') ? design.cardBackgroundColor : undefined }}
                        >
                           {/* Image */}
                           <div className="aspect-square bg-white/10 w-full mb-4 flex items-center justify-center overflow-hidden rounded relative group">
                              {p.image ? (
                                <img src={`data:image/png;base64,${p.image}`} className="w-full h-full object-cover" alt={p.name} />
                              ) : (
                                <span className="opacity-20 text-4xl font-bold">{p.name[0]}</span>
                              )}
                              <div className="absolute top-2 right-2 px-2 py-1 text-xs font-bold uppercase tracking-wider bg-white/90 text-black rounded-sm">
                                {p.category}
                              </div>
                           </div>
                           
                           <div className="space-y-2 text-center">
                             <h3 className="text-xl font-bold">{p.name}</h3>
                             <p className="text-sm opacity-80 line-clamp-2">{p.description}</p>
                             <div className="pt-2">
                                <span 
                                  className="text-lg font-bold px-4 py-1 rounded-full inline-block"
                                  style={{ backgroundColor: design.accentColor, color: '#fff' }}
                                >
                                  {p.price.includes('$') ? p.price : `$${p.price}`}
                                </span>
                             </div>
                           </div>
                        </div>
                      ))}
                   </div>
                   
                   {/* Footer */}
                   <div className="mt-16 text-center text-xs opacity-50 uppercase tracking-widest">
                     Generated by Gemini Catalogue Creator
                   </div>
                </div>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default CatalogueGenerator;
