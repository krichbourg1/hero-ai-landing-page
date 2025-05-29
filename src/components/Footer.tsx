import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0a0c1b] border-t border-white/10 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-4">
              HERO.AI
            </h3>
            <p className="text-gray-400">Helping veterans and first responders transition to civilian careers with powerful, tailored resumes.</p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-200">How It Works</a></li>
              <li><a href="#success-stories" className="text-gray-400 hover:text-white transition-colors duration-200">Success Stories</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <p className="text-gray-400 text-sm">Questions? Reach out to us at:</p>
            <p className="text-blue-300 text-sm mt-2 hover:text-blue-200 transition-colors duration-200">
              <a href="mailto:support@heroai.com">support@heroai.com</a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hero.AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}