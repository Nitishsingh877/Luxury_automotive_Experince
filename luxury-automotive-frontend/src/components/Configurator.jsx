import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Configurator = ({ token, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('exterior');
  const [config, setConfig] = useState({
    vehicleId: 1,
    exteriorColor: 'Pearl White',
    interiorTrim: 'Black Leather',
    wheels: '19" Standard',
    techPackage: 'Basic'
  });
  const [pricing, setPricing] = useState({ basePrice: 65999, customizationCost: 0, totalPrice: 65999 });

  const tabs = [
    { id: 'exterior', label: 'Exterior Color' },
    { id: 'interior', label: 'Interior Trim' },
    { id: 'wheels', label: 'Wheels & Tires' },
    { id: 'tech', label: 'Technology Package' }
  ];

  const options = {
    exterior: [
      { name: 'Pearl White', desc: 'Classic elegance', price: 0 },
      { name: 'Midnight Black', desc: 'Sophisticated luxury', price: 1500 },
      { name: 'Silver Metallic', desc: 'Modern shine', price: 1200 }
    ],
    interior: [
      { name: 'Black Leather', desc: 'Premium comfort', price: 0 },
      { name: 'Beige Nappa', desc: 'Luxury feel', price: 2500 },
      { name: 'Brown Walnut', desc: 'Executive style', price: 3000 }
    ],
    wheels: [
      { name: '19" Standard', desc: 'Balanced performance', price: 0 },
      { name: '20" Sport', desc: 'Enhanced handling', price: 2000 },
      { name: '21" Premium', desc: 'Ultimate style', price: 3500 }
    ],
    tech: [
      { name: 'Basic', desc: 'Essential features', price: 0 },
      { name: 'Advanced', desc: 'Enhanced connectivity', price: 4000 },
      { name: 'Premium', desc: 'Full automation', price: 7500 }
    ]
  };

  useEffect(() => {
    calculatePriceLocal();
  }, [config]);

  const calculatePriceLocal = () => {
    const customizationCost = 
      getOptionPrice('exterior', config.exteriorColor) +
      getOptionPrice('interior', config.interiorTrim) +
      getOptionPrice('wheels', config.wheels) +
      getOptionPrice('tech', config.techPackage);
    const totalPrice = pricing.basePrice + customizationCost;
    setPricing({ ...pricing, customizationCost, totalPrice });
  };

  const calculatePrice = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/catalog/price',
        {
          vehicleId: config.vehicleId,
          exteriorColor: config.exteriorColor,
          interiorTrim: config.interiorTrim,
          additionalFeatures: [config.wheels, config.techPackage]
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPricing(response.data);
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  };

  const handleSelect = (category, value) => {
    const key = category === 'exterior' ? 'exteriorColor' : 
                category === 'interior' ? 'interiorTrim' :
                category === 'wheels' ? 'wheels' : 'techPackage';
    setConfig({ ...config, [key]: value });
  };

  const getOptionPrice = (category, name) => {
    return options[category].find(o => o.name === name)?.price || 0;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-primary">AutoExperience</div>
            <div className="flex items-center gap-8">
              <button onClick={() => onNavigate('showcase')} className="text-primary hover:text-accent transition">Explore</button>
              <button className="text-accent font-semibold">Configure</button>
              <button onClick={() => onNavigate('dealership')} className="text-primary hover:text-accent transition">Find Dealer</button>
              <button onClick={() => onNavigate('garage')} className="text-primary hover:text-accent transition">My Garage</button>
              <button onClick={() => onNavigate('account')} className="text-primary hover:text-accent transition">Account</button>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-gray-200 transition">
                <span className="text-sm font-semibold text-primary">Premium Member</span>
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button aria-label="Notifications" className="text-primary hover:text-accent transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold transition ${
                    activeTab === tab.id
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-gray-600 hover:text-accent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Options */}
            <div className="space-y-4">
              {options[activeTab].map(option => {
                const isSelected = 
                  (activeTab === 'exterior' && config.exteriorColor === option.name) ||
                  (activeTab === 'interior' && config.interiorTrim === option.name) ||
                  (activeTab === 'wheels' && config.wheels === option.name) ||
                  (activeTab === 'tech' && config.techPackage === option.name);

                return (
                  <div
                    key={option.name}
                    onClick={() => handleSelect(activeTab, option.name)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition ${
                      isSelected
                        ? 'border-accent bg-accent bg-opacity-5'
                        : 'border-gray-200 hover:border-accent'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-primary mb-1">{option.name}</h3>
                        <p className="text-sm text-gray-600">{option.desc}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-accent">
                          {option.price === 0 ? 'Included' : `+$${option.price.toLocaleString()}`}
                        </p>
                        {isSelected && (
                          <svg className="w-6 h-6 text-accent mt-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Preview & Summary */}
          <div className="space-y-6">
            {/* 3D Preview */}
            <div className="bg-secondary rounded-lg p-6">
              <h3 className="text-lg font-bold text-primary mb-4">3D Preview</h3>
              <div className="aspect-video bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex flex-col items-center justify-center">
                <svg className="w-16 h-16 text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600 font-semibold text-center">Interactive model coming soon</p>
              </div>
            </div>

            {/* Current Configuration */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-primary mb-4">Current Configuration</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Exterior Color:</span>
                  <span className="font-semibold text-primary">{config.exteriorColor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interior Trim:</span>
                  <span className="font-semibold text-primary">{config.interiorTrim}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wheels:</span>
                  <span className="font-semibold text-primary">{config.wheels}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tech Package:</span>
                  <span className="font-semibold text-primary">{config.techPackage}</span>
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-md font-bold text-primary mb-3">Pricing Summary</h4>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price:</span>
                    <span className="font-semibold">${pricing.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customization:</span>
                    <span className="font-semibold">${pricing.customizationCost.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold text-primary">Total Price:</span>
                  <span className="text-3xl font-bold text-accent">${pricing.totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button className="w-full py-3 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition">
                  Build & Price
                </button>
                <button
                  onClick={() => onNavigate('dealership')}
                  className="w-full py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-white transition"
                >
                  Schedule Test Drive
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-bold text-primary mb-3">Quick Actions</h4>
                <div className="space-y-2 text-sm">
                  <button onClick={() => onNavigate('dealership')} className="block text-accent hover:underline">Find Local Dealer</button>
                  <button className="block text-accent hover:underline">Download Brochure</button>
                  <button onClick={() => onNavigate('showcase')} className="block text-accent hover:underline">Compare Models</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
