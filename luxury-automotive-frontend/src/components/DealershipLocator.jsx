import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DealershipLocator = ({ token, onNavigate }) => {
  const [dealerships, setDealerships] = useState([]);
  const [filteredDealerships, setFilteredDealerships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All Services');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [booking, setBooking] = useState({
    serviceType: 'Test Drive',
    date: '',
    time: ''
  });

  useEffect(() => {
    fetchDealerships();
  }, []);

  useEffect(() => {
    filterDealerships();
  }, [searchTerm, serviceFilter, dealerships]);

  const fetchDealerships = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/appointments/dealerships', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Dealerships response:', response.data);
      setDealerships(response.data);
      setFilteredDealerships(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dealerships:', error);
      // Fallback data if API fails
      const fallbackData = [
        { id: 1, name: 'Luxury Motors Downtown', address: '123 Main St, New York, NY 10001', servicesOffered: 'Sales,Service,Test Drive,Parts', operatingHours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM' },
        { id: 2, name: 'Premium Auto Center', address: '456 Oak Ave, Los Angeles, CA 90001', servicesOffered: 'Sales,Service,Parts,Customization', operatingHours: 'Mon-Fri: 8AM-7PM, Sat: 9AM-5PM' },
        { id: 3, name: 'Elite Car Gallery', address: '789 Pine Rd, Miami, FL 33101', servicesOffered: 'Sales,Test Drive,Trade-In,Service', operatingHours: 'Mon-Sun: 10AM-9PM' },
        { id: 4, name: 'Executive Auto Group', address: '321 Park Ave, Chicago, IL 60601', servicesOffered: 'Sales,Service,Test Drive,Customization', operatingHours: 'Mon-Sat: 8AM-9PM, Sun: 10AM-7PM' },
        { id: 5, name: 'Prestige Motors', address: '555 Broadway, San Francisco, CA 94102', servicesOffered: 'Sales,Service,Parts,Test Drive', operatingHours: 'Mon-Fri: 9AM-8PM, Sat-Sun: 10AM-6PM' }
      ];
      setDealerships(fallbackData);
      setFilteredDealerships(fallbackData);
      setLoading(false);
    }
  };

  const filterDealerships = () => {
    let filtered = dealerships.filter(d =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (serviceFilter !== 'All Services') {
      filtered = filtered.filter(d => d.servicesOffered.includes(serviceFilter));
    }
    setFilteredDealerships(filtered);
  };

  const handleBookAppointment = (dealer) => {
    setSelectedDealer(dealer);
    setShowModal(true);
    setBookingStep(1);
  };

  const handleConfirmBooking = async () => {
    try {
      const appointmentResponse = await axios.post(
        'http://localhost:8080/api/appointments',
        {
          userId: 1,
          dealershipId: selectedDealer.id,
          serviceType: booking.serviceType,
          date: `${booking.date}T${booking.time}:00`
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const paymentResponse = await axios.post(
        'http://localhost:8080/api/payments/create-order',
        {
          userId: 1,
          appointmentId: appointmentResponse.data.id,
          amount: 500
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: 'rzp_test_YOUR_KEY_ID',
        amount: 50000,
        currency: 'INR',
        name: 'AutoExperience',
        description: 'Appointment Deposit',
        order_id: paymentResponse.data.razorpayOrderId,
        handler: function (response) {
          alert('Appointment booked successfully!');
          setShowModal(false);
        },
        theme: { color: '#007A87' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error:', error);
      alert('Booking failed');
    }
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
              <button onClick={() => onNavigate('configurator')} className="text-primary hover:text-accent transition">Configure</button>
              <button className="text-accent font-semibold">Find Dealer</button>
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

      {/* Search Bar */}
      <div className="bg-secondary py-6">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter city, state, or ZIP code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 border-b-2 border-gray-300 bg-white focus:border-accent focus:outline-none transition"
            />
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-6 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-accent"
            >
              <option>All Services</option>
              <option>Sales</option>
              <option>Service</option>
              <option>Parts</option>
              <option>Test Drive</option>
            </select>
            <button className="px-6 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-white transition">
              Use My Location
            </button>
          </div>
        </div>
      </div>

      {/* Split Layout */}
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Column */}
          <div className="bg-secondary rounded-lg p-8 h-[600px] flex flex-col items-center justify-center">
            <svg className="w-24 h-24 text-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-primary mb-2">Interactive Map</h3>
            <p className="text-center text-gray-600 max-w-md">
              Map integration showing dealership locations. Click on a dealership from the list to view on map.
            </p>
          </div>

          {/* Dealer List Column */}
          <div className="h-[600px] overflow-y-auto space-y-4 pr-2">
            {loading ? (
              <div className="text-center py-20">
                <div className="text-xl text-gray-600">Loading dealerships...</div>
              </div>
            ) : filteredDealerships.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-xl text-gray-600">No dealerships found. Total: {dealerships.length}</div>
                <div className="text-sm text-gray-500 mt-2">Filter: {serviceFilter}, Search: {searchTerm}</div>
              </div>
            ) : (
              filteredDealerships.map((dealer) => (
                <div key={dealer.id} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-accent transition">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-2">{dealer.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">4.8 (154 reviews)</span>
                      </div>
                    </div>
                    <span className="text-accent font-bold">2.3 mi</span>
                  </div>

                  {/* Contact Info */}
                  <div className="mb-4 text-sm text-gray-700">
                    <p className="mb-1">{dealer.address}</p>
                    <p>(555) 123-4567</p>
                  </div>

                  {/* Services */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-primary mb-2">Services Offered:</p>
                    <div className="flex flex-wrap gap-2">
                      {dealer.servicesOffered.split(',').map((service, idx) => (
                        <span key={idx} className="px-3 py-1 bg-secondary text-primary text-xs font-semibold rounded-full">
                          {service.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-primary mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">Electric Vehicles</span>
                      <span className="px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">Luxury Models</span>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-primary mb-2">Operating Hours:</p>
                    <p className="text-sm text-gray-700">{dealer.operatingHours}</p>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleBookAppointment(dealer)}
                    className="w-full py-3 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Book Appointment</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {bookingStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Service Type</label>
                  <select
                    value={booking.serviceType}
                    onChange={(e) => setBooking({ ...booking, serviceType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                  >
                    <option>Test Drive</option>
                    <option>Maintenance</option>
                    <option>Service</option>
                  </select>
                </div>
                <button
                  onClick={() => setBookingStep(2)}
                  className="w-full py-3 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition"
                >
                  Next
                </button>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Date</label>
                  <input
                    type="date"
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Time</label>
                  <input
                    type="time"
                    value={booking.time}
                    onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setBookingStep(1)}
                    className="flex-1 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-white transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setBookingStep(3)}
                    className="flex-1 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="space-y-4">
                <div className="bg-secondary rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dealership:</span>
                    <span className="font-semibold">{selectedDealer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-semibold">{booking.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">{booking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold">{booking.time}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="text-gray-600">Deposit:</span>
                    <span className="font-bold text-accent">$500</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setBookingStep(2)}
                    className="flex-1 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-white transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="flex-1 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition"
                  >
                    Confirm & Pay
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DealershipLocator;
