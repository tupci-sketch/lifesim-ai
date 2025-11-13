// Activities Management
class Activities {
  constructor(gameState) {
    this.gameState = gameState;
  }

  getActionInfo(actionName) {
    const actionInfoMap = {
      'Study Harder': {
        description: 'Focus on your studies and improve your intelligence. This will help you get better grades but might stress you out.',
        statChanges: { smarts: 5, happiness: -3 },
        requirements: 'Must be in school'
      },
      'Join Club': {
        description: 'Join an extracurricular club to meet new people and have fun!',
        statChanges: { happiness: 10 },
        requirements: 'Must be in school'
      },
      'Ask Someone Out': {
        description: 'Take a chance and ask someone out on a date. They might say yes!',
        statChanges: { happiness: 15 },
        requirements: 'Must be teenager or older'
      },
      'Skip Class': {
        description: 'Skip class and have some fun, but you might get caught!',
        statChanges: { happiness: 7, smarts: -2 },
        requirements: 'Must be in school'
      },
      'Find Job': {
        description: 'Look for employment opportunities based on your education level.',
        statChanges: { happiness: 15 },
        requirements: 'Must be 18 or older'
      },
      'Work Hard': {
        description: 'Put in extra effort at your job. You might get a bonus!',
        statChanges: { happiness: 0 },
        requirements: 'Must have a job'
      },
      'Request Promotion': {
        description: 'Ask your boss for a promotion and salary increase.',
        statChanges: { happiness: 10 },
        requirements: 'Must have worked for at least 1 year'
      },
      'Resign': {
        description: 'Quit your current job.',
        statChanges: {},
        requirements: 'Must have a job'
      },
      'Go to Gym': {
        description: 'Work out and improve your physical fitness and appearance.',
        statChanges: { health: 3, looks: 2 },
        requirements: 'None'
      },
      'Meditate': {
        description: 'Practice mindfulness and reduce stress through meditation.',
        statChanges: { happiness: 7, health: 2 },
        requirements: 'None'
      },
      'Visit Library': {
        description: 'Read books and expand your knowledge.',
        statChanges: { smarts: 4 },
        requirements: 'None'
      },
      'Take a Walk': {
        description: 'Go for a walk to clear your mind and get some exercise.',
        statChanges: { health: 2, happiness: 3 },
        requirements: 'None'
      },
      'Go on Date': {
        description: 'Spend some money on a romantic date.',
        statChanges: { happiness: 15 },
        requirements: 'Must have money'
      },
      'Find Hookup': {
        description: 'Try to find a casual encounter. Be careful!',
        statChanges: { happiness: 10 },
        requirements: 'Must be 18 or older'
      },
      'Make Love': {
        description: 'Be intimate with your spouse. Might result in pregnancy!',
        statChanges: { happiness: 10 },
        requirements: 'Must be married'
      },
      'Break Up': {
        description: 'End your current relationship.',
        statChanges: { happiness: -20 },
        requirements: 'Must be in a relationship'
      },
      'Propose': {
        description: 'Ask your partner to marry you!',
        statChanges: { happiness: 30 },
        requirements: 'Must be dating with high relationship'
      },
      'Shoplift': {
        description: 'Attempt to steal from a store. High risk of getting caught!',
        statChanges: { happiness: 5 },
        requirements: 'None'
      },
      'Rob Bank': {
        description: 'Attempt a bank robbery. Very high risk, very high reward!',
        statChanges: { happiness: 20 },
        requirements: 'Must be 18 or older'
      },
      'Commit Fraud': {
        description: 'Try to scam people out of money.',
        statChanges: {},
        requirements: 'None'
      },
      'Hack Computer': {
        description: 'Use your tech skills to hack for money.',
        statChanges: {},
        requirements: 'High smarts required'
      },
      'Buy Property': {
        description: 'Purchase real estate to build wealth.',
        statChanges: { happiness: 15 },
        requirements: 'Must have sufficient money'
      },
      'Buy Vehicle': {
        description: 'Buy a car or other vehicle.',
        statChanges: { happiness: 10 },
        requirements: 'Must have sufficient money'
      },
      'Buy Pet': {
        description: 'Adopt a pet companion!',
        statChanges: { happiness: 15 },
        requirements: 'Must have sufficient money'
      },
      'Start Social Media': {
        description: 'Create a social media account to build your following.',
        statChanges: {},
        requirements: 'Must be teenager or older'
      },
      'Post Content': {
        description: 'Post content to grow your follower count. Might go viral!',
        statChanges: { happiness: 5 },
        requirements: 'Must have social media account'
      },
      'Apply to College': {
        description: 'Apply for admission to a college. Your smarts will affect acceptance.',
        statChanges: { happiness: 20 },
        requirements: 'Must be 18+ and not enrolled'
      },
      'Apply to University': {
        description: 'Apply for admission to a university. Higher education requirements.',
        statChanges: { happiness: 25 },
        requirements: 'Must be 18+ and not enrolled'
      }
    };
    
    return actionInfoMap[actionName] || {
      description: 'Perform this action to see what happens!',
      statChanges: {},
      requirements: 'None'
    };
  }

  getAvailableActivities() {
    const char = this.gameState.character;
    const age = char.age;
    const activities = [];

    // School activities (ages 5-17)
    if (age >= 5 && age < 18) {
      activities.push({
        category: 'School',
        actions: [
          { name: 'Study Harder', action: () => this.studyHarder() },
          { name: 'Join Club', action: () => this.joinClub() },
          { name: 'Ask Someone Out', action: () => this.askOut() },
          { name: 'Skip Class', action: () => this.skipClass() }
        ]
      });
    }

    // Education (ages 18+)
    if (age >= 18 && age < 23 && !char.college) {
      activities.push({
        category: 'Education',
        actions: [
          { name: 'Apply to College', action: () => this.applyToCollege() },
          { name: 'Apply to University', action: () => this.applyToUniversity() }
        ]
      });
    }

    // Work/Career (ages 18+)
    if (age >= 18) {
      activities.push({
        category: 'Work',
        actions: [
          { name: 'Find Job', action: () => this.findJob() },
          char.job ? { name: 'Work Hard', action: () => this.workHard() } : null,
          char.job ? { name: 'Request Promotion', action: () => this.requestPromotion() } : null,
          char.job ? { name: 'Resign', action: () => this.resign() } : null
        ].filter(a => a)
      });
    }

    // Mind & Body
    activities.push({
      category: 'Mind & Body',
      actions: [
        { name: 'Go to Gym', action: () => this.gym() },
        { name: 'Meditate', action: () => this.meditate() },
        { name: 'Visit Library', action: () => this.library() },
        { name: 'Take a Walk', action: () => this.walk() }
      ]
    });

    // Love (ages 13+)
    if (age >= 13) {
      activities.push({
        category: 'Love',
        actions: [
          { name: 'Go on Date', action: () => this.goOnDate() },
          { name: 'Find Hookup', action: () => this.hookup() },
          this.hasSpouse() ? { name: 'Make Love', action: () => this.makeLove() } : null,
          this.hasPartner() ? { name: 'Break Up', action: () => this.breakUp() } : null,
          this.hasPartner() && !this.hasSpouse() ? { name: 'Propose', action: () => this.propose() } : null
        ].filter(a => a)
      });
    }

    // Crime (ages 13+)
    if (age >= 13) {
      activities.push({
        category: 'Crime',
        actions: [
          { name: 'Shoplift', action: () => this.shoplift() },
          { name: 'Rob Bank', action: () => this.robBank() },
          { name: 'Commit Fraud', action: () => this.fraud() },
          age >= 18 ? { name: 'Hack Computer', action: () => this.hack() } : null
        ].filter(a => a)
      });
    }

    // Shopping (ages 18+)
    if (age >= 18 && char.money > 10000) {
      activities.push({
        category: 'Shopping',
        actions: [
          { name: 'Buy Property', action: () => this.buyProperty() },
          { name: 'Buy Vehicle', action: () => this.buyVehicle() },
          { name: 'Buy Pet', action: () => this.buyPet() }
        ]
      });
    }

    // Social Media (ages 13+)
    if (age >= 13) {
      activities.push({
        category: 'Social Media',
        actions: [
          !char.socialMedia.platform ? { name: 'Start Social Media', action: () => this.startSocialMedia() } : null,
          char.socialMedia.platform ? { name: 'Post Content', action: () => this.postContent() } : null
        ].filter(a => a)
      });
    }

    return activities;
  }

  // School Activities
  studyHarder() {
    this.gameState.modifyAttribute('smarts', this.gameState.random(3, 8));
    this.gameState.modifyAttribute('happiness', this.gameState.random(-5, 0));
    this.gameState.addEvent('📚 You studied hard and improved your intelligence!');
  }

  joinClub() {
    const clubs = ['Drama Club', 'Chess Club', 'Sports Team', 'Debate Team', 'Art Club'];
    const club = clubs[Math.floor(Math.random() * clubs.length)];
    this.gameState.modifyAttribute('happiness', this.gameState.random(5, 15));
    this.gameState.addEvent(`🎭 You joined the ${club}!`);
  }

  askOut() {
    const success = Math.random() > 0.4;
    if (success) {
      const name = this.gameState.getRandomName(this.gameState.character.gender === 'Male' ? 'Female' : 'Male');
      this.gameState.character.relationships.push({
        name: name,
        type: 'Dating',
        relationshipLevel: this.gameState.random(60, 80),
        age: this.gameState.character.age + this.gameState.random(-2, 2)
      });
      this.gameState.modifyAttribute('happiness', 20);
      this.gameState.addEvent(`❤️ ${name} said yes! You're now dating!`);
    } else {
      this.gameState.modifyAttribute('happiness', -10);
      this.gameState.addEvent('💔 You were rejected.');
    }
  }

  skipClass() {
    this.gameState.modifyAttribute('happiness', this.gameState.random(5, 10));
    this.gameState.modifyAttribute('smarts', this.gameState.random(-3, 0));
    if (Math.random() > 0.6) {
      this.gameState.addEvent('🚨 You got caught skipping class and got detention!');
      this.gameState.modifyAttribute('happiness', -15);
    } else {
      this.gameState.addEvent('😎 You skipped class and had fun!');
    }
  }

  // Work Activities
  findJob() {
    const char = this.gameState.character;
    let availableJobs = [];

    // Determine available jobs based on education
    availableJobs = [...GAME_DATA.careers.no_education];
    
    if (char.education.includes('High School')) {
      availableJobs = [...availableJobs, ...GAME_DATA.careers.high_school];
    }
    if (char.education.includes('College') || char.education.includes('University') || char.education === 'Graduate') {
      availableJobs = [...availableJobs, ...GAME_DATA.careers.high_school, ...GAME_DATA.careers.college];
    }
    
    // Add specialized careers if qualifications met
    if (char.attributes.smarts > 70 || char.education.includes('College')) {
      availableJobs = [...availableJobs, ...GAME_DATA.careers.specialized];
    }

    const job = availableJobs[Math.floor(Math.random() * availableJobs.length)];
    const salary = this.gameState.random(job.salary[0], job.salary[1]);
    
    char.job = {
      title: job.name,
      salary: salary,
      stress: job.stress,
      yearsExperience: 0
    };

    this.gameState.addEvent(`💼 You got a job as a ${job.name} earning $${salary.toLocaleString()}/year!`);
    this.gameState.modifyAttribute('happiness', 15);
  }

  workHard() {
    this.gameState.modifyAttribute('happiness', this.gameState.random(-5, 5));
    this.gameState.character.job.yearsExperience += 1;
    
    if (Math.random() > 0.7) {
      const bonus = this.gameState.random(1000, 5000);
      this.gameState.character.money += bonus;
      this.gameState.addEvent(`💰 You received a bonus of $${bonus.toLocaleString()}!`);
    } else {
      this.gameState.addEvent('💪 You worked hard at your job.');
    }
  }

  requestPromotion() {
    const char = this.gameState.character;
    if (Math.random() > 0.5 && char.job.yearsExperience >= 1) {
      const raise = this.gameState.random(5000, 20000);
      char.job.salary += raise;
      this.gameState.addEvent(`🎉 Promotion! Your salary increased by $${raise.toLocaleString()}!`);
      this.gameState.modifyAttribute('happiness', 20);
    } else {
      this.gameState.addEvent('😔 Your promotion request was denied.');
      this.gameState.modifyAttribute('happiness', -10);
    }
  }

  resign() {
    this.gameState.addEvent(`👋 You resigned from your job as ${this.gameState.character.job.title}.`);
    this.gameState.character.job = null;
  }

  // Mind & Body
  gym() {
    this.gameState.modifyAttribute('health', this.gameState.random(2, 5));
    this.gameState.modifyAttribute('looks', this.gameState.random(1, 3));
    this.gameState.addEvent('💪 You worked out at the gym!');
  }

  meditate() {
    this.gameState.modifyAttribute('happiness', this.gameState.random(5, 10));
    this.gameState.modifyAttribute('health', this.gameState.random(1, 3));
    this.gameState.addEvent('🧘 You meditated and feel peaceful.');
  }

  library() {
    this.gameState.modifyAttribute('smarts', this.gameState.random(2, 6));
    this.gameState.addEvent('📖 You read books at the library.');
  }

  walk() {
    this.gameState.modifyAttribute('health', this.gameState.random(1, 3));
    this.gameState.modifyAttribute('happiness', this.gameState.random(2, 5));
    this.gameState.addEvent('🚶 You took a nice walk.');
  }

  // Love Activities
  goOnDate() {
    const cost = this.gameState.random(50, 200);
    if (this.gameState.character.money >= cost) {
      this.gameState.character.money -= cost;
      this.gameState.modifyAttribute('happiness', this.gameState.random(10, 20));
      this.gameState.addEvent(`💑 You went on a date and spent $${cost}.`);
    } else {
      this.gameState.addEvent('💸 You don\'t have enough money for a date.');
    }
  }

  hookup() {
    const success = Math.random() > 0.5;
    if (success) {
      this.gameState.modifyAttribute('happiness', this.gameState.random(10, 15));
      this.gameState.addEvent('😏 You had a successful hookup!');
      
      // Small chance of STD
      if (Math.random() > 0.9) {
        const std = GAME_DATA.diseases.std[Math.floor(Math.random() * GAME_DATA.diseases.std.length)];
        this.gameState.character.healthStatus.diseases.push(std);
        this.gameState.modifyAttribute('health', -10);
        this.gameState.addEvent(`⚠️ You contracted ${std}!`);
      }
    } else {
      this.gameState.addEvent('😔 Your hookup attempt failed.');
    }
  }

  makeLove() {
    this.gameState.modifyAttribute('happiness', this.gameState.random(5, 15));
    const spouse = this.gameState.character.relationships.find(r => r.type === 'Spouse');
    if (spouse) {
      spouse.relationshipLevel = Math.min(100, spouse.relationshipLevel + this.gameState.random(2, 5));
    }
    this.gameState.addEvent('❤️ You made love to your spouse.');
    
    // Chance of pregnancy
    if (Math.random() > 0.85 && this.gameState.character.age < 45) {
      this.addChild();
    }
  }

  addChild() {
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const name = this.gameState.getRandomName(gender);
    this.gameState.character.relationships.push({
      name: name,
      type: 'Child',
      relationshipLevel: this.gameState.random(80, 100),
      age: 0
    });
    this.gameState.addEvent(`👶 You had a baby ${gender.toLowerCase()} named ${name}!`);
    this.gameState.modifyAttribute('happiness', 25);
  }

  breakUp() {
    const partner = this.gameState.character.relationships.find(r => r.type === 'Dating' || r.type === 'Spouse');
    if (partner) {
      this.gameState.character.relationships = this.gameState.character.relationships.filter(r => r !== partner);
      this.gameState.addEvent(`💔 You broke up with ${partner.name}.`);
      this.gameState.modifyAttribute('happiness', -20);
    }
  }

  propose() {
    const partner = this.gameState.character.relationships.find(r => r.type === 'Dating');
    if (partner && partner.relationshipLevel > 70) {
      partner.type = 'Spouse';
      this.gameState.addEvent(`💍 You married ${partner.name}!`);
      this.gameState.modifyAttribute('happiness', 30);
    } else if (partner) {
      this.gameState.addEvent(`😢 ${partner.name} rejected your proposal.`);
      this.gameState.modifyAttribute('happiness', -25);
    }
  }

  // Crime Activities
  shoplift() {
    if (Math.random() > 0.6) {
      const stolen = this.gameState.random(100, 500);
      this.gameState.character.money += stolen;
      this.gameState.addEvent(`🛒 You shoplifted items worth $${stolen}!`);
      this.gameState.modifyAttribute('happiness', 5);
    } else {
      this.gameState.character.criminalRecord.push('Shoplifting');
      this.gameState.addEvent('🚨 You got caught shoplifting!');
      this.gameState.modifyAttribute('happiness', -15);
      const fine = this.gameState.random(500, 2000);
      this.gameState.character.money -= fine;
    }
  }

  robBank() {
    if (Math.random() > 0.8) {
      const stolen = this.gameState.random(50000, 200000);
      this.gameState.character.money += stolen;
      this.gameState.addEvent(`💰 You successfully robbed a bank and got $${stolen.toLocaleString()}!`);
      this.gameState.modifyAttribute('happiness', 20);
    } else {
      this.gameState.character.criminalRecord.push('Bank Robbery');
      this.gameState.character.inPrison = true;
      this.gameState.character.prisonYears = this.gameState.random(10, 25);
      this.gameState.addEvent(`⚖️ You got caught and sentenced to ${this.gameState.character.prisonYears} years in prison!`);
      this.gameState.modifyAttribute('happiness', -40);
    }
  }

  fraud() {
    if (Math.random() > 0.7) {
      const money = this.gameState.random(10000, 50000);
      this.gameState.character.money += money;
      this.gameState.addEvent(`💳 Your fraud scheme worked! You gained $${money.toLocaleString()}.`);
    } else {
      this.gameState.character.criminalRecord.push('Fraud');
      this.gameState.addEvent('🚨 Your fraud was discovered!');
      this.gameState.modifyAttribute('happiness', -20);
    }
  }

  hack() {
    if (this.gameState.character.attributes.smarts > 60 && Math.random() > 0.65) {
      const money = this.gameState.random(20000, 100000);
      this.gameState.character.money += money;
      this.gameState.addEvent(`💻 You successfully hacked and earned $${money.toLocaleString()}!`);
    } else {
      this.gameState.addEvent('⚠️ Your hacking attempt failed.');
      if (Math.random() > 0.7) {
        this.gameState.character.criminalRecord.push('Hacking');
        this.gameState.addEvent('🚨 You were caught by authorities!');
      }
    }
  }

  // Shopping
  buyProperty() {
    const properties = GAME_DATA.properties;
    const property = properties[Math.floor(Math.random() * properties.length)];
    const cost = this.gameState.random(property.cost[0], property.cost[1]);
    
    if (this.gameState.character.money >= cost) {
      this.gameState.character.money -= cost;
      this.gameState.character.netWorth += cost;
      this.gameState.character.properties.push({
        type: property.type,
        value: cost,
        purchasePrice: cost
      });
      this.gameState.addEvent(`🏠 You bought a ${property.type} for $${cost.toLocaleString()}!`);
      this.gameState.modifyAttribute('happiness', 15);
    } else {
      this.gameState.addEvent('💸 You don\'t have enough money for this property.');
    }
  }

  buyVehicle() {
    const vehicles = GAME_DATA.vehicles;
    const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
    const cost = this.gameState.random(vehicle.cost[0], vehicle.cost[1]);
    
    if (this.gameState.character.money >= cost) {
      this.gameState.character.money -= cost;
      this.gameState.character.vehicles.push({
        type: vehicle.type,
        value: cost
      });
      this.gameState.addEvent(`🚗 You bought a ${vehicle.type} for $${cost.toLocaleString()}!`);
      this.gameState.modifyAttribute('happiness', 10);
    } else {
      this.gameState.addEvent('💸 You don\'t have enough money for this vehicle.');
    }
  }

  buyPet() {
    const allPets = [...GAME_DATA.pets.regular, ...GAME_DATA.pets.exotic];
    const petType = allPets[Math.floor(Math.random() * allPets.length)];
    const cost = this.gameState.random(petType.cost[0], petType.cost[1]);
    
    if (this.gameState.character.money >= cost) {
      this.gameState.character.money -= cost;
      this.gameState.character.pets.push({
        name: this.generatePetName(),
        type: petType.name,
        age: 0,
        maintenance: petType.maintenance
      });
      this.gameState.addEvent(`🐾 You bought a ${petType.name} for $${cost.toLocaleString()}!`);
      this.gameState.modifyAttribute('happiness', 15);
    } else {
      this.gameState.addEvent('💸 You don\'t have enough money for this pet.');
    }
  }

  generatePetName() {
    const names = ['Max', 'Bella', 'Charlie', 'Lucy', 'Cooper', 'Luna', 'Rocky', 'Daisy', 'Buddy', 'Molly'];
    return names[Math.floor(Math.random() * names.length)];
  }

  // Social Media
  startSocialMedia() {
    const platforms = GAME_DATA.socialMediaPlatforms;
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    this.gameState.character.socialMedia.platform = platform.name;
    this.gameState.character.socialMedia.followers = this.gameState.random(10, 100);
    this.gameState.addEvent(`📱 You started a ${platform.name} account!`);
  }

  postContent() {
    const platform = GAME_DATA.socialMediaPlatforms.find(p => p.name === this.gameState.character.socialMedia.platform);
    if (platform) {
      const growth = this.gameState.random(platform.followerGrowth[0], platform.followerGrowth[1]);
      this.gameState.character.socialMedia.followers += growth;
      
      // Viral chance
      if (Math.random() > 0.95) {
        const viralGrowth = this.gameState.random(10000, 50000);
        this.gameState.character.socialMedia.followers += viralGrowth;
        this.gameState.character.fame += this.gameState.random(10, 25);
        this.gameState.addEvent(`🔥 Your post went viral! You gained ${viralGrowth.toLocaleString()} followers!`);
      } else {
        this.gameState.addEvent(`📱 You posted content and gained ${growth.toLocaleString()} followers.`);
      }
      
      this.gameState.modifyAttribute('happiness', 5);
    }
  }

  hasPartner() {
    return this.gameState.character.relationships.some(r => r.type === 'Dating' || r.type === 'Spouse');
  }

  hasSpouse() {
    return this.gameState.character.relationships.some(r => r.type === 'Spouse');
  }

  // Education
  applyToCollege() {
    const char = this.gameState.character;
    const acceptance = char.attributes.smarts > 50 ? Math.random() > 0.3 : Math.random() > 0.6;
    
    if (acceptance) {
      const majors = ['Business', 'Computer Science', 'Engineering', 'Psychology', 'Biology', 'English', 'History', 'Art', 'Music', 'Mathematics'];
      const major = majors[Math.floor(Math.random() * majors.length)];
      
      char.college = 'College';
      char.major = major;
      char.education = 'College Student';
      this.gameState.addEvent(`🎓 You were accepted to college! Major: ${major}`);
      this.gameState.modifyAttribute('happiness', 20);
    } else {
      this.gameState.addEvent('❌ Your college application was rejected.');
      this.gameState.modifyAttribute('happiness', -15);
    }
  }

  applyToUniversity() {
    const char = this.gameState.character;
    const acceptance = char.attributes.smarts > 60 ? Math.random() > 0.2 : Math.random() > 0.5;
    
    if (acceptance) {
      const majors = ['Medicine', 'Law', 'Engineering', 'Computer Science', 'Business Administration', 'Architecture'];
      const major = majors[Math.floor(Math.random() * majors.length)];
      
      char.college = 'University';
      char.major = major;
      char.education = 'University Student';
      this.gameState.addEvent(`🎓 You were accepted to university! Major: ${major}`);
      this.gameState.modifyAttribute('happiness', 25);
    } else {
      this.gameState.addEvent('❌ Your university application was rejected.');
      this.gameState.modifyAttribute('happiness', -20);
    }
  }
}