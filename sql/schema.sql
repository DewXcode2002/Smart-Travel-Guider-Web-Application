-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    country VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trips table
CREATE TABLE IF NOT EXISTS trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    destination VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    travelers INT NOT NULL,
    budget DECIMAL(10, 2) NOT NULL,
    interests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bookings table (Future-ready)
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    trip_id INT,
    item_type ENUM('hotel', 'vehicle', 'guide', 'place', 'transportation') NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    item_id INT,
    price DECIMAL(10, 2) NOT NULL,
    status ENUM('upcoming', 'completed', 'cancelled') DEFAULT 'upcoming',
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    payment_method ENUM('credit_card', 'debit_card', 'paypal', 'bank_transfer') DEFAULT NULL,
    payment_date TIMESTAMP NULL,
    transaction_id VARCHAR(100) DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE SET NULL
);

-- Districts Table
CREATE TABLE districts (
    district_id INT PRIMARY KEY AUTO_INCREMENT,
    district_name VARCHAR(50) NOT NULL UNIQUE,
    province VARCHAR(50),
    capital_city VARCHAR(50),
    area_sq_km DECIMAL(10,2),
    population INT,
    description TEXT
);

-- Tourist Places Table
CREATE TABLE tourist_places (
    place_id INT PRIMARY KEY AUTO_INCREMENT,
    district_id INT,
    place_name VARCHAR(100) NOT NULL,
    category ENUM('Historical', 'Beach', 'Wildlife', 'Hill Country', 'Religious', 'Adventure', 'Cultural', 'Nature', 'Urban'),
    description TEXT,
    entry_fee_local DECIMAL(10,2) DEFAULT 0,
    entry_fee_foreign DECIMAL(10,2) DEFAULT 0,
    opening_hours VARCHAR(100),
    best_season VARCHAR(50),
    has_parking BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (district_id) REFERENCES districts(district_id)
);

-- Hotels Table
CREATE TABLE hotels (
    hotel_id INT PRIMARY KEY AUTO_INCREMENT,
    district_id INT,
    hotel_name VARCHAR(150) NOT NULL,
    category ENUM('Budget', 'Mid-range', 'Luxury', 'Boutique', 'Heritage', 'Resort', 'Guest House'),
    address TEXT,
    city VARCHAR(50),
    contact_number VARCHAR(20),
    alternate_contact VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(200),
    price_range VARCHAR(50),
    rating DECIMAL(3,1),
    amenities TEXT,
    FOREIGN KEY (district_id) REFERENCES districts(district_id)
);

-- Tour Guides Table
CREATE TABLE tour_guides (
    guide_id INT PRIMARY KEY AUTO_INCREMENT,
    district_id INT,
    guide_name VARCHAR(100) NOT NULL,
    languages VARCHAR(200),
    contact_number VARCHAR(20),
    whatsapp_number VARCHAR(20),
    email VARCHAR(100),
    experience_years INT,
    specialization VARCHAR(200),
    license_number VARCHAR(50),
    daily_rate_lkr DECIMAL(10,2),
    vehicle_available BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (district_id) REFERENCES districts(district_id)
);

-- Transportation Table
CREATE TABLE transportation (
    transport_id INT PRIMARY KEY AUTO_INCREMENT,
    district_id INT,
    service_type VARCHAR(50),
    company_name VARCHAR(100),
    contact_number VARCHAR(20),
    email VARCHAR(100),
    vehicle_types VARCHAR(200),
    daily_rate_range VARCHAR(100),
    FOREIGN KEY (district_id) REFERENCES districts(district_id)
);

-- Ratings & Reviews Table
CREATE TABLE IF NOT EXISTS ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    item_type VARCHAR(50) DEFAULT 'platform',
    item_id INT NULL,
    item_name VARCHAR(255) NULL,
    rating INT NOT NULL,
    feedback TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
