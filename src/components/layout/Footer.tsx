import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Info, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="bg-cyber-black bg-opacity-90 backdrop-blur-md border-t border-cyber-blue-300 text-white py-6"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-4">
              <Shield size={20} className="text-cyber-blue-100" />
              <h3 className="font-cyber text-lg">CyberQuest</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Learn cybersecurity through gamified challenges in a cyberpunk-themed world.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="font-cyber text-lg mb-4 text-cyber-pink-100">Challenges</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-cyber-blue-100 transition-colors">
                <Link to="/map?category=crypto">Cryptography</Link>
              </li>
              <li className="hover:text-cyber-blue-100 transition-colors">
                <Link to="/map?category=privesc">Privilege Escalation</Link>
              </li>
              <li className="hover:text-cyber-blue-100 transition-colors">
                <Link to="/map?category=sqli">SQL Injection</Link>
              </li>
              <li className="hover:text-cyber-blue-100 transition-colors">
                <Link to="/map?category=xss">Cross-Site Scripting</Link>
              </li>
              <li className="hover:text-cyber-blue-100 transition-colors">
                <Link to="/map?category=webexploit">Web Exploitation</Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="font-cyber text-lg mb-4 text-cyber-pink-100">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-cyber-blue-100 transition-colors">
                <Link to="/resources">Learning Resources</Link>
              </li>
              <li className="hover:text-cyber-blue-100 transition-colors">
                <Link to="/glossary">Cybersecurity Glossary</Link>
              </li>
              <li className="hover:text-cyber-blue-100 transition-colors">
                <Link to="/tools">Tools and References</Link>
              </li>
              <li className="hover:text-cyber-blue-100 transition-colors">
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="font-cyber text-lg mb-4 text-cyber-pink-100">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-cyber-blue-100 transition-colors">
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li className="hover:text-cyber-blue-100 transition-colors">
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li className="hover:text-cyber-blue-100 transition-colors">
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 pt-4 border-t border-cyber-gray flex flex-col-reverse md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-xs mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} CyberQuest. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-cyber-blue-100 transition-colors">
              <Lock size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyber-blue-100 transition-colors">
              <Info size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyber-blue-100 transition-colors">
              <Heart size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;