// Game Data
const GAME_DATA = {
  careers: {
    no_education: [
      { name: 'Janitor', salary: [20000, 35000], education: 'None', stress: 30 },
      { name: 'Cashier', salary: [18000, 28000], education: 'None', stress: 40 },
      { name: 'Bouncer', salary: [25000, 40000], education: 'None', stress: 50 },
      { name: 'Bus Driver', salary: [30000, 45000], education: 'None', stress: 45 },
      { name: 'Bartender', salary: [22000, 38000], education: 'None', stress: 50 },
      { name: 'Waiter', salary: [18000, 32000], education: 'None', stress: 55 },
      { name: 'Dishwasher', salary: [18000, 25000], education: 'None', stress: 30 },
      { name: 'Laborer', salary: [28000, 42000], education: 'None', stress: 60 },
      { name: 'Security Guard', salary: [28000, 48000], education: 'None', stress: 45 }
    ],
    high_school: [
      { name: 'Police Officer', salary: [45000, 80000], education: 'High School', stress: 70 },
      { name: 'Firefighter', salary: [42000, 75000], education: 'High School', stress: 75 },
      { name: 'Real Estate Agent', salary: [35000, 120000], education: 'High School', stress: 60 },
      { name: 'Truck Driver', salary: [38000, 65000], education: 'High School', stress: 50 },
      { name: 'Electrician', salary: [45000, 85000], education: 'High School', stress: 55 },
      { name: 'Plumber', salary: [42000, 80000], education: 'High School', stress: 50 },
      { name: 'Carpenter', salary: [38000, 70000], education: 'High School', stress: 50 },
      { name: 'Photographer', salary: [30000, 90000], education: 'High School', stress: 40 }
    ],
    college: [
      { name: 'Doctor', salary: [180000, 350000], education: 'Medical School', stress: 85 },
      { name: 'Lawyer', salary: [80000, 250000], education: 'Law School', stress: 80 },
      { name: 'Engineer', salary: [70000, 150000], education: 'College', stress: 65 },
      { name: 'Scientist', salary: [65000, 140000], education: 'College', stress: 60 },
      { name: 'Accountant', salary: [50000, 100000], education: 'College', stress: 55 },
      { name: 'Banker', salary: [60000, 180000], education: 'College', stress: 70 },
      { name: 'Teacher', salary: [40000, 70000], education: 'College', stress: 65 },
      { name: 'Architect', salary: [60000, 130000], education: 'College', stress: 60 },
      { name: 'Nurse', salary: [50000, 90000], education: 'College', stress: 70 },
      { name: 'Therapist', salary: [55000, 110000], education: 'College', stress: 60 },
      { name: 'Journalist', salary: [40000, 95000], education: 'College', stress: 65 }
    ],
    specialized: [
      { name: 'Actor', salary: [25000, 500000], education: 'Varies', stress: 75, fame: true },
      { name: 'Musician', salary: [20000, 400000], education: 'Varies', stress: 70, fame: true },
      { name: 'Athlete', salary: [50000, 800000], education: 'Varies', stress: 80, fame: true },
      { name: 'Model', salary: [30000, 350000], education: 'None', stress: 65, fame: true },
      { name: 'CEO', salary: [200000, 1000000], education: 'MBA', stress: 95 },
      { name: 'Judge', salary: [120000, 200000], education: 'Law School', stress: 75 },
      { name: 'Professor', salary: [60000, 120000], education: 'PhD', stress: 55 },
      { name: 'Writer', salary: [25000, 200000], education: 'Varies', stress: 50 },
      { name: 'Game Developer', salary: [60000, 150000], education: 'College', stress: 65 }
    ],
    crime: [
      { name: 'Drug Dealer', salary: [30000, 200000], education: 'None', stress: 90, illegal: true },
      { name: 'Hacker', salary: [40000, 300000], education: 'Self-taught', stress: 70, illegal: true },
      { name: 'Thief', salary: [20000, 150000], education: 'None', stress: 85, illegal: true },
      { name: 'Mob Member', salary: [50000, 400000], education: 'None', stress: 95, illegal: true },
      { name: 'Con Artist', salary: [30000, 250000], education: 'None', stress: 75, illegal: true }
    ]
  },
  
  diseases: {
    common: ['Cold', 'Flu', 'Fever', 'Headache'],
    serious: ['COVID-19', 'Pneumonia', 'Heart Disease', 'Diabetes'],
    std: ['Chlamydia', 'Gonorrhea', 'Syphilis', 'HIV', 'Herpes'],
    rare: ['Rabies', 'Bubonic Plague', 'Botulism']
  },
  
  pets: {
    regular: [
      { name: 'Dog', cost: [500, 2000], maintenance: 100 },
      { name: 'Cat', cost: [300, 1500], maintenance: 80 },
      { name: 'Bird', cost: [50, 500], maintenance: 40 },
      { name: 'Fish', cost: [10, 200], maintenance: 20 },
      { name: 'Hamster', cost: [20, 100], maintenance: 30 }
    ],
    exotic: [
      { name: 'Lion', cost: [50000, 150000], maintenance: 5000 },
      { name: 'Tiger', cost: [60000, 180000], maintenance: 5500 },
      { name: 'Monkey', cost: [5000, 20000], maintenance: 800 },
      { name: 'Gorilla', cost: [100000, 300000], maintenance: 8000 },
      { name: 'Snake', cost: [200, 5000], maintenance: 200 },
      { name: 'Coyote', cost: [3000, 10000], maintenance: 500 },
      { name: 'Mountain Lion', cost: [40000, 120000], maintenance: 4500 },
      { name: 'Jaguar', cost: [70000, 200000], maintenance: 6000 },
      { name: 'Leopard', cost: [65000, 190000], maintenance: 5800 },
      { name: 'Bear', cost: [80000, 250000], maintenance: 7000 }
    ]
  },
  
  countries: ['USA', 'Canada', 'UK', 'Germany', 'France', 'Japan', 'Australia', 'Brazil', 'Mexico', 'India', 'Russia', 'China', 'South Korea', 'Italy', 'Spain'],
  
  randomEvents: [
    { text: 'You won $50,000 in the lottery!', money: 50000, happiness: 20 },
    { text: 'You were in a car accident', health: -30, happiness: -15 },
    { text: 'You inherited money from a relative', money: 75000, happiness: 10 },
    { text: 'You were offered a promotion', happiness: 15 },
    { text: 'You met a celebrity', happiness: 25, fame: 5 },
    { text: 'You were robbed', money: -5000, happiness: -20 },
    { text: 'You found $10,000 on the street', money: 10000, happiness: 15 },
    { text: 'Your house caught fire', money: -50000, happiness: -30, health: -10 },
    { text: 'You won an award at work', happiness: 20, fame: 3 },
    { text: 'You got a surprise bonus', money: 10000, happiness: 15 },
    { text: 'You discovered a hidden talent', smarts: 5, happiness: 10 },
    { text: 'You made a new best friend', happiness: 15 }
  ],
  
  socialMediaPlatforms: [
    { name: 'TikTok', followerGrowth: [100, 5000] },
    { name: 'Instagram', followerGrowth: [80, 4000] },
    { name: 'YouTube', followerGrowth: [50, 3000] },
    { name: 'Twitter', followerGrowth: [60, 2500] },
    { name: 'Twitch', followerGrowth: [40, 2000] },
    { name: 'OnlyFans', followerGrowth: [30, 1500] }
  ],
  
  challenges: [
    'Gold Digger Challenge',
    'Vampire Challenge',
    'Tiger King Challenge',
    'Shawshank Challenge',
    'Monopoly Challenge',
    'Mean Girls Challenge',
    'Ferris Bueller Challenge',
    'Joker Challenge',
    'Gatsby Challenge',
    'Martyr Challenge'
  ],
  
  properties: [
    { type: 'Apartment', cost: [100000, 300000] },
    { type: 'House', cost: [250000, 600000] },
    { type: 'Condo', cost: [200000, 500000] },
    { type: 'Mansion', cost: [1000000, 5000000] },
    { type: 'Estate', cost: [3000000, 15000000] },
    { type: 'Ranch', cost: [500000, 2000000] }
  ],
  
  vehicles: [
    { type: 'Used Car', cost: [5000, 15000] },
    { type: 'New Car', cost: [20000, 50000] },
    { type: 'Luxury Car', cost: [60000, 150000] },
    { type: 'Sports Car', cost: [80000, 300000] },
    { type: 'Supercar', cost: [200000, 1000000] },
    { type: 'Motorcycle', cost: [8000, 40000] },
    { type: 'Truck', cost: [30000, 70000] }
  ]
};