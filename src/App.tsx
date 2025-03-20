import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import ProductSection from './components/ProductSection';
import { translations } from './translations';

interface Product {
  id: string;
  imageUrl: string;
  name: string;
  price: string; // Added price field
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
        { id: '1', imageUrl: './images/sidebag/sidebag_1.png', name: '', price: '₹150' },
        { id: '2', imageUrl: './images/sidebag/sidebag_2.png', name: '', price: '₹180(per piece)' },
        { id: '3', imageUrl: './images/sidebag/sidebag_3.png', name: '', price: '₹180' },
        { id: '4', imageUrl: './images/sidebag/sidebag_4.png', name: '', price: '₹150' },
        { id: '5', imageUrl: './images/sidebag/sidebag_5.png', name: '', price: '₹150' },
        { id: '6', imageUrl: './images/sidebag/sidebag_6.png', name: '', price: '₹200' }
      ],
      handBags: [
        { id: '1', imageUrl: './images/handbag/handbag_1.png', name: '', price: '₹350' },
        { id: '2', imageUrl: './images/handbag/handbag_2.png', name: '', price: '₹350' },
        { id: '3', imageUrl: './images/handbag/handbag_3.png', name: '', price: '₹350' },
        { id: '4', imageUrl: './images/handbag/handbag_4.png', name: '', price: '₹150' },
        { id: '5', imageUrl: './images/handbag/handbag_5.png', name: '', price: '₹150' },
        { id: '6', imageUrl: './images/handbag/handbag_6.png', name: '', price: '₹300' },
        { id: '7', imageUrl: './images/handbag/handbag_7.png', name: '', price: '₹500' },
        { id: '8', imageUrl: './images/handbag/handbag_8.png', name: '', price: '₹200' },
        { id: '9', imageUrl: './images/handbag/handbag_9.png', name: '', price: '₹300' },
        { id: '10', imageUrl: './images/handbag/handbag_10.png', name: '', price: '₹175' },
        { id: '11', imageUrl: './images/handbag/handbag_11.png', name: '', price: '₹175' }
      ],
      backpacks: [
        { id: '1', imageUrl: './images/backpack/backpack_1.png', name: '', price: '₹350' },
        { id: '2', imageUrl: './images/backpack/backpack_2.png', name: '', price: '₹400' },
        { id: '3', imageUrl: './images/backpack/backpack_3.png', name: '', price: '₹200' },
        { id: '4', imageUrl: './images/backpack/backpack_4.png', name: '', price: '₹250' },
        { id: '5', imageUrl: './images/backpack/backpack_5.png', name: '', price: '₹200' },
        { id: '6', imageUrl: './images/backpack/backpack_6.png', name: '', price: '₹250' },
        { id: '7', imageUrl: './images/backpack/backpack_7.png', name: '', price: '₹200' },
        { id: '8', imageUrl: './images/backpack/backpack_8.png', name: '', price: '₹200' },
        { id: '9', imageUrl: './images/backpack/backpack_9.png', name: '', price: '₹200' }
      ],
      pouches: [
        { id: '1', imageUrl: './images/pouches/pouch_1.png', name: '', price: '₹40' },
        { id: '2', imageUrl: './images/pouches/pouch_2.png', name: '', price: '₹40' }
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
                Minimal Weave
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