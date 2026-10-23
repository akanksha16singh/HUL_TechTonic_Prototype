import React, { useState } from 'react';
import { Signal } from '../types';

interface CustomDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  signal: Signal;
  onSave: (custom: { budget: number; channels: string[]; note: string }) => void;
}

export const CustomDetailModal: React.FC<CustomDetailModalProps> = ({
  isOpen,
  onClose,
  signal,
  onSave
}) => {
  const [budget, setBudget] = useState<number>(signal.customBudget || 2500000);
  const [channels, setChannels] = useState<string[]>(
    signal.customChannels || ['Instagram Reels', 'Blinkit Dark Stores', 'Meta Ads']
  );
  const [note, setNote] = useState<string>(
    signal.customNote || 'Target tier-1 metro youth demographic with verified UGC creators.'
  );

  if (!isOpen) return null;

  const availableChannels = [
    'Instagram Reels',
    'YouTube Shorts',
    'Blinkit Dark Stores',
    'Zepto Instant Fulfillment',
    'Swiggy Instamart',
    'Meta Ads Manager',
    'Moj & ShareChat Vernacular'
  ];

  const toggleChannel = (ch: string) => {
    if (channels.includes(ch)) {
      if (channels.length > 1) {
        setChannels(channels.filter(c => c !== ch));
      }
    } else {
      setChannels([...channels, ch]);
    }
  };

  const handleSave = () => {
    onSave({ budget, channels, note });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#DCE3F0] p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8F2] mb-4">
          <div>
            <h3 className="font-extrabold text-base text-[#0E1B33]">Customize Tactical Execution</h3>
            <p className="text-xs text-[#5A6884]">
              Adjust operational spend and distribution rails for {signal.brand}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Budget allocation */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <label className="text-xs font-bold text-[#0E1B33]">Total Spend Allocation (INR)</label>
              <span className="font-mono text-xs font-extrabold text-[#1F44D6]">
                ₹{budget.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="50000"
              max="5000000"
              step="50000"
              value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              className="w-full accent-[#1F44D6] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
              <span>₹50,000 (L0)</span>
              <span>₹5,00,000 (L1)</span>
              <span>₹25,00,000 (L2)</span>
              <span>₹50,00,000 (L3)</span>
            </div>
          </div>

          {/* Delivery Channels */}
          <div>
            <label className="text-xs font-bold text-[#0E1B33] block mb-2">
              Select Execution Rails:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableChannels.map(ch => {
                const isSelected = channels.includes(ch);
                return (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => toggleChannel(ch)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1F44D6] text-white shadow-xs'
                        : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {ch}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Directive Note */}
          <div>
            <label className="text-xs font-bold text-[#0E1B33] block mb-1">
              Operational Guardrail & Note:
            </label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={3}
              className="w-full text-xs p-2.5 border border-[#DCE3F0] rounded-xl focus:border-[#1F44D6] focus:ring-1 focus:ring-[#1F44D6] outline-none"
              placeholder="Add specific brand guardrails or agency directives..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E3E8F2] mt-5">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 border border-[#DCE3F0] rounded-lg text-xs font-bold text-[#5A6884] hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-[#1F44D6] text-white rounded-lg text-xs font-bold hover:bg-[#163398] transition-all cursor-pointer shadow-sm"
          >
            Apply Customization
          </button>
        </div>
      </div>
    </div>
  );
};
