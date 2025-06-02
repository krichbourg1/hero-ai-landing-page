import { useState } from 'react';
import { CheckCircle, ChevronRight, Brain, FileText, Download, ArrowRight } from 'lucide-react';
import { saveEmail } from '../lib/supabase';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await saveEmail(email);
      setSubmitted(true);
      console.log('Email submitted:', email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit email');
      console.error('Error submitting email:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0c1b]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1a1f35] to-[#0a0c1b] text-white py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGgtNnYxMmgtNnYtNmgtNnYxMmg2djZoNnYtNmg2eiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c1b] via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
                Your Military Experience,
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"> Translated</span> for Civilian Success
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                HERO.AI uses advanced artificial intelligence to transform your military and first responder experience into powerful civilian resumes that leading companies understand and value.
              </p>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email for early access"
                      className="px-6 py-4 rounded-lg flex-grow text-gray-900 text-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button 
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-emerald-500/25"
                    >
                      Get Early Access
                      <ArrowRight className="ml-2" size={24} />
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                  <p className="text-sm text-blue-200">
                    Join 10,000+ veterans and first responders already on the waitlist
                  </p>
                </form>
              ) : (
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border border-green-500/30 text-white p-6 rounded-lg flex items-center animate-fade-in">
                  <CheckCircle className="mr-3 text-green-400" size={28} />
                  <div>
                    <p className="font-medium text-lg">You're on the list!</p>
                    <p className="text-green-300">We'll notify you when early access becomes available.</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="hidden lg:block">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-2xl transform rotate-2 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-gray-200 font-medium">Military Experience</div>
                  <div className="text-emerald-400 font-medium">Civilian Translation</div>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                      <p className="text-gray-100">Squad Leader, 12-person infantry unit</p>
                      <p className="text-sm text-gray-400 mt-1">Led tactical operations and training</p>
                    </div>
                    <div className="bg-emerald-500/10 backdrop-blur-sm p-4 rounded-lg border border-emerald-500/30">
                      <p className="text-gray-100">Team Leadership & Project Management</p>
                      <p className="text-sm text-emerald-300 mt-1">Led 12-person team, coordinating complex operations and staff development</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                      <p className="text-gray-100">Combat Medic Specialist</p>
                      <p className="text-sm text-gray-400 mt-1">Emergency medical care in high-stress environments</p>
                    </div>
                    <div className="bg-emerald-500/10 backdrop-blur-sm p-4 rounded-lg border border-emerald-500/30">
                      <p className="text-gray-100">Emergency Healthcare Professional</p>
                      <p className="text-sm text-emerald-300 mt-1">Critical care expertise with proven crisis management skills</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div id="how-it-works" className="py-24 bg-gradient-to-b from-[#0a0c1b] via-[#1a1f35] to-[#0a0c1b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">How HERO.AI Works</h2>
            <p className="text-xl text-blue-200">Three simple steps to your civilian career success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <FileText className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">1. Share Your Experience</h3>
                <p className="text-blue-200">
                  Input your military or first responder background using our guided form. Include your roles, responsibilities, and achievements.
                </p>
              </div>
              <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2 z-10">
                <ChevronRight size={32} className="text-blue-500/50" />
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Brain className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">2. AI Translation</h3>
                <p className="text-blue-200">
                  Our AI analyzes your experience and translates it into civilian terminology that resonates with hiring managers.
                </p>
              </div>
              <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2 z-10">
                <ChevronRight size={32} className="text-blue-500/50" />
              </div>
            </div>
            
            <div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Download className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">3. Get Your Resume</h3>
                <p className="text-blue-200">
                  Download your professionally formatted resume, optimized for ATS systems and ready to impress civilian employers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">HERO.AI</h3>
              <p className="text-sm">
                Helping Employment for Rescuers and Operators through AI-powered career translation.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Contact</h4>
              <p className="text-sm">Questions? Reach out to us at:</p>
              <p className="text-sm mt-2">heroservices.ai@gmail.com</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} HERO.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}