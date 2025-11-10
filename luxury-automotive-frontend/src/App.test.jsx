import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExploreVehicles from './components/ExploreVehicles';
import axios from 'axios';

jest.mock('axios');

describe('ExploreVehicles Component', () => {
  const mockToken = 'test-token';
  const mockNavigate = jest.fn();
  const mockVehicles = [
    {
      id: 1,
      modelName: 'Luxury Sedan S-Class',
      basePrice: 95000,
      specs: 'V8 Engine, 500HP, 0-60mph in 4.5s',
      features: 'Adaptive Cruise, Panoramic Roof, Premium Sound'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders header with correct elements', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<ExploreVehicles token={mockToken} onNavigate={mockNavigate} />);

    expect(screen.getByText('AutoExperience')).toBeInTheDocument();
    expect(screen.getByText('Premium Member')).toBeInTheDocument();
  });

  test('renders search and filter elements', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<ExploreVehicles token={mockToken} onNavigate={mockNavigate} />);

    expect(screen.getByPlaceholderText('Search vehicles...')).toBeInTheDocument();
    expect(screen.getByText('All Categories')).toBeInTheDocument();
  });

  test('renders action buttons with correct styles', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<ExploreVehicles token={mockToken} onNavigate={mockNavigate} />);

    const customizeBtn = screen.getByText('Customize');
    const dealerBtn = screen.getByText('Find Dealer');

    expect(customizeBtn).toHaveClass('bg-accent', 'text-white');
    expect(dealerBtn).toHaveClass('border-2', 'border-accent', 'text-accent');
  });

  test('fetches and displays vehicle data', async () => {
    axios.get.mockResolvedValue({ data: mockVehicles });
    render(<ExploreVehicles token={mockToken} onNavigate={mockNavigate} />);

    await waitFor(() => {
      expect(screen.getByText('Luxury Sedan S-Class')).toBeInTheDocument();
      expect(screen.getByText('$95,000')).toBeInTheDocument();
      expect(screen.getByText('V8 Engine, 500HP, 0-60mph in 4.5s')).toBeInTheDocument();
    });
  });

  test('displays loading state', () => {
    axios.get.mockImplementation(() => new Promise(() => {}));
    render(<ExploreVehicles token={mockToken} onNavigate={mockNavigate} />);

    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test('vehicle card has correct design system colors', async () => {
    axios.get.mockResolvedValue({ data: mockVehicles });
    render(<ExploreVehicles token={mockToken} onNavigate={mockNavigate} />);

    await waitFor(() => {
      const card = screen.getByText('Luxury Sedan S-Class').closest('div').parentElement;
      expect(card).toHaveClass('bg-secondary', 'rounded-lg', 'shadow-lg');
    });
  });

  test('calls API with correct authorization header', async () => {
    axios.get.mockResolvedValue({ data: mockVehicles });
    render(<ExploreVehicles token={mockToken} onNavigate={mockNavigate} />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8080/api/catalog',
        { headers: { Authorization: `Bearer ${mockToken}` } }
      );
    });
  });

  test('View Details button navigates to configurator', async () => {
    axios.get.mockResolvedValue({ data: mockVehicles });
    render(<ExploreVehicles token={mockToken} onNavigate={mockNavigate} />);

    await waitFor(() => {
      const viewDetailsBtn = screen.getByText('View Details');
      viewDetailsBtn.click();
      expect(mockNavigate).toHaveBeenCalledWith('configurator');
    });
  });
});
