import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Product {
  id: string;
  imageUrl: string;
  name: string;
  price: string; // Added price field
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  id: string;
}

export default function ProductSection({ title, products, id }: ProductSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <section className="py-12 md:py-16" id={id}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        ref={ref}
        className="text-2xl md:text-3xl mb-8 text-center tracking-wider"
      >
        {title}
      </motion.h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-64 bg-white rounded-lg overflow-hidden shadow-md"
            onClick={() => handleImageClick(product.imageUrl)}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-black font-bold">{product.price}</p> {/* Moved price display below image */}
            </div>
          </motion.div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={handleOverlayClick}
        >
          <div className="relative max-w-3xl w-full">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-black text-4xl bg-white rounded-full p-2"
            >
              &times;
            </button>
            <img src={selectedImage} alt="Selected" className="w-full h-auto max-h-screen object-contain rounded-2xl" />
          </div>
        </div>
      )}
    </section>
  );
}