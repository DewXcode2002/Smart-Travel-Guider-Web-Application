// Itinerary Generator Utility
// Generates personalized day-by-day itineraries based on user preferences

const sriLankaActivities = {
    sightseeing: [
        {
            name: 'Temple of the Tooth',
            location: 'Kandy',
            duration: '2-3 hours',
            cost: 10,
            description: 'Sri Dalada Maligawa is a Buddhist temple in the city of Kandy, Sri Lanka.',
            type: 'cultural',
            image: '/images/destinations/temple-of-tooth.jpg',
            timeOfDay: 'morning'
        },
        {
            name: 'Sigiriya Rock Fortress',
            location: 'Sigiriya',
            duration: '3-4 hours',
            cost: 30,
            description: 'Ancient rock fortress and palace with stunning frescoes and gardens.',
            type: 'historical',
            image: '/images/destinations/sigiriya.jpg',
            timeOfDay: 'morning'
        },
        {
            name: 'Galle Fort',
            location: 'Galle',
            duration: '2-3 hours',
            cost: 0,
            description: 'Historic fort built by Portuguese and fortified by Dutch.',
            type: 'historical',
            image: 'https://images.unsplash.com/photo-1627564820849-5e263721e7d0?auto=format&fit=crop&q=80&w=1200',
            timeOfDay: 'afternoon'
        },
        {
            name: 'Kandy Lake View',
            location: 'Kandy',
            duration: '1-2 hours',
            cost: 0,
            description: 'A leisurely walk around the beautiful Kandy Lake.',
            type: 'scenic',
            image: '/images/destinations/temple-of-tooth.jpg',
            timeOfDay: 'afternoon'
        }
    ],
    adventure: [
        {
            name: 'Ella Rock Hiking',
            location: 'Ella',
            duration: '4-5 hours',
            cost: 20,
            description: 'Challenging hike with breathtaking views of tea plantations.',
            type: 'hiking',
            image: '/images/destinations/ella-rock.jpg',
            timeOfDay: 'morning'
        },
        {
            name: 'Yala Safari',
            location: 'Yala National Park',
            duration: '3-4 hours',
            cost: 50,
            description: 'Wildlife safari to spot leopards, elephants, and exotic birds.',
            type: 'wildlife',
            image: '/images/destinations/yala.jpg',
            timeOfDay: 'morning'
        },
        {
            name: 'White Water Rafting',
            location: 'Kitulgala',
            duration: '2-3 hours',
            cost: 40,
            description: 'Thrilling rafting experience on Kelani River.',
            type: 'water-sports',
            image: '/images/destinations/ella-rock.jpg',
            timeOfDay: 'afternoon'
        },
        {
            name: 'Zip Lining',
            location: 'Ella',
            duration: '2 hours',
            cost: 35,
            description: 'Soar through the air with stunning mountain views.',
            type: 'adventure',
            image: '/images/destinations/ella-rock.jpg',
            timeOfDay: 'afternoon'
        }
    ],
    relaxation: [
        {
            name: 'Mirissa Beach',
            location: 'Mirissa',
            duration: '3-4 hours',
            cost: 0,
            description: 'Pristine beach perfect for swimming and sunbathing.',
            type: 'beach',
            image: '/images/destinations/mirissa-beach.jpg',
            timeOfDay: 'afternoon'
        },
        {
            name: 'Spa & Wellness',
            location: 'Kandy',
            duration: '2 hours',
            cost: 60,
            description: 'Traditional Ayurvedic spa treatment and massage.',
            type: 'wellness',
            image: '/images/destinations/temple-of-tooth.jpg',
            timeOfDay: 'evening'
        },
        {
            name: 'Sunset at Galle Fort',
            location: 'Galle',
            duration: '1-2 hours',
            cost: 0,
            description: 'Watch the stunning sunset from the fort ramparts.',
            type: 'scenic',
            image: 'https://images.unsplash.com/photo-1627564820849-5e263721e7d0?auto=format&fit=crop&q=80&w=1200',
            timeOfDay: 'evening'
        },
        {
            name: 'Beach Yoga Session',
            location: 'Mirissa',
            duration: '1 hour',
            cost: 15,
            description: 'Morning yoga session on the beach.',
            type: 'wellness',
            image: '/images/destinations/mirissa-beach.jpg',
            timeOfDay: 'morning'
        }
    ],
    cultural: [
        {
            name: 'Traditional Show',
            location: 'Kandy',
            duration: '1-2 hours',
            cost: 20,
            description: 'Experience vibrant Kandyan dance and cultural performance.',
            type: 'cultural',
            image: '/images/destinations/temple-of-tooth.jpg',
            timeOfDay: 'evening'
        },
        {
            name: 'Local Market Tour',
            location: 'Kandy',
            duration: '2 hours',
            cost: 10,
            description: 'Explore bustling local markets and try street food.',
            type: 'cultural',
            image: '/images/destinations/temple-of-tooth.jpg',
            timeOfDay: 'morning'
        },
        {
            name: 'Tea Plantation Visit',
            location: 'Nuwara Eliya',
            duration: '3 hours',
            cost: 25,
            description: 'Tour a working tea plantation and factory.',
            type: 'cultural',
            image: '/images/destinations/ella-rock.jpg',
            timeOfDay: 'afternoon'
        },
        {
            name: 'Cooking Class',
            location: 'Kandy',
            duration: '3 hours',
            cost: 35,
            description: 'Learn to cook authentic Sri Lankan cuisine.',
            type: 'culinary',
            image: '/images/destinations/temple-of-tooth.jpg',
            timeOfDay: 'afternoon'
        }
    ]
};

const hotels = {
    budget: [
        { name: 'Clock Inn Colombo', location: 'Colombo', price: 25, rating: 4.2 },
        { name: 'Hangover Hostels Ella', location: 'Ella', price: 18, rating: 4.5 },
        { name: 'Zostel Galle', location: 'Galle', price: 22, rating: 4.3 }
    ],
    moderate: [
        { name: 'Galle Face Hotel', location: 'Colombo', price: 150, rating: 4.6 },
        { name: 'Jetwing Lighthouse', location: 'Galle', price: 180, rating: 4.7 },
        { name: 'Heritance Kandalama', location: 'Dambulla', price: 220, rating: 4.8 }
    ],
    luxury: [
        { name: 'Shangri-La Colombo', location: 'Colombo', price: 280, rating: 4.9 },
        { name: 'Amangalla', location: 'Galle', price: 350, rating: 4.9 },
        { name: 'Cape Weligama', location: 'Weligama', price: 520, rating: 4.9 }
    ]
};

export const generateItinerary = (formData) => {
    const { destination, startDate, endDate, travelers, budget, interests } = formData;

    // Calculate number of days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // Determine budget category
    const budgetPerDay = budget / days;
    let budgetCategory = 'budget';
    if (budgetPerDay > 200) budgetCategory = 'luxury';
    else if (budgetPerDay > 100) budgetCategory = 'moderate';

    // Select hotel
    const hotelOptions = hotels[budgetCategory];
    const selectedHotel = hotelOptions[Math.floor(Math.random() * hotelOptions.length)];

    // Calculate budget allocation
    const hotelCost = selectedHotel.price * days;
    const transportCost = Math.round(budget * 0.10);
    const remainingBudget = budget - hotelCost - transportCost;
    const activitiesBudget = remainingBudget;

    // Generate activities for each day
    const itinerary = [];
    const allActivities = [];

    // Collect activities based on selected interests
    interests.forEach(interest => {
        if (sriLankaActivities[interest]) {
            allActivities.push(...sriLankaActivities[interest]);
        }
    });

    // If no interests selected, use all activities
    if (allActivities.length === 0) {
        Object.values(sriLankaActivities).forEach(activities => {
            allActivities.push(...activities);
        });
    }

    // Generate day-by-day itinerary
    for (let i = 0; i < days; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);

        const dayActivities = {
            date: currentDate.toISOString().split('T')[0],
            dayNumber: i + 1,
            morning: null,
            afternoon: null,
            evening: null
        };

        // Select activities for different times of day
        const morningActivities = allActivities.filter(a => a.timeOfDay === 'morning');
        const afternoonActivities = allActivities.filter(a => a.timeOfDay === 'afternoon');
        const eveningActivities = allActivities.filter(a => a.timeOfDay === 'evening');

        if (morningActivities.length > 0) {
            dayActivities.morning = morningActivities[i % morningActivities.length];
        }

        if (afternoonActivities.length > 0) {
            dayActivities.afternoon = afternoonActivities[i % afternoonActivities.length];
        }

        if (eveningActivities.length > 0) {
            dayActivities.evening = eveningActivities[i % eveningActivities.length];
        }

        itinerary.push(dayActivities);
    }

    return {
        destination,
        startDate,
        endDate,
        days,
        travelers,
        budget,
        interests,
        hotel: selectedHotel,
        costs: {
            hotel: hotelCost,
            transport: transportCost,
            activities: activitiesBudget,
            total: budget
        },
        itinerary
    };
};

export default generateItinerary;
