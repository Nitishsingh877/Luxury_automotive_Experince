import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const AccountSettings = ({ token, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    serviceReminders: true,
    safetyRecalls: true,
    promotions: false,
    newsletters: false
  });
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [connectedAccounts, setConnectedAccounts] = useState([
    { id: 1, name: 'Google', connected: false },
    { id: 2, name: 'Apple', connected: false },
    { id: 3, name: 'PayPal', connected: true }
  ]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/gateway/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        street: '123 Main Street',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001'
      });
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/gateway/auth/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/api/gateway/auth/profile/password`, {
        currentPassword: password.current,
        newPassword: password.new
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Password updated successfully!');
      setPassword({ current: '', new: '', confirm: '' });
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password');
    }
  };

  const handleNotificationToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleAccountConnection = (accountId) => {
    setConnectedAccounts(connectedAccounts.map(acc =>
      acc.id === accountId ? { ...acc, connected: !acc.connected } : acc
    ));
  };

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
              <button onClick={() => onNavigate('garage')} style={{ background: 'none', border: 'none', color: '#1D1D1F', fontSize: '16px', cursor: 'pointer', padding: 0, transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#007A87'} onMouseLeave={(e) => e.target.style.color = '#1D1D1F'}>My Garage</button>
              <button style={{ background: 'none', border: 'none', color: '#007A87', fontSize: '16px', cursor: 'pointer', padding: 0, fontWeight: '600' }}>Account</button>
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
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 40px' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '600', color: '#1D1D1F', marginBottom: '32px' }}>Account Settings</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '40px' }}>
            {/* Sidebar Navigation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => setActiveTab('profile')}
                style={{
                  padding: '12px 16px',
                  backgroundColor: activeTab === 'profile' ? '#F1F1F1' : 'transparent',
                  color: activeTab === 'profile' ? '#007A87' : '#1D1D1F',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: activeTab === 'profile' ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s'
                }}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                style={{
                  padding: '12px 16px',
                  backgroundColor: activeTab === 'notifications' ? '#F1F1F1' : 'transparent',
                  color: activeTab === 'notifications' ? '#007A87' : '#1D1D1F',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: activeTab === 'notifications' ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s'
                }}
              >
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('security')}
                style={{
                  padding: '12px 16px',
                  backgroundColor: activeTab === 'security' ? '#F1F1F1' : 'transparent',
                  color: activeTab === 'security' ? '#007A87' : '#1D1D1F',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: activeTab === 'security' ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s'
                }}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab('connected')}
                style={{
                  padding: '12px 16px',
                  backgroundColor: activeTab === 'connected' ? '#F1F1F1' : 'transparent',
                  color: activeTab === 'connected' ? '#007A87' : '#1D1D1F',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: activeTab === 'connected' ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s'
                }}
              >
                Connected Accounts
              </button>
            </div>

            {/* Content Panel */}
            <div>
              {/* Profile Panel */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileSubmit}>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1D1D1F', marginBottom: '24px' }}>Personal Information</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>First Name</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        style={{ width: '100%', padding: '12px 0', fontSize: '16px', color: '#1D1D1F', border: 'none', borderBottom: '2px solid #E5E5E5', outline: 'none', transition: 'border-color 0.3s' }}
                        onFocus={(e) => e.target.style.borderBottomColor = '#007A87'}
                        onBlur={(e) => e.target.style.borderBottomColor = '#E5E5E5'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>Last Name</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        style={{ width: '100%', padding: '12px 0', fontSize: '16px', color: '#1D1D1F', border: 'none', borderBottom: '2px solid #E5E5E5', outline: 'none', transition: 'border-color 0.3s' }}
                        onFocus={(e) => e.target.style.borderBottomColor = '#007A87'}
                        onBlur={(e) => e.target.style.borderBottomColor = '#E5E5E5'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        style={{ width: '100%', padding: '12px 0', fontSize: '16px', color: '#1D1D1F', border: 'none', borderBottom: '2px solid #E5E5E5', outline: 'none', transition: 'border-color 0.3s' }}
                        onFocus={(e) => e.target.style.borderBottomColor = '#007A87'}
                        onBlur={(e) => e.target.style.borderBottomColor = '#E5E5E5'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>Phone Number</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        style={{ width: '100%', padding: '12px 0', fontSize: '16px', color: '#1D1D1F', border: 'none', borderBottom: '2px solid #E5E5E5', outline: 'none', transition: 'border-color 0.3s' }}
                        onFocus={(e) => e.target.style.borderBottomColor = '#007A87'}
                        onBlur={(e) => e.target.style.borderBottomColor = '#E5E5E5'}
                      />
                    </div>
                  </div>

                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1D1D1F', marginBottom: '24px' }}>Address Information</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '32px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>Street Address</label>
                      <input
                        type="text"
                        value={profile.street}
                        onChange={(e) => setProfile({ ...profile, street: e.target.value })}
                        style={{ width: '100%', padding: '12px 0', fontSize: '16px', color: '#1D1D1F', border: 'none', borderBottom: '2px solid #E5E5E5', outline: 'none', transition: 'border-color 0.3s' }}
                        onFocus={(e) => e.target.style.borderBottomColor = '#007A87'}
                        onBlur={(e) => e.target.style.borderBottomColor = '#E5E5E5'}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '24px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>City</label>
                        <input
                          type="text"
                          value={profile.city}
                          onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                          style={{ width: '100%', padding: '12px 0', fontSize: '16px', color: '#1D1D1F', border: 'none', borderBottom: '2px solid #E5E5E5', outline: 'none', transition: 'border-color 0.3s' }}
                          onFocus={(e) => e.target.style.borderBottomColor = '#007A87'}
                          onBlur={(e) => e.target.style.borderBottomColor = '#E5E5E5'}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>State</label>
                        <input
                          type="text"
                          value={profile.state}
                          onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                          style={{ width: '100%', padding: '12px 0', fontSize: '16px', color: '#1D1D1F', border: 'none', borderBottom: '2px solid #E5E5E5', outline: 'none', transition: 'border-color 0.3s' }}
                          onFocus={(e) => e.target.style.borderBottomColor = '#007A87'}
                          onBlur={(e) => e.target.style.borderBottomColor = '#E5E5E5'}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>ZIP Code</label>
                        <input
                          type="text"
                          value={profile.zipCode}
                          onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })}
                          style={{ width: '100%', padding: '12px 0', fontSize: '16px', color: '#1D1D1F', border: 'none', borderBottom: '2px solid #E5E5E5', outline: 'none', transition: 'border-color 0.3s' }}
                          onFocus={(e) => e.target.style.borderBottomColor = '#007A87'}
                          onBlur={(e) => e.target.style.borderBottomColor = '#E5E5E5'}
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" style={{ padding: '14px 32px', backgroundColor: '#007A87', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                    Save Changes
                  </button>
                </form>
              )}

              {/* Notifications Panel */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1D1D1F', marginBottom: '24px' }}>Communication Methods</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                    {[
                      { key: 'email', label: 'Email Notifications' },
                      { key: 'sms', label: 'SMS Notifications' },
                      { key: 'push', label: 'Push Notifications' }
                    ].map(item => (
                      <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
                        <span style={{ fontSize: '16px', color: '#1D1D1F', fontWeight: '500' }}>{item.label}</span>
                        <button
                          onClick={() => handleNotificationToggle(item.key)}
                          style={{
                            width: '52px',
                            height: '28px',
                            backgroundColor: notifications[item.key] ? '#007A87' : '#E5E5E5',
                            border: 'none',
                            borderRadius: '14px',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                          }}
                        >
                          <div style={{
                            width: '24px',
                            height: '24px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '2px',
                            left: notifications[item.key] ? '26px' : '2px',
                            transition: 'left 0.3s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}></div>
                        </button>
                      </div>
                    ))}
                  </div>

                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1D1D1F', marginBottom: '24px' }}>Notification Types</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { key: 'serviceReminders', label: 'Service Reminders' },
                      { key: 'safetyRecalls', label: 'Safety Recalls' },
                      { key: 'promotions', label: 'Promotions & Offers' },
                      { key: 'newsletters', label: 'Newsletters' }
                    ].map(item => (
                      <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
                        <span style={{ fontSize: '16px', color: '#1D1D1F', fontWeight: '500' }}>{item.label}</span>
                        <button
                          onClick={() => handleNotificationToggle(item.key)}
                          style={{
                            width: '52px',
                            height: '28px',
                            backgroundColor: notifications[item.key] ? '#007A87' : '#E5E5E5',
                            border: 'none',
                            borderRadius: '14px',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                          }}
                        >
                          <div style={{
                            width: '24px',
                            height: '24px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '2px',
                            left: notifications[item.key] ? '26px' : '2px',
                            transition: 'left 0.3s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Panel */}
              {activeTab === 'security' && (
                <form onSubmit={handlePasswordSubmit}>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1D1D1F', marginBottom: '24px' }}>Change Password</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px', maxWidth: '500px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>Current Password</label>
                      <input
                        type="password"
                        value={password.current}
                        onChange={(e) => setPassword({ ...password, current: e.target.value })}
                        style={{ width: '100%', padding: '12px 0', fontSize: '16px', color: '#1D1D1F', border: 'none', borderBottom: '2px solid #E5E5E5', outline: 'none', transition: 'border-color 0.3s' }}
                        onFocus={(e) => e.target.style.borderBottomColor = '#007A87'}
                        onBlur={(e) => e.target.style.borderBottomColor = '#E5E5E5'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>New Password</label>
                      <input
                        type="password"
                        value={password.new}
                        onChange={(e) => setPassword({ ...password, new: e.target.value })}
                        style={{ width: '100%', padding: '12px 0', fontSize: '16px', color: '#1D1D1F', border: 'none', borderBottom: '2px solid #E5E5E5', outline: 'none', transition: 'border-color 0.3s' }}
                        onFocus={(e) => e.target.style.borderBottomColor = '#007A87'}
                        onBlur={(e) => e.target.style.borderBottomColor = '#E5E5E5'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>Confirm New Password</label>
                      <input
                        type="password"
                        value={password.confirm}
                        onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                        style={{ width: '100%', padding: '12px 0', fontSize: '16px', color: '#1D1D1F', border: 'none', borderBottom: '2px solid #E5E5E5', outline: 'none', transition: 'border-color 0.3s' }}
                        onFocus={(e) => e.target.style.borderBottomColor = '#007A87'}
                        onBlur={(e) => e.target.style.borderBottomColor = '#E5E5E5'}
                      />
                    </div>
                  </div>

                  <button type="submit" style={{ padding: '14px 32px', backgroundColor: '#007A87', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                    Update Password
                  </button>
                </form>
              )}

              {/* Connected Accounts Panel */}
              {activeTab === 'connected' && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1D1D1F', marginBottom: '24px' }}>Connected Accounts</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {connectedAccounts.map(account => (
                      <div key={account.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
                        <div>
                          <div style={{ fontSize: '18px', fontWeight: '600', color: '#1D1D1F', marginBottom: '4px' }}>{account.name}</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>
                            {account.connected ? 'Connected' : 'Not connected'}
                          </div>
                        </div>
                        <button
                          onClick={() => handleAccountConnection(account.id)}
                          style={{
                            padding: '12px 24px',
                            backgroundColor: account.connected ? '#FFFFFF' : '#007A87',
                            color: account.connected ? '#DC3545' : '#FFFFFF',
                            border: account.connected ? '2px solid #DC3545' : 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          {account.connected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
