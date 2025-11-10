-- Initial owned vehicle data for john_doe (user_id=1)
INSERT INTO owned_vehicle (id, user_id, vehicle_id, vin, purchase_year, current_mileage, service_history, upcoming_maintenance, warranty_status) VALUES 
(1, 1, 1, '1HGBH41JXMN109186', 2023, 15420, '[{"date":"2024-01-15","service":"Oil Change","location":"Luxury Motors Downtown","cost":150},{"date":"2024-03-20","service":"Tire Rotation","location":"Premium Auto Center","cost":80},{"date":"2024-06-10","service":"Brake Inspection","location":"Luxury Motors Downtown","cost":200}]', 'Next service due: 2025-01-15', 'Active - 2 years remaining'),
(2, 1, 2, '5YJSA1E26HF123456', 2024, 8350, '[{"date":"2024-05-10","service":"Software Update","location":"Elite Car Gallery","cost":0},{"date":"2024-08-15","service":"Battery Check","location":"Premium Auto Center","cost":100}]', 'Next service due: 2025-05-10', 'Active - 3 years remaining'),
(3, 2, 3, 'WBA3B5C50EF123789', 2024, 5200, '[{"date":"2024-09-01","service":"First Service","location":"Elite Car Gallery","cost":250}]', 'Next service due at 10,000 miles', 'Active - 3 years remaining')
ON DUPLICATE KEY UPDATE vin=vin;
