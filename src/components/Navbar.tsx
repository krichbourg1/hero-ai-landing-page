import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="bg-[#0a0c1b]/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent hover:from-blue-100 hover:to-white transition-all duration-200">
              HERO.AI
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="#how-it-works"
              onClick={(e) => handleScroll(e, 'how-it-works')}
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              How It Works
            </a>
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-emerald-500/25"
            >
              Join Waitlist
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white transition-colors duration-200">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#0a0c1b]/95 backdrop-blur-sm border-b border-white/10">
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-200"
              onClick={(e) => {
                handleScroll(e, 'how-it-works');
                setIsOpen(false);
              }}
            >
              How It Works
            </a>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}