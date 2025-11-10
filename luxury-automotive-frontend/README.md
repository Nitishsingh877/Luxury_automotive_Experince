# Luxury Automotive Experience App - Frontend

Complete React frontend implementation for the Luxury Automotive Experience App with full backend integration.

## Features

### 🏠 Home Page
- Hero section with call-to-action
- Feature highlights
- Responsive design

### 🔐 Authentication
- Login/Register screens
- JWT token management
- Secure session handling

### 🚗 Vehicle Showcase (Screen 1)
- Grid display of luxury vehicles
- Search by model name
- Filter by price range
- Real-time data from backend

### ⚙️ Configurator (Screen 2)
- Interactive vehicle customization
- Exterior color selection
- Interior trim options
- Additional features
- Dynamic pricing calculation
- Visual 3D model simulation

### 📍 Dealership Locator (Screen 3)
- Search dealerships by location
- View dealership details
- Book appointments
- Razorpay payment integration
- Service deposit payment

### 🏆 Ownership Dashboard (Screen 4)
- My Garage view
- Owned vehicles with full details (via Feign Client)
- Service history tracking
- Mileage updates
- Maintenance reminders

### 👤 Account Settings (Screen 5)
- Editable user profile
- Contact information
- Notification preferences

## Design System

### Colors
- **Primary**: #1D1D1F (Deep Charcoal)
- **Secondary**: #F1F1F1 (Light Silver)
- **Accent**: #007A87 (Teal)
- **Background**: #FFFFFF (White)

### Typography
- **Font Family**: Helvetica Neue
- **Headings**: Bold, 24-32px
- **Body Text**: Regular, 16px
- **Buttons/Labels**: Semi-bold, 14px

### Components
- **Cards**: Elevated with shadow, rounded corners
- **Buttons**: Primary (teal bg), Secondary (outlined)
- **Inputs**: Underlined style with focus states
- **Layout**: Responsive 12-column grid

## Tech Stack

- **React 18.2.0**
- **Tailwind CSS** (via CDN)
- **Axios** for API calls
- **Razorpay** for payments
- **Functional Components** with Hooks

## Prerequisites

- Node.js 16+ and npm
- Backend services running (see backend README)
- Razorpay account (for payment testing)

## Installation

```bash
cd luxury-automotive-frontend
npm install
```

## Configuration

Update Razorpay key in `DealershipLocator.js`:
```javascript
key: 'rzp_test_YOUR_KEY_ID'
```

Backend API URL is set to `http://localhost:8080` (API Gateway)

## Running the App

```bash
npm start
```

The app will open at `http://localhost:3000`

## Backend Integration

### API Endpoints Used

**Authentication**
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

**Vehicle Catalog**
- GET `/api/catalog` - Get all vehicles
- POST `/api/catalog/price` - Calculate custom price

**Appointments**
- GET `/api/appointments/dealerships` - Get dealerships
- GET `/api/appointments/dealerships/search` - Search by location
- POST `/api/appointments` - Book appointment

**Ownership**
- GET `/api/ownership/user/{userId}` - Get user vehicles (with Feign)
- PATCH `/api/ownership/{id}/mileage` - Update mileage

**Payments**
- POST `/api/payments/create-order` - Create Razorpay order
- POST `/api/payments/verify` - Verify payment

## User Flow

1. **Login/Register** → JWT token stored in localStorage
2. **Home Page** → Navigate to different sections
3. **Explore Vehicles** → Browse and filter catalog
4. **Configure Vehicle** → Customize and see pricing
5. **Book Appointment** → Select dealership and pay deposit
6. **My Garage** → View owned vehicles and service history
7. **Account Settings** → Manage profile

## Testing

### Test Credentials
- Username: `john_doe`
- Password: `password`

### Test Flow
1. Login with test credentials
2. Explore vehicles in showcase
3. Configure a vehicle and see dynamic pricing
4. Search for dealerships
5. Book an appointment (use test Razorpay credentials)
6. View owned vehicles in My Garage
7. Update profile in Account Settings

## Component Structure

```
src/
├── App.js                          # Main app with routing
├── index.js                        # Entry point
├── index.css                       # Global styles
└── components/
    ├── HomePage.js                 # Landing page
    ├── LoginScreen.js              # Authentication
    ├── VehicleShowcase.js          # Screen 1
    ├── Configurator.js             # Screen 2
    ├── DealershipLocator.js        # Screen 3
    ├── OwnershipDashboard.js       # Screen 4
    └── AccountSettings.js          # Screen 5
```

## Key Features

### State Management
- React Hooks (useState, useEffect)
- localStorage for token persistence
- Axios for HTTP requests

### Responsive Design
- Mobile-first approach
- Tailwind responsive utilities
- Adaptive layouts

### Security
- JWT token in Authorization header
- Token validation on protected routes
- Secure payment flow

### Payment Integration
- Razorpay checkout modal
- Order creation
- Payment verification
- Success/failure handling

## Styling Guidelines

All components follow strict design system:
- Consistent spacing (Tailwind scale)
- Color palette adherence
- Typography hierarchy
- Interactive states (hover, active, focus)
- Shadow and elevation
- Rounded corners

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` folder.

## Deployment

Can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## Environment Variables

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:8080
REACT_APP_RAZORPAY_KEY=rzp_test_YOUR_KEY_ID
```

## Troubleshooting

### CORS Issues
Ensure backend has CORS enabled for `http://localhost:3000`

### Payment Not Working
- Check Razorpay key is correct
- Ensure Razorpay script is loaded
- Verify backend payment service is running

### Token Expired
- Login again to get new token
- Token expires after 24 hours

## Future Enhancements

- [ ] Real-time notifications (WebSocket)
- [ ] Advanced search filters
- [ ] Vehicle comparison feature
- [ ] Wishlist functionality
- [ ] Social sharing
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Progressive Web App (PWA)

## License

Educational use only.

## Support

For issues, check:
1. Backend services are running
2. API Gateway is accessible
3. Browser console for errors
4. Network tab for API calls
