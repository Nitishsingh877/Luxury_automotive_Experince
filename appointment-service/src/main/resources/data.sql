-- Initial dealership data
INSERT INTO dealership (id, name, address, services_offered, operating_hours) VALUES 
(1, 'Luxury Motors Downtown', '123 Main St, New York, NY 10001', 'Sales,Service,Test Drive,Parts', 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM'),
(2, 'Premium Auto Center', '456 Oak Ave, Los Angeles, CA 90001', 'Sales,Service,Parts,Customization', 'Mon-Fri: 8AM-7PM, Sat: 9AM-5PM'),
(3, 'Elite Car Gallery', '789 Pine Rd, Miami, FL 33101', 'Sales,Test Drive,Trade-In,Service', 'Mon-Sun: 10AM-9PM'),
(4, 'Executive Auto Group', '321 Park Ave, Chicago, IL 60601', 'Sales,Service,Test Drive,Customization', 'Mon-Sat: 8AM-9PM, Sun: 10AM-7PM'),
(5, 'Prestige Motors', '555 Broadway, San Francisco, CA 94102', 'Sales,Service,Parts,Test Drive', 'Mon-Fri: 9AM-8PM, Sat-Sun: 10AM-6PM')
ON DUPLICATE KEY UPDATE name=name;

-- Appointments for john_doe (user_id=1)
INSERT INTO appointment (id, user_id, dealership_id, service_type, date, status) VALUES 
(1, 1, 1, 'Oil Change', '2025-01-15 10:00:00', 'SCHEDULED'),
(2, 1, 2, 'Software Update', '2025-01-22 14:30:00', 'SCHEDULED'),
(3, 1, 1, 'Tire Rotation', '2024-12-10 09:00:00', 'COMPLETED'),
(4, 1, 3, 'Test Drive', '2024-11-05 15:00:00', 'COMPLETED')
ON DUPLICATE KEY UPDATE status=status;
