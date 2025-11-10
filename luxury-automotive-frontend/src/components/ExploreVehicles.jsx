import React, { useState, useEffect } from 'react';

const ExploreVehicles = ({ onNavigate }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const vehicles = [
    {
      id: 1,
      name: 'Executive Sedan Pro',
      category: 'Luxury Sedan',
      price: 65999,
      engine: '3.0L Turbo V6',
      horsepower: '400 HP',
      torque: '415 lb-ft',
      drivetrain: 'AWD',
      badge: 'Adaptive Cruise Control',
      button1: 'Premium: Sunroof',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
      accent: 'gold'
    },
    {
      id: 2,
      name: 'EcoSport Electric SUV',
      category: 'Electric',
      price: 52999,
      engine: 'Dual Electric Motors',
      horsepower: '360 HP',
      torque: '390 lb-ft',
      drivetrain: 'AWD',
      badge: 'Autopilot Ready',
      button1: 'Eco-Friendly: Zero Emissions',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop',
      accent: 'green'
    },
    {
      id: 3,
      name: 'Performance Coupe GT',
      category: 'Sports Coupe',
      price: 89999,
      engine: '5.0L V8',
      horsepower: '480 HP',
      torque: '420 lb-ft',
      drivetrain: 'RWD',
      badge: 'Launch Control',
      button1: 'Carbon Fiber Roof',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&h=400&fit=crop',
      accent: 'red'
    }
  ];

  const filteredVehicles = vehicles.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === 'All Categories' || v.category === category)
  );

  const getAccentColor = (accent) => {
    if (accent === 'gold') return 'text-yellow-500';
    if (accent === 'green') return 'text-green-500';
    return 'text-red-500';
  };

  const getBadgeColor = (accent) => {
    if (accent === 'gold') return 'bg-yellow-500';
    if (accent === 'green') return 'bg-green-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-[#1D1D1F]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-primary">AutoExperience</div>
            <div className="flex items-center gap-8">
              <button className="text-primary hover:text-accent transition">Explore</button>
              <button onClick={() => onNavigate('configurator')} className="text-primary hover:text-accent transition">Configure</button>
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

      {/* Search and Filter */}
      <div className="bg-[#1D1D1F] py-8">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-600 rounded-lg bg-[#2A2A2C] text-white placeholder-gray-400 focus:outline-none focus:border-accent"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-6 py-3 border border-gray-600 rounded-lg bg-[#2A2A2C] text-white focus:outline-none focus:border-accent"
            >
              <option>All Categories</option>
              <option>Luxury Sedan</option>
              <option>Electric</option>
              <option>Sports Coupe</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => onNavigate('configurator')}
              className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition"
            >
              Customize
            </button>
            <button
              onClick={() => onNavigate('dealership')}
              className="px-6 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-white transition"
            >
              Find Dealer
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle Cards */}
      <div className="bg-[#1D1D1F] py-12">
        <div className="max-w-7xl mx-auto px-5">
          {loading ? (
            <div className="text-center py-20">
              <div className="text-2xl text-white">Loading vehicles...</div>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 bg-secondary">
                  {/* Category Badge */}
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${getBadgeColor(vehicle.accent)} text-white`}>
                    {vehicle.category}
                  </span>

                  {/* Model Name */}
                  <h3 className={`text-2xl font-bold mb-2 ${getAccentColor(vehicle.accent)}`}>
                    {vehicle.name}
                  </h3>

                  {/* Price */}
                  <p className="text-4xl font-bold text-primary mb-6">
                    ${vehicle.price.toLocaleString()}
                  </p>

                  {/* Specifications */}
                  <div className="space-y-2 mb-6 text-sm leading-tight">
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16z"/>
                      </svg>
                      <span>Engine: {vehicle.engine}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span>Horsepower: {vehicle.horsepower}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16z"/>
                      </svg>
                      <span>Torque: {vehicle.torque}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>
                      </svg>
                      <span>Drivetrain: {vehicle.drivetrain}</span>
                    </div>
                  </div>

                  {/* Feature Badge */}
                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg">
                      {vehicle.badge}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      aria-label={vehicle.button1}
                      className="flex-1 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-white transition text-sm"
                    >
                      {vehicle.button1}
                    </button>
                    <button
                      onClick={() => setSelectedVehicle(vehicle)}
                      aria-label="View Details"
                      className="flex-1 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>

      {/* Slide Panel */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={() => setSelectedVehicle(null)}>
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedVehicle(null)} className="mb-4 text-gray-600 hover:text-gray-900" aria-label="Close">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-3xl font-bold text-primary mb-2">{selectedVehicle.name}</h2>
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${getBadgeColor(selectedVehicle.accent)} text-white`}>
              {selectedVehicle.category}
            </span>
            <p className="text-3xl font-bold text-accent mb-6">${selectedVehicle.price.toLocaleString()}</p>
            <div className="space-y-3 mb-6">
              <p className="text-gray-700"><strong>Engine:</strong> {selectedVehicle.engine}</p>
              <p className="text-gray-700"><strong>Horsepower:</strong> {selectedVehicle.horsepower}</p>
              <p className="text-gray-700"><strong>Torque:</strong> {selectedVehicle.torque}</p>
              <p className="text-gray-700"><strong>Drivetrain:</strong> {selectedVehicle.drivetrain}</p>
              <p className="text-gray-700"><strong>Feature:</strong> {selectedVehicle.badge}</p>
            </div>
            <button
              onClick={() => onNavigate('configurator')}
              className="w-full py-4 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition"
            >
              Configure This Vehicle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreVehicles;
