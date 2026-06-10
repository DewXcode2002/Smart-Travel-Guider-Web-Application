const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'travelguider',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

async function seed() {
    try {
        console.log('Seeding Guides and Transportation...');

        // Verify connection and get districts
        const [districts] = await promisePool.query('SELECT district_id, district_name FROM districts');

        if (districts.length === 0) {
            console.log('No districts found. Please seed districts first.');
            process.exit(1);
        }

        console.log(`Found ${districts.length} districts.`);

        for (const district of districts) {
            const { district_id, district_name } = district;

            // Check if guides exist
            const [existingGuides] = await promisePool.query('SELECT guide_id FROM tour_guides WHERE district_id = ?', [district_id]);
            if (existingGuides.length === 0) {
                console.log(`Adding guides for ${district_name} (ID: ${district_id})...`);
                const guideName = `Guide for ${district_name}`;
                const dailyRate = 5000 + Math.floor(Math.random() * 5000); // 5000-10000 LKR

                await promisePool.query(`
                    INSERT INTO tour_guides (district_id, guide_name, languages, contact_number, whatsapp_number, email, experience_years, specialization, license_number, daily_rate_lkr, vehicle_available)
                    VALUES (?, ?, 'English, Sinhala', '0771234567', '0771234567', 'guide@example.com', 5, 'Culture & History', 'TG-12345', ?, TRUE)
                `, [district_id, guideName, dailyRate]);
            } else {
                console.log(`Guides already exist for ${district_name}. Skipping.`);
            }

            // Check if transport exists
            const [existingTransport] = await promisePool.query('SELECT transport_id FROM transportation WHERE district_id = ?', [district_id]);
            if (existingTransport.length === 0) {
                console.log(`Adding transportation for ${district_name} (ID: ${district_id})...`);
                const companyName = `${district_name} Travels`;
                const vehicleType = Math.random() > 0.5 ? 'Luxury Sedan' : 'Comfort Van';
                const rateRange = `${5000}-${15000}`; // LKR

                await promisePool.query(`
                    INSERT INTO transportation (district_id, service_type, company_name, contact_number, email, vehicle_types, daily_rate_range)
                    VALUES (?, 'Private Transfer', ?, '0112345678', 'transport@example.com', ?, ?)
                `, [district_id, companyName, vehicleType, rateRange]);
            } else {
                console.log(`Transportation already exists for ${district_name}. Skipping.`);
            }
        }

        console.log('Seeding completed successfully.');
        process.exit(0);

    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
