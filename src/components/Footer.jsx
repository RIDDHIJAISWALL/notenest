import React from 'react';
import { Feather, Twitter, Github, Linkedin, Send, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Footer = () => {
  const { setActiveTab } = useAppContext();
  const navigate = useNavigate();

  return (
    <footer className="bg-indigo-950 mt-20 pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Feather className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">NoteNest</span>
            </div>

            <p className="text-indigo-200 text-sm leading-relaxed">
              The ultimate resource hub for students. Share notes, calculate grades, and ace your
              exams with shared knowledge.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">



              {/* <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-300 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a> */}


              
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-300 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/riddhi-jaiswal-170243302/"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-300 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-indigo-200">
              <li>
                <button
                  onClick={() => navigate('/courses')}
                  className="hover:text-white transition-colors"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/Predictor')}
                  className="hover:text-white transition-colors"
                >
                  Grade Predictor
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/HallOfFame')}
                  className="hover:text-white transition-colors"
                >
                  Hall of Fame
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-indigo-200">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-6">Stay Updated</h4>
            <p className="text-sm text-indigo-200 mb-4">
              Subscribe to our newsletter for the latest notes and features.
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-indigo-800/40 border border-indigo-700 rounded-lg px-4 py-2 text-sm w-full outline-none focus:ring-2 focus:ring-indigo-400 placeholder-indigo-300"
              />
              <button
                onClick={() => alert("Thanks for subscribing!")}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-500 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-indigo-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-indigo-300 text-sm font-medium">
            © 2025 NoteNest. All rights reserved.
          </p>

          <div className="flex items-center gap-2 bg-indigo-900/60 border border-indigo-800 px-5 py-2.5 rounded-full shadow-sm">
            <span className="text-indigo-200 font-semibold text-sm">Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
            <span className="text-indigo-200 font-semibold text-sm">by Riddhi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
