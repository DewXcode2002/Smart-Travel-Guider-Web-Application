const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Critical: Catch unhandled errors that could crash the server
process.on('uncaughtException', (err) => {
    console.error('CRITICAL: Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL: Unhandled Rejection at:', promise, 'reason:', reason);
});


const app = express();
app.use(cors());
app.use(express.json());

// Add a simple request logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// --- AUTHENTICATION MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Authorization token required' });

    jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    // We fetch the current role from the DB to be safe, or use the token if it's trusted
    const sql = "SELECT role FROM users WHERE id = ?";
    db.query(sql, [req.user.id], (err, results) => {
        if (err || results.length === 0 || results[0].role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied: Administrative privileges required' });
        }
        next();
    });
};

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'travelguider',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false }
});

// Helper to initialize DB and tables
const initializeDB = async () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 22011,
    ssl: { rejectUnauthorized: false }
  }).promise();

    try {
       // await connection.query("CREATE DATABASE IF NOT EXISTS travelguider");
    // await connection.query("USE travelguider");

        // Users table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                dob DATE NOT NULL,
                country VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                phone VARCHAR(20) NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'admin', 'supplier') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Update role enum if it already exists without 'supplier'
// Update role enum safely (ignore error if already exists)
try {
  await connection.query("ALTER TABLE users ADD COLUMN role ENUM('user', 'admin', 'supplier') DEFAULT 'user'");
} catch (err) {
  // Column bereits vorhanden හෝ වෙනත් warning එකක් ආවොත් ignore කරයි
}

        // Seed default admin
        const [admins] = await connection.query("SELECT * FROM users WHERE email = 'admin@travelguider.com'");
        if (admins.length === 0) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await connection.query(`
                INSERT INTO users (first_name, last_name, dob, country, email, phone, password, role)
                VALUES ('System', 'Admin', '1990-01-01', 'Sri Lanka', 'admin@travelguider.com', '0000000000', ?, 'admin')
            `, [hashedPassword]);
            console.log("Default admin account created.");
        } else {
            console.log("Default admin already exists.");
        }

        // Districts Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS districts (
                district_id INT PRIMARY KEY AUTO_INCREMENT,
                district_name VARCHAR(50) NOT NULL UNIQUE,
                province VARCHAR(50),
                capital_city VARCHAR(50),
                area_sq_km DECIMAL(10,2),
                population INT,
                description TEXT
            )
        `);

        // Hotels Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS hotels (
                hotel_id INT PRIMARY KEY AUTO_INCREMENT,
                district_id INT,
                supplier_id INT,
                hotel_name VARCHAR(150) NOT NULL,
                category ENUM('Budget', 'Mid-range', 'Luxury', 'Boutique', 'Heritage', 'Resort', 'Guest House'),
                address TEXT,
                city VARCHAR(50),
                contact_number VARCHAR(20),
                email VARCHAR(100),
                price_range VARCHAR(50),
                rating DECIMAL(3,1),
                amenities TEXT,
                FOREIGN KEY (district_id) REFERENCES districts(district_id),
                FOREIGN KEY (supplier_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `);

        // Tourist Places Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS tourist_places (
                place_id INT PRIMARY KEY AUTO_INCREMENT,
                district_id INT,
                place_name VARCHAR(100) NOT NULL,
                category ENUM('Historical', 'Beach', 'Wildlife', 'Hill Country', 'Religious', 'Adventure', 'Cultural', 'Nature', 'Urban'),
                description TEXT,
                entry_fee_local DECIMAL(10,2) DEFAULT 0,
                entry_fee_foreign DECIMAL(10,2) DEFAULT 0,
                opening_hours VARCHAR(100),
                FOREIGN KEY (district_id) REFERENCES districts(district_id)
            )
        `);

        // Tour Guides Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS tour_guides (
                guide_id INT PRIMARY KEY AUTO_INCREMENT,
                district_id INT,
                supplier_id INT,
                guide_name VARCHAR(100) NOT NULL,
                languages VARCHAR(200),
                contact_number VARCHAR(20),
                experience_years INT,
                daily_rate_lkr DECIMAL(10,2),
                FOREIGN KEY (district_id) REFERENCES districts(district_id),
                FOREIGN KEY (supplier_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `);

        // Transportation Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS transportation (
                transport_id INT PRIMARY KEY AUTO_INCREMENT,
                district_id INT,
                supplier_id INT,
                service_type VARCHAR(50),
                company_name VARCHAR(100),
                contact_number VARCHAR(20),
                vehicle_types VARCHAR(200),
                daily_rate_range VARCHAR(100),
                FOREIGN KEY (district_id) REFERENCES districts(district_id),
                FOREIGN KEY (supplier_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `);

        // Trips table
        await connection.query(`
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
            )
        `);

        // Bookings table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS bookings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                trip_id INT NULL,
                item_type ENUM('hotel', 'vehicle', 'guide', 'place', 'transportation') NOT NULL,
                item_name VARCHAR(255) NOT NULL,
                item_id INT,
                price DECIMAL(10, 2) NOT NULL,
                status ENUM('upcoming', 'completed', 'cancelled') DEFAULT 'upcoming',
                booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE SET NULL
            )
        `);

        // Ratings & Feedback Table
        await connection.query(`
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
            )
        `);

        // Ensure Supplier linkage columns exist for existing databases
        try { await connection.query("ALTER TABLE hotels ADD COLUMN supplier_id INT, ADD FOREIGN KEY (supplier_id) REFERENCES users(id) ON DELETE SET NULL"); } catch (e) { }
        try { await connection.query("ALTER TABLE tour_guides ADD COLUMN supplier_id INT, ADD FOREIGN KEY (supplier_id) REFERENCES users(id) ON DELETE SET NULL"); } catch (e) { }
        try { await connection.query("ALTER TABLE transportation ADD COLUMN supplier_id INT, ADD FOREIGN KEY (supplier_id) REFERENCES users(id) ON DELETE SET NULL"); } catch (e) { }

        console.log("Database and tables initialized successfully.");
    } catch (err) {
        console.error("Error during database initialization:", err);
    } finally {
        await connection.end();
    }
};

initializeDB();

const db = pool;

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    const { firstName, lastName, dob, country, email, phone, password, role } = req.body;
    console.log(`Registration attempt for email: ${email}, role: ${role || 'user'}`);

    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role === 'supplier' ? 'supplier' : 'user';
        const sql = "INSERT INTO users (first_name, last_name, dob, country, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        db.query(sql, [firstName, lastName, dob, country, email, phone, hashedPassword, userRole], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log(`Registration failed: Email ${email} already exists`);
                    return res.status(400).json({ message: 'Email already exists' });
                }
                console.error('Database error during registration:', err);
                return res.status(500).json({ message: 'Internal server error during database registration' });
            }
            console.log(`User registered successfully: ${email} as ${userRole}`);
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Error during registration process:', error);
        res.status(500).json({ message: 'Internal server error during registration' });
    }
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt for email: ${email}`);

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Database error during login:', err);
            return res.status(500).json({ message: 'Internal server error during database query' });
        }

        if (results.length === 0) {
            console.log(`User not found: ${email}`);
            return res.status(400).json({ message: 'User not found' });
        }

        try {
            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                console.log(`Invalid password for user: ${email}`);
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET || 'secret_key',
                { expiresIn: '1h' }
            );

            console.log(`Login successful for user: ${email}`);
            res.json({
                token,
                user: {
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (bcryptError) {
            console.error('Bcrypt or JWT error during login:', bcryptError);
            res.status(500).json({ message: 'Internal server error during authentication' });
        }
    });
});

app.post('/api/auth/forgot-password', (req, res) => {
    // Mock success as per requirement
    res.json({ message: 'Reset link sent to your email' });
});

// Trip Routes
app.post('/api/trips/create', (req, res) => {
    const { user_id, destination, start_date, end_date, travelers, budget, interests } = req.body;
    const sql = "INSERT INTO trips (user_id, destination, start_date, end_date, travelers, budget, interests) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [user_id, destination, start_date, end_date, travelers, budget, JSON.stringify(interests)], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'Trip created successfully', tripId: result.insertId });
    });
});

app.get('/api/trips/user/:id', (req, res) => {
    const sql = "SELECT * FROM trips WHERE user_id = ? ORDER BY created_at DESC";
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

// Ratings & Review Routes
app.post('/api/ratings/submit', (req, res) => {
    const { user_id, item_type, item_id, item_name, rating, feedback } = req.body;
    const sql = "INSERT INTO ratings (user_id, item_type, item_id, item_name, rating, feedback) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [user_id || null, item_type || 'platform', item_id || null, item_name || 'TravelGuider Platform', rating, feedback || ''], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'Rating submitted successfully', ratingId: result.insertId });
    });
});

app.get('/api/ratings/stats', (req, res) => {
    const sql = "SELECT AVG(rating) as avg_rating, COUNT(*) as total_ratings FROM ratings";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results[0] || { avg_rating: 4.9, total_ratings: 0 });
    });
});

// Districts and Recommendations Routes
app.get('/api/districts', (req, res) => {
    const sql = "SELECT * FROM districts ORDER BY district_name ASC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

// Helper to get image for place/hotel
const getPlaceImage = (name, category) => {
    const keywords = {
        'Temple': 'https://images.unsplash.com/photo-1580237072617-771c3ecc450c?auto=format&fit=crop&q=80&w=800',
        'Fort': 'https://images.unsplash.com/photo-1586902043120-00868f0def95?auto=format&fit=crop&q=80&w=800',
        'Beach': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=800',
        'Park': 'https://images.unsplash.com/photo-1534732806146-b3bf32171b48?auto=format&fit=crop&q=80&w=800',
        'Falls': 'https://images.unsplash.com/photo-1542614532-6a6d38e077d7?auto=format&fit=crop&q=80&w=800',
        'Peak': 'https://images.unsplash.com/photo-1542384661-3959fe41a66a?auto=format&fit=crop&q=80&w=800',
        'Tea': 'https://images.unsplash.com/photo-1596716035041-3b749d95cf10?auto=format&fit=crop&q=80&w=800',
        'Garden': 'https://images.unsplash.com/photo-1588257833075-514b87e22026?auto=format&fit=crop&q=80&w=800',
        'Lake': 'https://images.unsplash.com/photo-1577948332062-127b60706509?auto=format&fit=crop&q=80&w=800',
        'Museum': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'
    };

    for (const [key, url] of Object.entries(keywords)) {
        if (name && name.includes(key)) return url;
    }

    // Category fallbacks
    if (category === 'Beach') return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800';
    if (category === 'Wildlife') return 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800';
    if (category === 'Hill Country') return 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800';

    return 'https://images.unsplash.com/photo-1588598142106-963db8746c1c?auto=format&fit=crop&q=80&w=800'; // Default Sri Lanka
};

// Safe query helper
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

app.post('/api/trips/generate', async (req, res) => {
    const { districtId, targetPlace, startDate, endDate, travelers, budget, interests } = req.body;
    console.log(`Generating itinerary for District: ${districtId}, TargetPlace: ${targetPlace}, Interests: ${interests}`);

    try {
        // 1. Calculate Days
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        if (isNaN(days) || days <= 0) {
            return res.status(400).json({ message: 'Invalid dates provided.' });
        }

        // 2. Fetch District Info
        const districtRows = await query("SELECT * FROM districts WHERE district_id = ?", [districtId]);
        const district = districtRows[0];

        if (!district) return res.status(404).json({ message: 'District not found' });

        // 3. Fetch Places, Hotels, Guides, & Transportation
        const places = await query("SELECT * FROM tourist_places WHERE district_id = ?", [districtId]);
        const hotels = await query("SELECT * FROM hotels WHERE district_id = ?", [districtId]);
        const guides = await query("SELECT * FROM tour_guides WHERE district_id = ?", [districtId]);
        const transportOptions = await query("SELECT * FROM transportation WHERE district_id = ?", [districtId]);

        // 4. Filter Places based on interests
        const interestMap = {
            'sightseeing': ['Historical', 'Nature', 'Urban', 'Religious', 'Hill Country'],
            'adventure': ['Adventure', 'Wildlife', 'Hill Country', 'Nature'],
            'relaxation': ['Beach', 'Nature', 'Hill Country', 'Resort'],
            'cultural': ['Cultural', 'Religious', 'Historical']
        };

        const userCategories = new Set();
        if (Array.isArray(interests)) {
            interests.forEach(i => {
                if (interestMap[i]) interestMap[i].forEach(c => userCategories.add(c));
            });
        }

        let filteredPlaces = places.filter(p => userCategories.has(p.category));
        // If too few places, fallback to all places
        if (filteredPlaces.length < days || filteredPlaces.length === 0) {
            filteredPlaces = places;
        }

        // Shuffle places for randomness
        filteredPlaces.sort(() => 0.5 - Math.random());

        // Prioritize targetPlace if passed (e.g. Nine Arch Bridge, Sigiriya, etc.)
        if (targetPlace) {
            const targetLower = targetPlace.toLowerCase().trim();
            const existingIndex = filteredPlaces.findIndex(p => p.place_name && p.place_name.toLowerCase().includes(targetLower));

            if (existingIndex !== -1) {
                const [targetObj] = filteredPlaces.splice(existingIndex, 1);
                filteredPlaces.unshift(targetObj);
            } else {
                // If not found in DB places, insert a custom target place entry at the top
                const customTargetPlace = {
                    place_id: 99999,
                    district_id: districtId,
                    place_name: targetPlace,
                    category: 'Historical',
                    description: `Exploration of ${targetPlace} and iconic surrounding scenery.`,
                    entry_fee_local: 0,
                    entry_fee_foreign: 0,
                    opening_hours: '08:00 AM - 06:00 PM'
                };
                filteredPlaces.unshift(customTargetPlace);
            }
        }

        // 5. Select Hotel
        const budgetPerDay = (budget || 1000) / days;
        let targetCategory = 'Mid-range';
        if (budgetPerDay < 100) targetCategory = 'Budget';
        else if (budgetPerDay > 300) targetCategory = 'Luxury';

        let selectedHotel = hotels.find(h => h.category === targetCategory) || hotels[0] || { hotel_name: 'Standard Hotel', price_range: '100', category: 'Standard', city: district.capital_city || 'City' };

        // 6. Select Guide & Transport
        const selectedGuide = guides.length > 0 ? guides[Math.floor(Math.random() * guides.length)] : null;
        const selectedTransport = transportOptions.length > 0 ? transportOptions[Math.floor(Math.random() * transportOptions.length)] : null;

        // 7. Build Itinerary
        const itinerary = [];
        let placeIndex = 0;

        for (let i = 0; i < days; i++) {
            const date = new Date(start);
            date.setDate(start.getDate() + i);

            const dayPlan = {
                dayNumber: i + 1,
                date: date.toISOString().split('T')[0],
                morning: null,
                afternoon: null,
                evening: null
            };

            // Morning Activity
            if (placeIndex < filteredPlaces.length) {
                const p = filteredPlaces[placeIndex++];
                dayPlan.morning = {
                    name: p.place_name,
                    type: p.category,
                    description: p.description || `Explore the amazing ${p.place_name}.`,
                    location: district.district_name,
                    image: getPlaceImage(p.place_name, p.category),
                    entryFee: p.entry_fee_foreign || 0
                };
            }

            // Afternoon Activity
            if (placeIndex < filteredPlaces.length) {
                const p = filteredPlaces[placeIndex++];
                dayPlan.afternoon = {
                    name: p.place_name,
                    type: p.category,
                    description: p.description || `Enjoy a visit to ${p.place_name}.`,
                    location: district.district_name,
                    image: getPlaceImage(p.place_name, p.category),
                    entryFee: p.entry_fee_foreign || 0
                };
            }

            // Evening - Could be another place or Relax
            if (placeIndex < filteredPlaces.length && Math.random() > 0.3) {
                const p = filteredPlaces[placeIndex++];
                dayPlan.evening = {
                    name: p.place_name,
                    type: p.category,
                    description: p.description || `Evening visit to ${p.place_name}.`,
                    location: district.district_name,
                    image: getPlaceImage(p.place_name, p.category),
                    entryFee: p.entry_fee_foreign || 0
                };
            } else {
                dayPlan.evening = {
                    name: 'Relax at ' + selectedHotel.hotel_name,
                    type: 'Relaxation',
                    description: 'Enjoy a peaceful evening at your hotel.',
                    location: selectedHotel.city || district.district_name,
                    image: getPlaceImage('Relax', 'Relaxation'),
                    entryFee: 0
                };
            }

            itinerary.push(dayPlan);
        }

        // 8. Calculate Costs
        const parseHotelRate = (h) => {
            if (!h) return 180;
            const priceVal = String(h.price_range || h.price || '');
            const parsed = parseFloat(priceVal.replace(/[^0-9.]/g, ''));
            if (!isNaN(parsed) && parsed > 0) return parsed;
            if (priceVal.includes('$')) {
                const dollars = (priceVal.match(/\$/g) || []).length;
                if (dollars >= 4) return 240;
                if (dollars === 3) return 150;
                if (dollars === 2) return 85;
                return 50;
            }
            const cat = String(h.category || '').toLowerCase();
            if (cat.includes('5-star') || cat.includes('luxury') || cat.includes('resort')) return 220;
            if (cat.includes('heritage') || cat.includes('boutique')) return 130;
            if (cat.includes('mid') || cat.includes('eco')) return 90;
            return 65;
        };

        const hotelPrice = parseHotelRate(selectedHotel);
        const hotelCost = Math.round(hotelPrice * days);

        let guideCost = 0;
        if (selectedGuide) {
            const rawRate = parseFloat(selectedGuide.daily_rate_lkr) || 12000;
            guideCost = Math.round((rawRate * days) / 300);
        } else {
            guideCost = Math.round(days * 35);
        }

        let transportCost = 0;
        if (selectedTransport) {
            const rateStr = selectedTransport.daily_rate_range ? selectedTransport.daily_rate_range.split('-')[0] : '0';
            const parsedTrans = parseFloat(rateStr.replace(/[^0-9.]/g, '')) || 65;
            transportCost = Math.round(parsedTrans * days);
        } else {
            transportCost = Math.round(days * 65);
        }

        let activitiesCost = itinerary.reduce((total, day) => {
            let dCost = 0;
            if (day.morning?.entryFee) dCost += parseFloat(day.morning.entryFee) || 0;
            if (day.afternoon?.entryFee) dCost += parseFloat(day.afternoon.entryFee) || 0;
            if (day.evening?.entryFee) dCost += parseFloat(day.evening.entryFee) || 0;
            return total + dCost;
        }, 0) * (travelers || 1);

        if (activitiesCost <= 0) activitiesCost = Math.round(days * 25 * (travelers || 1));

        const totalEstimated = Math.round(hotelCost + transportCost + activitiesCost + guideCost);

        const responseData = {
            destination: district.district_name,
            startDate,
            endDate,
            days,
            travelers,
            budget,
            interests,
            hotel: {
                name: selectedHotel.hotel_name,
                location: selectedHotel.city,
                price: hotelPrice,
                rating: selectedHotel.rating
            },
            guide: selectedGuide ? {
                name: selectedGuide.guide_name,
                languages: selectedGuide.languages,
                rate: selectedGuide.daily_rate_lkr,
                contact: selectedGuide.contact_number
            } : null,
            transport: selectedTransport ? {
                company: selectedTransport.company_name,
                type: selectedTransport.service_type,
                vehicle: selectedTransport.vehicle_types,
                contact: selectedTransport.contact_number
            } : null,
            costs: {
                hotel: hotelCost,
                transport: transportCost,
                activities: activitiesCost,
                guide: guideCost,
                total: totalEstimated
            },
            itinerary
        };

        res.json(responseData);

    } catch (error) {
        console.error('Itinerary Gen Error:', error);
        res.status(500).json({ message: 'Failed to generate itinerary: ' + (error.message || 'Unknown error') });
    }
});

app.get('/api/districts/:id/recommendations', (req, res) => {
    const districtId = req.params.id;
    const recommendations = {};

    const queries = [
        { key: 'places', sql: "SELECT * FROM tourist_places WHERE district_id = ?" },
        { key: 'hotels', sql: "SELECT * FROM hotels WHERE district_id = ?" },
        { key: 'guides', sql: "SELECT * FROM tour_guides WHERE district_id = ?" },
        { key: 'transportation', sql: "SELECT * FROM transportation WHERE district_id = ?" }
    ];

    let completed = 0;
    let hasError = false;

    queries.forEach(query => {
        db.query(query.sql, [districtId], (err, results) => {
            if (hasError) return;
            if (err) {
                hasError = true;
                return res.status(500).json({ message: err.message });
            }

            recommendations[query.key] = results;
            completed++;

            if (completed === queries.length) {
                res.json(recommendations);
            }
        });
    });
});

// Admin Routes
// Basic Supplier Routes
app.get('/api/supplier/stats', authenticateToken, (req, res) => {
    if (req.user.role !== 'supplier' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Supplier access required' });
    }

    const supplierId = req.user.id;
    const stats = {};
    const queries = [
        {
            key: 'totalBookings', sql: `
            SELECT COUNT(*) as count FROM bookings b
            JOIN hotels h ON b.item_id = h.hotel_id AND b.item_type = 'hotel'
            WHERE h.supplier_id = ?
        ` },
        {
            key: 'totalRevenue', sql: `
            SELECT SUM(b.price) as total FROM bookings b
            JOIN hotels h ON b.item_id = h.hotel_id AND b.item_type = 'hotel'
            WHERE h.supplier_id = ? AND b.status != 'cancelled'
        ` },
        {
            key: 'recentBookings', sql: `
            SELECT b.*, u.first_name, u.last_name FROM bookings b
            JOIN users u ON b.user_id = u.id
            JOIN hotels h ON b.item_id = h.hotel_id AND b.item_type = 'hotel'
            WHERE h.supplier_id = ?
            ORDER BY b.booking_date DESC LIMIT 5
        ` }
    ];

    let completed = 0;
    let hasError = false;

    queries.forEach(query => {
        db.query(query.sql, [supplierId], (err, results) => {
            if (hasError) return;
            if (err) {
                hasError = true;
                return res.status(500).json({ message: err.message });
            }
            stats[query.key] = query.key === 'recentBookings' ? results : results[0];
            completed++;
            if (completed === queries.length) res.json(stats);
        });
    });
});

app.get('/api/supplier/bookings', authenticateToken, (req, res) => {
    if (req.user.role !== 'supplier' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Supplier access required' });
    }

    const sql = `
        SELECT b.*, u.first_name, u.last_name, u.email
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        LEFT JOIN hotels h ON b.item_id = h.hotel_id AND b.item_type = 'hotel'
        LEFT JOIN tour_guides g ON b.item_id = g.guide_id AND b.item_type = 'guide'
        LEFT JOIN transportation t ON b.item_id = t.transport_id AND b.item_type = 'transportation'
        WHERE h.supplier_id = ? OR g.supplier_id = ? OR t.supplier_id = ?
        ORDER BY b.booking_date DESC
    `;
    db.query(sql, [req.user.id, req.user.id, req.user.id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

// Admin Routes - Protected
app.get('/api/admin/stats', authenticateToken, isAdmin, (req, res) => {
    const stats = {};
    const queries = [
        { key: 'totalUsers', sql: "SELECT COUNT(*) as count FROM users" },
        { key: 'totalBookings', sql: "SELECT COUNT(*) as count FROM bookings" },
        { key: 'totalRevenue', sql: "SELECT SUM(price) as total FROM bookings WHERE status != 'cancelled'" },
        { key: 'bookingsByType', sql: "SELECT item_type, COUNT(*) as count FROM bookings GROUP BY item_type" },
        { key: 'recentBookings', sql: "SELECT b.*, u.first_name, u.last_name FROM bookings b JOIN users u ON b.user_id = u.id ORDER BY b.booking_date DESC LIMIT 5" }
    ];

    let completed = 0;
    let hasError = false;

    queries.forEach(query => {
        db.query(query.sql, (err, results) => {
            if (hasError) return;
            if (err) {
                hasError = true;
                return res.status(500).json({ message: err.message });
            }

            stats[query.key] = query.key === 'bookingsByType' || query.key === 'recentBookings' ? results : results[0];
            completed++;

            if (completed === queries.length) {
                res.json(stats);
            }
        });
    });
});

app.get('/api/admin/bookings', authenticateToken, isAdmin, (req, res) => {
    const sql = `
        SELECT b.*, u.first_name, u.last_name, u.email 
        FROM bookings b 
        JOIN users u ON b.user_id = u.id 
        ORDER BY b.booking_date DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});


// Extra management routes
app.post('/api/bookings/:id/cancel', (req, res) => {
    const sql = "UPDATE bookings SET status = 'cancelled' WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Booking cancelled successfully' });
    });
});

// User Profile Routes
app.get('/api/users/:id', (req, res) => {
    const sql = "SELECT id, first_name, last_name, dob, country, email, phone, created_at, role FROM users WHERE id = ?";
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
});

// --- ADMIN MANAGEMENT ENDPOINTS ---

// Global Retrieval (No auth for viewing, but mutative actions protected below)
app.get('/api/districts', (req, res) => {
    db.query("SELECT * FROM districts", (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

app.get('/api/hotels', (req, res) => {
    db.query("SELECT * FROM hotels", (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

app.get('/api/hotels/district/:districtId', (req, res) => {
    const sql = "SELECT * FROM hotels WHERE district_id = ?";
    db.query(sql, [req.params.districtId], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

app.get('/api/hotels/:id', (req, res) => {
    const sql = "SELECT * FROM hotels WHERE hotel_id = ?";
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Hotel not found' });
        res.json(results[0]);
    });
});

app.get('/api/hotels/search/name/:name', (req, res) => {
    const name = req.params.name.replace(/-/g, ' ');
    const sql = "SELECT * FROM hotels WHERE LOWER(hotel_name) = LOWER(?)";
    db.query(sql, [name], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Hotel not found' });
        res.json(results[0]);
    });
});

app.get('/api/places', (req, res) => {
    db.query("SELECT * FROM tourist_places", (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

// Admin Stats - Protected
app.get('/api/admin/stats', authenticateToken, isAdmin, (req, res) => {
    // Current stats logic exists below in the original file, I'll move it here or apply middleware there.
    // Actually, I'll just apply the middleware to the existing declarations.
});

// Applying protection to existing endpoints:
app.post('/api/districts', authenticateToken, isAdmin, (req, res) => {
    const { district_name, province, capital_city, area_sq_km, population, description } = req.body;
    const sql = "INSERT INTO districts (district_name, province, capital_city, area_sq_km, population, description) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [district_name, province, capital_city, area_sq_km, population, description], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'District created successfully', id: result.insertId });
    });
});

app.put('/api/districts/:id', authenticateToken, isAdmin, (req, res) => {
    const { district_name, province, capital_city, area_sq_km, population, description } = req.body;
    const sql = "UPDATE districts SET district_name=?, province=?, capital_city=?, area_sq_km=?, population=?, description=? WHERE district_id=?";
    db.query(sql, [district_name, province, capital_city, area_sq_km, population, description, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'District updated successfully' });
    });
});

app.delete('/api/districts/:id', authenticateToken, isAdmin, (req, res) => {
    const sql = "DELETE FROM districts WHERE district_id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'District deleted successfully' });
    });
});

// Hotel Management
app.post('/api/hotels', authenticateToken, isAdmin, (req, res) => {
    const { district_id, hotel_name, category, address, city, contact_number, email, price_range, rating, amenities } = req.body;
    const sql = "INSERT INTO hotels (district_id, hotel_name, category, address, city, contact_number, email, price_range, rating, amenities) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [district_id, hotel_name, category, address, city, contact_number, email, price_range, rating, amenities], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'Hotel created successfully', id: result.insertId });
    });
});

app.put('/api/hotels/:id', authenticateToken, isAdmin, (req, res) => {
    const { hotel_name, category, address, city, contact_number, email, price_range, rating, amenities } = req.body;
    const sql = "UPDATE hotels SET hotel_name=?, category=?, address=?, city=?, contact_number=?, email=?, price_range=?, rating=?, amenities=? WHERE hotel_id=?";
    db.query(sql, [hotel_name, category, address, city, contact_number, email, price_range, rating, amenities, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Hotel updated successfully' });
    });
});

app.delete('/api/hotels/:id', authenticateToken, isAdmin, (req, res) => {
    const sql = "DELETE FROM hotels WHERE hotel_id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Hotel deleted successfully' });
    });
});

// Tourist Place Management
app.post('/api/places', authenticateToken, isAdmin, (req, res) => {
    const { district_id, place_name, category, description, entry_fee_local, entry_fee_foreign, opening_hours } = req.body;
    const sql = "INSERT INTO tourist_places (district_id, place_name, category, description, entry_fee_local, entry_fee_foreign, opening_hours) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [district_id, place_name, category, description, entry_fee_local, entry_fee_foreign, opening_hours], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'Place created successfully', id: result.insertId });
    });
});

app.put('/api/places/:id', authenticateToken, isAdmin, (req, res) => {
    const { place_name, category, description, entry_fee_local, entry_fee_foreign, opening_hours } = req.body;
    const sql = "UPDATE tourist_places SET place_name=?, category=?, description=?, entry_fee_local=?, entry_fee_foreign=?, opening_hours=? WHERE place_id=?";
    db.query(sql, [place_name, category, description, entry_fee_local, entry_fee_foreign, opening_hours, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Place updated successfully' });
    });
});

app.delete('/api/places/:id', authenticateToken, isAdmin, (req, res) => {
    const sql = "DELETE FROM tourist_places WHERE place_id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Place deleted successfully' });
    });
});

// Guide Management
app.get('/api/guides', (req, res) => {
    db.query("SELECT * FROM tour_guides", (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

app.post('/api/guides', authenticateToken, isAdmin, (req, res) => {
    const { district_id, guide_name, languages, contact_number, experience_years, daily_rate_lkr } = req.body;
    const sql = "INSERT INTO tour_guides (district_id, guide_name, languages, contact_number, experience_years, daily_rate_lkr) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [district_id, guide_name, languages, contact_number, experience_years, daily_rate_lkr], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'Guide created successfully', id: result.insertId });
    });
});

app.put('/api/guides/:id', authenticateToken, isAdmin, (req, res) => {
    const { guide_name, languages, contact_number, experience_years, daily_rate_lkr } = req.body;
    const sql = "UPDATE tour_guides SET guide_name=?, languages=?, contact_number=?, experience_years=?, daily_rate_lkr=? WHERE guide_id=?";
    db.query(sql, [guide_name, languages, contact_number, experience_years, daily_rate_lkr, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Guide updated successfully' });
    });
});

app.delete('/api/guides/:id', authenticateToken, isAdmin, (req, res) => {
    const sql = "DELETE FROM tour_guides WHERE guide_id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Guide deleted successfully' });
    });
});

// Admin Dynamic Price & Seasonal Rate Update Endpoint
app.put('/api/admin/price-update', authenticateToken, isAdmin, (req, res) => {
    const { table, id, priceField, idField, newPrice } = req.body;
    const allowedTables = ['hotels', 'tour_guides', 'transportation', 'tourist_places'];
    if (!allowedTables.includes(table)) {
        return res.status(400).json({ message: 'Invalid entity table' });
    }
    const sql = `UPDATE ${table} SET ${priceField} = ? WHERE ${idField} = ?`;
    db.query(sql, [newPrice, id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: `Price updated successfully to ${newPrice}` });
    });
});

// User Management (Admin Level)
app.get('/api/admin/users', authenticateToken, isAdmin, (req, res) => {
    const sql = "SELECT id, first_name, last_name, email, role, created_at FROM users ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

app.put('/api/admin/users/:id/role', authenticateToken, isAdmin, (req, res) => {
    const { role } = req.body;
    const sql = "UPDATE users SET role = ? WHERE id = ?";
    db.query(sql, [role, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'User role updated successfully' });
    });
});

app.delete('/api/admin/users/:id', authenticateToken, isAdmin, (req, res) => {
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'User deleted successfully' });
    });
});

app.put('/api/users/:id', authenticateToken, async (req, res) => {
    // Ensure user can only update their own profile unless admin
    if (req.user.id != req.params.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    const { first_name, last_name, dob, country, email, phone, password } = req.body;
    let sql = "UPDATE users SET first_name=?, last_name=?, dob=?, country=?, email=?, phone=?";
    const params = [first_name, last_name, dob, country, email, phone];

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        sql += ", password=?";
        params.push(hashedPassword);
    }

    sql += " WHERE id=?";
    params.push(req.params.id);

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Profile updated successfully' });
    });
});

app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const sql = "SELECT password FROM users WHERE id = ?";
    db.query(sql, [req.user.id], async (err, results) => {
        if (err || results.length === 0) return res.status(500).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, results[0].password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        db.query("UPDATE users SET password = ? WHERE id = ?", [hashedNewPassword, req.user.id], (updateErr) => {
            if (updateErr) return res.status(500).json({ message: 'Update failed' });
            res.json({ message: 'Password changed successfully' });
        });
    });
});

// Booking Management
app.post('/api/bookings/create', authenticateToken, (req, res) => {
    const { user_id, item_type, item_name, item_id, price, status, payment_status, payment_method, payment_date, transaction_id } = req.body;

    const sql = `INSERT INTO bookings 
        (user_id, item_type, item_name, item_id, price, status, payment_status, payment_method, payment_date, transaction_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
        user_id,
        item_type,
        item_name,
        item_id,
        price,
        status || 'upcoming',
        payment_status || 'pending',
        payment_method || null,
        payment_date || null,
        transaction_id || null
    ], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({
            message: 'Booking created successfully',
            booking_id: result.insertId
        });
    });
});

app.get('/api/bookings/my', authenticateToken, (req, res) => {
    const sql = `SELECT 
        id as booking_id, 
        item_type, 
        item_name, 
        price as total_price, 
        status, 
        booking_date,
        payment_status,
        payment_method,
        payment_date,
        transaction_id
        FROM bookings 
        WHERE user_id = ? 
        ORDER BY booking_date DESC`;

    db.query(sql, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

app.post('/api/bookings/:id/cancel', authenticateToken, (req, res) => {
    const sql = "UPDATE bookings SET status = 'cancelled' WHERE id = ? AND user_id = ?";
    db.query(sql, [req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found or unauthorized' });
        }
        res.json({ message: 'Booking cancelled successfully' });
    });
});


// Global error handler
app.use((err, req, res, next) => {
    console.error('UNHANDLED SERVER ERROR:', err);
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});


const PORT = process.env.PORT || 5001;

if (require.main === module) {
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        pool.getConnection((err, conn) => {
            if (err) {
                console.error('CRITICAL: Database pool connection failed:', err);
            } else {
                console.log('Database pool is ready and connected.');
                conn.release();
            }
        });
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`CRITICAL: Port ${PORT} is already in use.`);
        } else {
            console.error('CRITICAL: Server error:', err);
        }
        process.exit(1);
    });
}

module.exports = app;
