-- Initial vehicle catalog data
INSERT INTO vehicle (id, model_name, base_price, specs, features, exterior_colors, interior_trims) VALUES 
(1, 'Executive Sedan Pro', 65999.00, '3.0L Turbo V6, 400HP, 415 lb-ft, AWD', 'Adaptive Cruise Control, Premium Sunroof, Leather Seats', '["Pearl White", "Midnight Black", "Silver Metallic"]', '["Black Leather", "Beige Nappa", "Brown Walnut"]'),
(2, 'EcoSport Electric SUV', 52999.00, 'Dual Electric Motors, 360HP, 390 lb-ft, AWD', 'Autopilot Ready, Zero Emissions, Fast Charging', '["Arctic White", "Ocean Blue", "Forest Green"]', '["Black Vegan", "Grey Sustainable", "Tan Eco"]'),
(3, 'Performance Coupe GT', 89999.00, '5.0L V8, 480HP, 420 lb-ft, RWD', 'Launch Control, Carbon Fiber Roof, Sport Exhaust', '["Racing Red", "Stealth Grey", "Alpine White"]', '["Red Alcantara", "Black Carbon", "White Leather"]')
ON DUPLICATE KEY UPDATE model_name=model_name;
