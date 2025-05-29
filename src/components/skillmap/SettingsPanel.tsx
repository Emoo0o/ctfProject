import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, FileText, Image, X } from 'lucide-react';
import { useSkillMapStore } from '../../store/skillMapStore';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const { playerSettings, updatePlayerSettings } = useSkillMapStore();

  const panelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200,
      },
    },
  };

  const avatarOptions = [
    { id: 1, url: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, url: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, url: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, url: 'https://i.pravatar.cc/150?img=4' },
  ];

  return (
    <motion.div
      className={`fixed inset-y-0 right-0 w-96 bg-cyber-black border-l border-cyber-blue-200 z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
      variants={panelVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
    >
      <Card className="h-full" variant="dark">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-cyber text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue-100 to-cyber-pink-100">
              Settings
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="rounded-full w-8 h-8 flex items-center justify-center"
            >
              <X size={16} />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Avatar Selection */}
            <div>
              <label className="block text-sm font-cyber text-cyber-blue-100 mb-2">
                Avatar
              </label>
              <div className="grid grid-cols-4 gap-4">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar.id}
                    className={`relative rounded-full overflow-hidden border-2 transition-all ${
                      playerSettings.avatarUrl === avatar.url
                        ? 'border-cyber-blue-100 shadow-neon-blue'
                        : 'border-transparent hover:border-cyber-blue-200'
                    }`}
                    onClick={() => updatePlayerSettings({ avatarUrl: avatar.url })}
                  >
                    <img
                      src={avatar.url}
                      alt={`Avatar ${avatar.id}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-cyber text-cyber-blue-100 mb-2">
                Username
              </label>
              <input
                type="text"
                value={playerSettings.username}
                onChange={(e) => updatePlayerSettings({ username: e.target.value })}
                className="w-full bg-cyber-gray border-2 border-cyber-blue-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyber-blue-100"
                placeholder="Enter username"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-cyber text-cyber-blue-100 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={playerSettings.fullName}
                onChange={(e) => updatePlayerSettings({ fullName: e.target.value })}
                className="w-full bg-cyber-gray border-2 border-cyber-blue-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyber-blue-100"
                placeholder="Enter full name"
              />
            </div>

            {/* Biography */}
            <div>
              <label className="block text-sm font-cyber text-cyber-blue-100 mb-2">
                Biography
              </label>
              <textarea
                value={playerSettings.biography}
                onChange={(e) => updatePlayerSettings({ biography: e.target.value })}
                className="w-full h-32 bg-cyber-gray border-2 border-cyber-blue-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyber-blue-100 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          <div className="mt-8">
            <Button
              variant="primary"
              fullWidth
              glowing
              onClick={onClose}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SettingsPanel;