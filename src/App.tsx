import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Instagram, Mail, Phone } from 'lucide-react';
import ProductSection from './components/ProductSection';
import { translations } from './translations';

interface Product {
  id: string;
  imageUrl: string;
  name: string;
}

interface Products {
  sideBags: Product[];
  handBags: Product[];
  backpacks: Product[];
  pouches: Product[];
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  const [products, setProducts] = useState<Products>({
    sideBags: [],
    handBags: [],
    backpacks: [],
    pouches: []
  });

  const t = translations[language];

  useEffect(() => {
    const hardcodedImages: Products = {
      sideBags: [
        { id: '1', imageUrl: './images/sidebag_1.png', name: 'Side Bag 1' },
        { id: '2', imageUrl: './images/sidebag_2.png', name: 'Side Bag 2' },
        { id: '3', imageUrl: './images/sidebag_3.png', name: 'Side Bag 3' }
      ],
      handBags: [
        { id: '1', imageUrl: './images/handbag_1.png', name: 'Hand Bag 1' },
        { id: '2', imageUrl: './images/handbag_2.png', name: 'Hand Bag 2' },
        { id: '3', imageUrl: './images/handbag_3.png', name: 'Hand Bag 3' },
        { id: '4', imageUrl: './images/handbag_4.png', name: 'Hand Bag 4' }
      ],
      backpacks: [
        { id: '1', imageUrl: './images/backpack_1.png', name: 'Backpack 1' },
        { id: '2', imageUrl: './images/backpack_2.png', name: 'Backpack 2' },
        { id: '3', imageUrl: './images/backpack_3.png', name: 'Backpack 3' },
        { id: '4', imageUrl: './images/backpack_4.png', name: 'Backpack 4' }
      ],
      pouches: [
        { id: '1', imageUrl: './images/pouch_1.png', name: 'Pouch 1' },
        { id: '2', imageUrl: './images/pouch_2.png', name: 'Pouch 2' }
      ]
    };

    const fetchImages = (category: keyof Products) => {
      setProducts(prev => ({ ...prev, [category]: hardcodedImages[category] }));
    };

    fetchImages('sideBags');
    fetchImages('handBags');
    fetchImages('backpacks');
    fetchImages('pouches');
  }, []);

  const categories = [
    { id: 'sideBags', name: t.nav.sideBags },
    { id: 'handBags', name: t.nav.handBags },
    { id: 'backpacks', name: t.nav.backpacks },
    { id: 'pouches', name: t.nav.pouches }
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'hindi' : 'english');
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full z-50 px-4 py-2"
      >
        <div className="max-w-7xl mx-auto backdrop-blur-md bg-white/70 rounded-2xl shadow-lg border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center md:h-16 px-4">
            {/* Top bar - Logo and Controls */}
            <div className="flex justify-between items-center h-16 md:w-auto">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl tracking-wider"
              >
                Bags by Amit
              </motion.h1>
              
              <div className="flex items-center space-x-4 md:hidden">
                {/* Language Toggle Button - Mobile */}
                <div className="flex items-center justify-center w-20">
                  <button
                    onClick={toggleLanguage}
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-black transition-colors focus:outline-none"
                  >
                    <span className="sr-only">Toggle Language</span>
                    <span
                      className={`${
                        language === 'hindi' ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </button>
                  <span className="ml-2 text-xs min-w-[20px]">
                    {language === 'english' ? 'EN' : 'हि'}
                  </span>
                </div>
                
                {/* Mobile menu button */}
                <button
                  className="p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:justify-between md:flex-1 md:items-center">
              <div className="flex space-x-8 ml-8">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="text-gray-600 hover:text-black transition-colors tracking-wide"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(category.id);
                    }}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
              
              {/* Language Toggle Button - Desktop */}
              <div className="flex items-center justify-center w-20">
                <button
                  onClick={toggleLanguage}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-black transition-colors focus:outline-none"
                >
                  <span className="sr-only">Toggle Language</span>
                  <span
                    className={`${
                      language === 'hindi' ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </button>
                <span className="ml-2 text-xs min-w-[20px]">
                  {language === 'english' ? 'EN' : 'हि'}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden border-t border-gray-100/20 backdrop-blur-md bg-white/70"
            >
              <div className="px-2 py-3">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="block px-4 py-2 text-gray-600 hover:text-black transition-colors tracking-wide text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(category.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-28 pb-16 px-4 bg-black text-white text-center"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl mb-6 tracking-wider leading-relaxed"
          >
            {t.hero.title}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-gray-300 leading-relaxed px-4"
          >
            {t.hero.description}
          </motion.p>
        </div>
      </motion.section>

      {/* Product Sections */}
      <div className="max-w-7xl mx-auto px-4">
        <ProductSection title={t.sections.sideBags} products={products.sideBags} id="sideBags" />
        <ProductSection title={t.sections.handBags} products={products.handBags} id="handBags" />
        <ProductSection title={t.sections.backpacks} products={products.backpacks} id="backpacks" />
        <ProductSection title={t.sections.pouches} products={products.pouches} id="pouches" />
      </div>

      {/* Contact Section */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative mt-16"
      >
        <div className="absolute inset-0 backdrop-blur-md bg-black/80 rounded-t-3xl"></div>
        <div className="relative max-w-3xl mx-auto text-center px-4 py-16">
          <h2 className="text-2xl md:text-3xl mb-8 tracking-wider text-white">{t.contact.title}</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
            <a href={`tel:${t.contact.phone}`} className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors text-sm">
              <Phone size={16} />
              <span>{t.contact.phone}</span>
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;