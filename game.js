// Game State Management
class GameState {
  constructor() {
    this.character = null;
    this.settings = {
      perplexityApiKey: '',
      aiEnabled: true
    };
    this.actionHistory = [];
  }

  createCharacter(name, gender, country, city, scenario) {
    this.character = {
      name: name,
      age: 0,
      gender: gender,
      country: country,
      city: city || this.getRandomCity(country),
      scenario: scenario || 'Standard',
      attributes: {
        happiness: this.random(80, 100),
        health: this.random(80, 100),
        smarts: this.random(40, 60),
        looks: this.random(40, 60)
      },
      money: this.getStartingMoney(scenario),
      netWorth: this.getStartingMoney(scenario),
      fame: 0,
      job: null,
      education: 'None',
      educationLevel: 0,
      college: null,
      major: null,
      relationships: this.createInitialRelationships(gender),
      properties: [],
      vehicles: [],
      pets: [],
      healthStatus: {
        diseases: [],
        addictions: [],
        injuries: []
      },
      socialMedia: {
        platform: null,
        followers: 0
      },
      criminalRecord: [],
      inPrison: false,
      prisonYears: 0,
      lifeStage: 'Baby'
    };
  }

  createInitialRelationships(gender) {
    const relationships = [];
    
    // Parents
    relationships.push({
      name: this.getRandomName('Female'),
      type: 'Mother',
      relationshipLevel: this.random(70, 100),
      age: this.random(25, 40)
    });
    
    relationships.push({
      name: this.getRandomName('Male'),
      type: 'Father',
      relationshipLevel: this.random(70, 100),
      age: this.random(25, 40)
    });
    
    return relationships;
  }

  getRandomCity(country) {
    const cities = {
      'USA': ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle'],
      'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
      'UK': ['London', 'Manchester', 'Birmingham', 'Edinburgh'],
      'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'],
      'France': ['Paris', 'Lyon', 'Marseille', 'Nice'],
      'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama'],
      'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth']
    };
    const cityList = cities[country] || ['Capital City', 'Main City'];
    return cityList[Math.floor(Math.random() * cityList.length)];
  }

  getRandomName(gender) {
    const maleNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Joseph', 'Charles', 'Thomas', 'Daniel'];
    const femaleNames = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'];
    const names = gender === 'Male' ? maleNames : femaleNames;
    return names[Math.floor(Math.random() * names.length)];
  }

  ageUp() {
    if (!this.character) return;
    
    // Age by 1 year
    this.character.age += 1;
    
    // Update life stage
    this.updateLifeStage();
    
    // Natural attribute changes
    this.applyNaturalChanges();
    
    // Random events
    if (Math.random() < 0.15) {
      this.triggerRandomEvent();
    }
    
    // Age relationships
    this.character.relationships.forEach(rel => {
      rel.age += 1; // 1 year
    });
    
    // Handle job salary
    if (this.character.job) {
      const annualSalary = this.character.job.salary;
      this.character.money += annualSalary;
      this.character.netWorth += annualSalary;
    }

    // Handle expenses
    const livingExpense = this.calculateLivingExpenses();
    this.character.money -= livingExpense;
    this.character.netWorth -= livingExpense;
    
    // Check death conditions
    if (this.character.health <= 0 || this.character.age >= 120) {
      this.handleDeath();
    }
  }

  updateLifeStage() {
    const age = this.character.age;
    if (age < 1) this.character.lifeStage = 'Baby';
    else if (age < 5) this.character.lifeStage = 'Toddler';
    else if (age < 13) this.character.lifeStage = 'Child';
    else if (age < 18) this.character.lifeStage = 'Teenager';
    else if (age < 31) this.character.lifeStage = 'Young Adult';
    else if (age < 61) this.character.lifeStage = 'Adult';
    else this.character.lifeStage = 'Senior';
  }

  applyNaturalChanges() {
    const age = this.character.age;
    
    // Education progression
    this.handleEducationProgression();
    
    // Health decreases with age
    if (age > 50) {
      this.modifyAttribute('health', -this.random(1, 3));
    }
    
    // Looks decrease with age
    if (age > 30) {
      this.modifyAttribute('looks', -this.random(0, 2));
    }
    
    // Random small changes
    if (Math.random() < 0.3) {
      this.modifyAttribute('happiness', this.random(-5, 5));
    }
  }

  handleEducationProgression() {
    const age = this.character.age;
    
    // Elementary (5-11)
    if (age === 5) {
      this.character.education = 'Elementary';
      this.addEvent('🏫 You started elementary school!');
    }
    
    // Middle School (12-13)
    if (age === 12) {
      this.character.education = 'Middle School';
      this.addEvent('🏫 You started middle school!');
    }
    
    // High School (14-18)
    if (age === 14) {
      this.character.education = 'High School';
      this.addEvent('🏫 You started high school!');
    }
    
    if (age === 18 && this.character.education === 'High School') {
      this.character.education = 'High School Graduate';
      this.addEvent('🎓 You graduated from high school!');
      this.modifyAttribute('smarts', this.random(5, 10));
      this.modifyAttribute('happiness', this.random(10, 20));
    }
  }

  triggerRandomEvent() {
    const event = GAME_DATA.randomEvents[Math.floor(Math.random() * GAME_DATA.randomEvents.length)];
    
    if (event.money) {
      this.character.money += event.money;
      this.character.netWorth += event.money;
    }
    if (event.health) this.modifyAttribute('health', event.health);
    if (event.happiness) this.modifyAttribute('happiness', event.happiness);
    if (event.smarts) this.modifyAttribute('smarts', event.smarts);
    if (event.fame) this.character.fame += event.fame;
    
    this.addEvent(event.text);
  }

  handleDeath() {
    const reason = this.character.health <= 0 ? 'poor health' : 'old age';
    this.addEvent(`💀 You died at age ${this.character.age} from ${reason}. Your life has ended.`);
    
    setTimeout(() => {
      this.showDeathScreen();
    }, 1000);
  }

  showDeathScreen() {
    // Check if character has children to continue as
    const children = this.character.relationships.filter(r => r.type === 'Child' && r.age >= 18);
    
    let message = `💀 ${this.character.name} has died at age ${this.character.age}.\n\nFuneral Summary:\n`;
    message += `Net Worth: $${this.character.netWorth.toLocaleString()}\n`;
    message += `Properties: ${this.character.properties.length}\n`;
    message += `Vehicles: ${this.character.vehicles.length}\n`;
    message += `Relationships: ${this.character.relationships.length}\n\n`;
    
    if (children.length > 0) {
      message += `You have ${children.length} adult child(ren).\n\n`;
      message += 'Would you like to continue as one of your children?';
      
      if (confirm(message)) {
        this.continueAsChild(children[0]);
      } else {
        if (confirm('Start a new life?')) {
          game.showCharacterCreation();
        }
      }
    } else {
      message += 'You have no adult children to continue as.\n\nWould you like to start a new life?';
      if (confirm(message)) {
        game.showCharacterCreation();
      }
    }
  }

  continueAsChild(child) {
    // Inherit some money and properties from parent
    const inheritance = Math.floor(this.character.netWorth * 0.5);
    const inheritedProperties = this.character.properties.slice(0, Math.ceil(this.character.properties.length / 2));
    
    // Create new character based on child
    const oldName = this.character.name;
    this.character.name = child.name;
    this.character.age = child.age;
    this.character.gender = child.age % 2 === 0 ? 'Male' : 'Female'; // Simple gender assignment
    this.character.money = inheritance;
    this.character.netWorth = inheritance;
    this.character.properties = inheritedProperties;
    this.character.vehicles = [];
    this.character.pets = [];
    this.character.relationships = this.character.relationships.filter(r => r !== child);
    this.character.job = null;
    this.character.healthStatus = { diseases: [], addictions: [], injuries: [] };
    this.character.criminalRecord = [];
    this.character.inPrison = false;
    this.character.attributes = {
      happiness: this.random(60, 80),
      health: this.random(70, 90),
      smarts: this.random(40, 70),
      looks: this.random(40, 70)
    };
    
    this.updateLifeStage();
    this.addEvent(`🌟 You are now continuing life as ${child.name}, child of ${oldName}.`);
    this.addEvent(`💰 You inherited $${inheritance.toLocaleString()} from your parent.`);
    
    game.updateUI();
  }

  modifyAttribute(attr, amount) {
    this.character.attributes[attr] = Math.max(0, Math.min(100, this.character.attributes[attr] + amount));
  }

  addEvent(text) {
    this.actionHistory.push({
      text: text,
      age: this.character.age,
      timestamp: new Date()
    });
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getStartingMoney(scenario) {
    switch(scenario) {
      case 'Wealthy':
        return this.random(50000, 150000);
      case 'Poor':
        return this.random(100, 1000);
      case 'Royal':
        return this.random(500000, 2000000);
      case 'Celebrity Parent':
        return this.random(10000, 50000);
      case 'Criminal Family':
        return this.random(5000, 20000);
      case 'Orphan':
        return this.random(500, 3000);
      default: // Standard
        return this.random(2000, 10000);
    }
  }

  calculateLivingExpenses() {
    const age = this.character.age;
    if (age < 18) return 0; // Parents pay
    
    let baseExpense = 5000; // Basic living
    
    // Property costs
    this.character.properties.forEach(prop => {
      baseExpense += prop.value * 0.02; // 2% of property value annually
    });
    
    // Vehicle costs
    this.character.vehicles.forEach(vehicle => {
      baseExpense += vehicle.value * 0.1; // 10% of vehicle value annually
    });
    
    // Pet costs
    this.character.pets.forEach(pet => {
      baseExpense += pet.maintenance * 12; // Monthly maintenance
    });
    
    return Math.floor(baseExpense);
  }

  saveGame() {
    const saveData = {
      character: this.character,
      actionHistory: this.actionHistory,
      settings: this.settings,
      timestamp: new Date()
    };
    return JSON.stringify(saveData);
  }

  loadGameData(data) {
    try {
      const parsed = JSON.parse(data);
      this.character = parsed.character;
      this.actionHistory = parsed.actionHistory || [];
      this.settings = parsed.settings || this.settings;
      return true;
    } catch (e) {
      return false;
    }
  }
}