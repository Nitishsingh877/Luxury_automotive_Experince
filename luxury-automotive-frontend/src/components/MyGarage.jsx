import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const MyGarage = ({ token, onNavigate }) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVin, setSelectedVin] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (selectedVin) {
      fetchDashboardData(selectedVin);
    }
  }, [selectedVin]);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ownership/vehicles?userId=1`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Vehicles response:', response.data);
      setVehicles(response.data);
      if (response.data.length > 0) {
        setSelectedVin(response.data[0].vin);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      // Fallback data
      const fallbackVehicles = [
        { vin: '1HGBH41JXMN109186', model: 'Executive Sedan Pro', year: 2023, imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800' },
        { vin: '5YJSA1E26HF123456', model: 'EcoSport Electric SUV', year: 2024, imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800' }
      ];
      setVehicles(fallbackVehicles);
      if (fallbackVehicles.length > 0) {
        setSelectedVin(fallbackVehicles[0].vin);
      }
      setLoading(false);
    }
  };

  const fetchDashboardData = async (vin) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ownership/dashboard/${vin}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Dashboard response:', response.data);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback dashboard data
      const fallbackDashboard = {
        vin: vin,
        mileage: vin === '1HGBH41JXMN109186' ? 15420 : 8350,
        warrantyStatus: vin === '1HGBH41JXMN109186' ? 'Active - 2 years remaining' : 'Active - 3 years remaining',
        nextServiceDue: vin === '1HGBH41JXMN109186' ? '2025-01-15' : '2025-05-10',
        serviceProgress: vin === '1HGBH41JXMN109186' ? 77 : 42,
        upcomingAppointments: [
          { serviceType: 'Oil Change', date: '2025-01-15', time: '10:00 AM' },
          { serviceType: 'Software Update', date: '2025-01-22', time: '2:30 PM' }
        ],
        serviceHistory: [
          { serviceType: 'Oil Change', date: '2024-01-15', location: 'Luxury Motors Downtown' },
          { serviceType: 'Tire Rotation', date: '2024-03-20', location: 'Premium Auto Center' },
          { serviceType: 'Brake Inspection', date: '2024-06-10', location: 'Luxury Motors Downtown' }
        ],
        alerts: [
          { type: 'warning', title: 'Service Due Soon', message: 'Your vehicle is approaching the next service interval' }
        ]
      };
      setDashboardData(fallbackDashboard);
    }
  };

  const selectedVehicle = vehicles.find(v => v.vin === selectedVin);

  return (
    <div style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      {/* Sticky Header */}
      <header style={{ position: 'sticky', top: 0, backgroundColor: '#FFFFFF', color: '#1D1D1F', padding: '0', zIndex: 1000, borderBottom: '1px solid #E5E5E5', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1D1D1F' }}>AutoExperience</div>
            <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <button onClick={() => onNavigate('showcase')} style={{ background: 'none', border: 'none', color: '#1D1D1F', fontSize: '16px', cursor: 'pointer', padding: 0, transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#007A87'} onMouseLeave={(e) => e.target.style.color = '#1D1D1F'}>Explore</button>
              <button onClick={() => onNavigate('configurator')} style={{ background: 'none', border: 'none', color: '#1D1D1F', fontSize: '16px', cursor: 'pointer', padding: 0, transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#007A87'} onMouseLeave={(e) => e.target.style.color = '#1D1D1F'}>Configure</button>
              <button onClick={() => onNavigate('dealership')} style={{ background: 'none', border: 'none', color: '#1D1D1F', fontSize: '16px', cursor: 'pointer', padding: 0, transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#007A87'} onMouseLeave={(e) => e.target.style.color = '#1D1D1F'}>Find Dealer</button>
              <button style={{ background: 'none', border: 'none', color: '#007A87', fontSize: '16px', cursor: 'pointer', padding: 0, fontWeight: '600' }}>My Garage</button>
              <button onClick={() => onNavigate('account')} style={{ background: 'none', border: 'none', color: '#1D1D1F', fontSize: '16px', cursor: 'pointer', padding: 0, transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#007A87'} onMouseLeave={(e) => e.target.style.color = '#1D1D1F'}>Account</button>
            </nav>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#F1F1F1', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#E5E5E5'} onMouseLeave={(e) => e.target.style.backgroundColor = '#F1F1F1'}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1D1D1F' }}>Premium Member</span>
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button style={{ background: 'none', border: 'none', color: '#1D1D1F', cursor: 'pointer', padding: 0, transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#007A87'} onMouseLeave={(e) => e.target.style.color = '#1D1D1F'}>
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ padding: '40px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#1D1D1F' }}>Loading your vehicles...</div>
        ) : vehicles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#1D1D1F' }}>No vehicles found in your garage.</div>
        ) : (
          <>
            {/* Vehicle Toggles */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {vehicles.map(vehicle => (
                  <button
                    key={vehicle.vin}
                    onClick={() => setSelectedVin(vehicle.vin)}
                    style={{
                      padding: '16px 24px',
                      backgroundColor: selectedVin === vehicle.vin ? '#007A87' : '#F1F1F1',
                      color: selectedVin === vehicle.vin ? '#FFFFFF' : '#1D1D1F',
                      border: selectedVin === vehicle.vin ? '2px solid #007A87' : '2px solid #F1F1F1',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {vehicle.year || '2023'} {vehicle.model}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => onNavigate('dealership')} style={{ padding: '14px 28px', backgroundColor: '#1D1D1F', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                  Find Service Center
                </button>
                <button onClick={() => onNavigate('dealership')} style={{ padding: '14px 28px', backgroundColor: '#FFFFFF', color: '#1D1D1F', border: '2px solid #1D1D1F', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                  Schedule Service
                </button>
              </div>
            </div>

            {/* Dashboard Layout */}
            {dashboardData && (
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Vehicle Overview */}
                  <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1D1D1F', marginBottom: '24px' }}>Vehicle Overview</h2>
                    <img src={selectedVehicle?.imageUrl || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'} alt={selectedVehicle?.model} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '24px' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                      <div>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>VIN</div>
                        <div style={{ fontSize: '16px', color: '#1D1D1F', fontWeight: '600' }}>{dashboardData.vin}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Mileage</div>
                        <div style={{ fontSize: '16px', color: '#1D1D1F', fontWeight: '600' }}>{dashboardData.mileage?.toLocaleString()} mi</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Warranty Status</div>
                        <div style={{ fontSize: '16px', color: '#1D1D1F', fontWeight: '600' }}>{dashboardData.warrantyStatus}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Next Service Due</div>
                        <div style={{ fontSize: '16px', color: '#1D1D1F', fontWeight: '600' }}>{dashboardData.nextServiceDue}</div>
                      </div>
                    </div>
                    {/* Service Progress Bar */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#666' }}>Service Status</span>
                        <span style={{ fontSize: '14px', color: '#007A87', fontWeight: '600' }}>{dashboardData.serviceProgress}%</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F1F1', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${dashboardData.serviceProgress}%`, height: '100%', backgroundColor: '#007A87', transition: 'width 0.3s' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Appointments */}
                  <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1D1D1F', marginBottom: '24px' }}>Upcoming Appointments</h2>
                    {dashboardData.upcomingAppointments?.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {dashboardData.upcomingAppointments.map((appt, idx) => (
                          <div key={idx} style={{ padding: '16px', backgroundColor: '#F9F9F9', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '16px', fontWeight: '600', color: '#1D1D1F', marginBottom: '4px' }}>{appt.serviceType}</div>
                              <div style={{ fontSize: '14px', color: '#666' }}>{appt.date} at {appt.time}</div>
                            </div>
                            <span style={{ padding: '6px 12px', backgroundColor: '#007A87', color: '#FFFFFF', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>Scheduled</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ color: '#666', fontSize: '14px' }}>No upcoming appointments</div>
                    )}
                  </div>

                  {/* Service History */}
                  <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1D1D1F', marginBottom: '24px' }}>Service History</h2>
                    {dashboardData.serviceHistory?.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {dashboardData.serviceHistory.map((service, idx) => (
                          <div key={idx} style={{ padding: '12px', borderBottom: idx < dashboardData.serviceHistory.length - 1 ? '1px solid #E5E5E5' : 'none' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <span style={{ fontSize: '16px', fontWeight: '600', color: '#1D1D1F' }}>{service.serviceType}</span>
                              <span style={{ fontSize: '14px', color: '#666' }}>{service.date}</span>
                            </div>
                            <div style={{ fontSize: '14px', color: '#666' }}>{service.location}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ color: '#666', fontSize: '14px' }}>No service history available</div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Alerts & Notices */}
                  <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1D1D1F', marginBottom: '24px' }}>Alerts & Notices</h2>
                    {dashboardData.alerts?.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {dashboardData.alerts.map((alert, idx) => (
                          <div key={idx} style={{ padding: '16px', backgroundColor: alert.type === 'warning' ? '#FFF3CD' : alert.type === 'danger' ? '#F8D7DA' : '#D1ECF1', borderLeft: `4px solid ${alert.type === 'warning' ? '#FFC107' : alert.type === 'danger' ? '#DC3545' : '#17A2B8'}`, borderRadius: '4px' }}>
                            <div style={{ fontSize: '16px', fontWeight: '600', color: '#1D1D1F', marginBottom: '4px' }}>{alert.title}</div>
                            <div style={{ fontSize: '14px', color: '#666' }}>{alert.message}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ color: '#666', fontSize: '14px' }}>No alerts at this time</div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1D1D1F', marginBottom: '24px' }}>Quick Actions</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <button onClick={() => onNavigate('dealership')} style={{ padding: '12px', backgroundColor: '#F9F9F9', border: 'none', borderRadius: '8px', fontSize: '16px', color: '#007A87', fontWeight: '600', cursor: 'pointer', textAlign: 'left' }}>
                        Schedule Service
                      </button>
                      <button style={{ padding: '12px', backgroundColor: '#F9F9F9', border: 'none', borderRadius: '8px', fontSize: '16px', color: '#007A87', fontWeight: '600', cursor: 'pointer', textAlign: 'left' }}>
                        View Owner's Manual
                      </button>
                      <button style={{ padding: '12px', backgroundColor: '#F9F9F9', border: 'none', borderRadius: '8px', fontSize: '16px', color: '#007A87', fontWeight: '600', cursor: 'pointer', textAlign: 'left' }}>
                        Contact Support
                      </button>
                      <button onClick={() => onNavigate('showcase')} style={{ padding: '12px', backgroundColor: '#F9F9F9', border: 'none', borderRadius: '8px', fontSize: '16px', color: '#007A87', fontWeight: '600', cursor: 'pointer', textAlign: 'left' }}>
                        Explore New Vehicles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyGarage;
