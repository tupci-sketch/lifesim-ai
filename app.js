// Main Application Logic
class BitLifeGame {
  constructor() {
    this.gameState = new GameState();
    this.activities = new Activities(this.gameState);
    this.currentCategory = null;
    this.navigationStack = [];
    this.apiSetupDone = false;
    this.hasSplashPlayed = false;
    this.countryCityMap = {
      'United States': ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle', 'Houston', 'Atlanta', 'Dallas', 'Phoenix', 'Boston'],
      'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton'],
      'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Edinburgh', 'Glasgow'],
      'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
      'France': ['Paris', 'Lyon', 'Marseille', 'Nice', 'Bordeaux'],
      'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Sapporo'],
      'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
      'Brazil': ['S\u00e3o Paulo', 'Rio de Janeiro', 'Bras\u00edlia', 'Salvador', 'Fortaleza'],
      'Mexico': ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'],
      'India': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'],
      'Russia': ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg'],
      'China': ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu'],
      'South Korea': ['Seoul', 'Busan', 'Incheon', 'Daegu'],
      'Italy': ['Rome', 'Milan', 'Naples', 'Turin', 'Florence'],
      'Spain': ['Madrid', 'Barcelona', 'Seville', 'Valencia'],
      'Saudi Arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Dammam'],
      'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
      'Thailand': ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya'],
      'Sweden': ['Stockholm', 'Gothenburg', 'Malm\u00f6', 'Uppsala'],
      'Denmark': ['Copenhagen', 'Aarhus', 'Odense'],
      'Norway': ['Oslo', 'Bergen', 'Trondheim'],
      'Netherlands': ['Amsterdam', 'Rotterdam', 'The Hague'],
      'Belgium': ['Brussels', 'Antwerp', 'Ghent'],
    };
    this.initStartupFlow();
  }

  // --- Stage 0: Splash, API Setup, Character Creation Flow ---
  initStartupFlow() {
    // Show splash first with fade-in animation
    this.showSplashScreen();
    // After 2 seconds, show the START NEW LIFE button
    setTimeout(() => {
      const startBtn = document.getElementById('startNewLifeBtn');
      if (startBtn) {
        startBtn.style.display = 'inline-flex';
        startBtn.style.animation = 'fadeIn 0.5s ease-out';
        startBtn.onclick = () => this.onStartNewLife();
      }
    }, 2000);
  }

  onStartNewLife() {
    this.hideSplashShowAPISetup();
  }

  showSplashScreen() {
    document.getElementById('splashScreen').style.display = 'block';
    document.getElementById('apiSetup').style.display = 'none';
    document.getElementById('characterCreation').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'none';
  }

  hideSplashShowAPISetup() {
    document.getElementById('splashScreen').style.display = 'none';
    document.getElementById('apiSetup').style.display = 'block';
  }

  continueWithAPI() {
    const apiKey = document.getElementById('setupApiKey').value.trim();
    this.gameState.settings.perplexityApiKey = apiKey;
    document.getElementById('apiSetup').style.display = 'none';
    this.apiSetupDone = true;
    this.showCharacterCreation();
  }

  skipAPI() {
    this.gameState.settings.perplexityApiKey = '';
    document.getElementById('apiSetup').style.display = 'none';
    this.apiSetupDone = true;
    this.showCharacterCreation();
  }


  showCharacterCreation() {
    document.getElementById('splashScreen').style.display = 'none';
    document.getElementById('apiSetup').style.display = 'none';
    document.getElementById('characterCreation').style.display = 'block';
    document.getElementById('gameScreen').style.display = 'none';
    this.updateCities();
  }

  updateCities() {
    // Repopulate the city dropdown based on selected country
    const country = document.getElementById('charCountry').value;
    const cities = this.countryCityMap[country] || ['Capital City'];
    const citySelect = document.getElementById('charCity');
    citySelect.innerHTML = cities.map(city => `<option value="${city}">${city}</option>`).join('');
  }

  startGame() {
    const firstName = document.getElementById('charFirstName').value.trim() || 'Player';
    const lastName = document.getElementById('charLastName').value.trim() || '';
    const gender = document.getElementById('charGender').value;
    const country = document.getElementById('charCountry').value;
    const city = document.getElementById('charCity').value;
    const scenario = document.getElementById('charScenario').value;

    // Build full name
    let fullName = firstName;
    if (lastName) fullName += ' ' + lastName;

    // Determine if royal option available for selected country
    let selectedScenario = scenario;
    const royaltyCountries = ["United Kingdom","Saudi Arabia","UAE","Thailand","Sweden","Qatar","Malaysia","Denmark","Belgium","Spain","Netherlands","Norway","Monaco","Japan","Jordan","Kuwait"];
    if (scenario === 'Royal' && !royaltyCountries.includes(country)) {
      selectedScenario = 'Standard';
    }

    this.gameState.createCharacter(fullName, gender, country, city, selectedScenario);

    this.showGameScreen();
    this.updateUI();
    this.gameState.addEvent(`🎉 Welcome to the world, ${fullName}!`);
  }

  showGameScreen() {
    document.getElementById('splashScreen').style.display = 'none';
    document.getElementById('characterCreation').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
  }

  ageUp() {
    if (!this.gameState.character) return;
    
    // Check if character is dead
    if (this.gameState.character.health <= 0 || this.gameState.character.age >= 120) {
      return;
    }
    
    // Store old values for animation
    const oldAttrs = JSON.parse(JSON.stringify(this.gameState.character.attributes));
    
    this.gameState.ageUp();
    this.animateAgeUp(oldAttrs);
    this.updateActivities();
  }

  updateUI(oldAttributes = null) {
    const char = this.gameState.character;
    if (!char) return;

    // Update character info
    document.getElementById('characterName').textContent = char.name;
    document.getElementById('characterDetails').textContent = 
      `Age: ${char.age} | Net Worth: $${char.netWorth.toLocaleString()}`;
    document.getElementById('characterStatus').textContent = 
      `${char.lifeStage} | ${char.city}, ${char.country}${char.job ? ` | ${char.job.title}` : ''}`;

    // Update portrait based on life stage
    const portraits = {
      'Baby': '👶',
      'Toddler': '🧒',
      'Child': '👦',
      'Teenager': '🧑',
      'Young Adult': char.gender === 'Male' ? '👨' : '👩',
      'Adult': char.gender === 'Male' ? '👨' : '👩',
      'Senior': '🧓'
    };
    document.getElementById('characterPortrait').textContent = portraits[char.lifeStage] || '👤';

    // Update attributes with animation
    if (oldAttributes) {
      this.updateAttributeBar('happiness', char.attributes.happiness, oldAttributes.happiness);
      this.updateAttributeBar('health', char.attributes.health, oldAttributes.health);
      this.updateAttributeBar('smarts', char.attributes.smarts, oldAttributes.smarts);
      this.updateAttributeBar('looks', char.attributes.looks, oldAttributes.looks);
    } else {
      this.updateAttributeBar('happiness', char.attributes.happiness);
      this.updateAttributeBar('health', char.attributes.health);
      this.updateAttributeBar('smarts', char.attributes.smarts);
      this.updateAttributeBar('looks', char.attributes.looks);
    }

    // Update event log
    this.updateEventLog();
    
    // Update status tab
    this.updateStatusTab();
    
    // Update relationships tab
    this.updateRelationshipsTab();
    
    // Update assets tab
    this.updateAssetsTab();
  }

  updateAttributeBar(attr, value, oldValue = null) {
    const bar = document.getElementById(`${attr}Bar`);
    const valueEl = document.getElementById(`${attr}Value`);
    
    // Add animation class
    bar.classList.add('animating');
    setTimeout(() => bar.classList.remove('animating'), 400);
    
    bar.style.width = `${value}%`;
    valueEl.textContent = Math.round(value);
    
    // Color based on value
    if (value > 70) {
      bar.style.background = 'var(--color-success)';
    } else if (value > 40) {
      bar.style.background = 'var(--color-warning)';
    } else {
      bar.style.background = 'var(--color-error)';
    }
    
    // Show floating number if value changed
    if (oldValue !== null && oldValue !== value) {
      const change = Math.round(value - oldValue);
      if (change !== 0) {
        this.showFloatingChange(attr, change);
      }
    }
  }

  updateEventLog() {
    const eventLog = document.getElementById('eventLog');
    const recentEvents = this.gameState.actionHistory.slice(-5).reverse();
    
    eventLog.innerHTML = recentEvents.map(event => 
      `<div class="event">${event.text}</div>`
    ).join('');
    
    // Auto-scroll to bottom
    eventLog.scrollTop = eventLog.scrollHeight;
  }

  updateStatusTab() {
    const char = this.gameState.character;
    const html = `
      <div class="status-item">
        <div class="status-label">Full Name</div>
        <div class="status-value">${char.name}</div>
      </div>
      <div class="status-item">
        <div class="status-label">Age</div>
        <div class="status-value">${char.age} years</div>
      </div>
      <div class="status-item">
        <div class="status-label">Starting Scenario</div>
        <div class="status-value">${char.scenario}</div>
      </div>
      <div class="status-item">
        <div class="status-label">Gender</div>
        <div class="status-value">${char.gender}</div>
      </div>
      <div class="status-item">
        <div class="status-label">Location</div>
        <div class="status-value">${char.city}, ${char.country}</div>
      </div>
      <div class="status-item">
        <div class="status-label">Life Stage</div>
        <div class="status-value">${char.lifeStage}</div>
      </div>
      <div class="status-item">
        <div class="status-label">Money</div>
        <div class="status-value text-success">$${char.money.toLocaleString()}</div>
      </div>
      <div class="status-item">
        <div class="status-label">Net Worth</div>
        <div class="status-value text-success">$${char.netWorth.toLocaleString()}</div>
      </div>
      ${char.job ? `
        <div class="status-item">
          <div class="status-label">Job</div>
          <div class="status-value">${char.job.title}</div>
        </div>
        <div class="status-item">
          <div class="status-label">Salary</div>
          <div class="status-value text-success">$${char.job.salary.toLocaleString()}/year</div>
        </div>
      ` : ''}
      <div class="status-item">
        <div class="status-label">Fame</div>
        <div class="status-value">${char.fame}%</div>
      </div>
      ${char.socialMedia.platform ? `
        <div class="status-item">
          <div class="status-label">Social Media</div>
          <div class="status-value">${char.socialMedia.platform} - ${char.socialMedia.followers.toLocaleString()} followers</div>
        </div>
      ` : ''}
    `;
    
    document.getElementById('statusOverview').innerHTML = html;
  }

  updateRelationshipsTab() {
    const char = this.gameState.character;
    const html = char.relationships.length > 0 ? char.relationships.map(rel => `
      <div class="relationship-card">
        <div class="relationship-header">
          <div>
            <div class="relationship-name">${rel.name}</div>
            <div class="relationship-type">${rel.type} (Age: ${Math.floor(rel.age)})</div>
          </div>
        </div>
        <div class="relationship-bar">
          <div class="relationship-fill" style="width: ${rel.relationshipLevel}%"></div>
        </div>
      </div>
    `).join('') : '<p>No relationships yet.</p>';
    
    document.getElementById('relationshipsContent').innerHTML = html;
  }

  updateAssetsTab() {
    const char = this.gameState.character;
    let html = '';
    
    if (char.properties.length > 0) {
      html += '<div class="asset-section"><h4>Properties</h4>';
      html += char.properties.map(prop => `
        <div class="asset-item">
          <div class="asset-header">
            <div class="asset-name">${prop.type}</div>
            <div class="asset-value">$${prop.value.toLocaleString()}</div>
          </div>
        </div>
      `).join('');
      html += '</div>';
    }
    
    if (char.vehicles.length > 0) {
      html += '<div class="asset-section"><h4>Vehicles</h4>';
      html += char.vehicles.map(vehicle => `
        <div class="asset-item">
          <div class="asset-header">
            <div class="asset-name">${vehicle.type}</div>
            <div class="asset-value">$${vehicle.value.toLocaleString()}</div>
          </div>
        </div>
      `).join('');
      html += '</div>';
    }
    
    if (char.pets.length > 0) {
      html += '<div class="asset-section"><h4>Pets</h4>';
      html += char.pets.map(pet => `
        <div class="asset-item">
          <div class="asset-header">
            <div class="asset-name">${pet.name} (${pet.type})</div>
            <div>Age: ${Math.floor(pet.age)}</div>
          </div>
        </div>
      `).join('');
      html += '</div>';
    }
    
    if (!html) {
      html = '<p>No assets yet. Start earning money to buy properties, vehicles, and pets!</p>';
    }
    
    document.getElementById('assetsContent').innerHTML = html;
  }

  updateActivities() {
    if (this.currentCategory) {
      this.showCategoryActions(this.currentCategory);
    } else {
      this.showActivityCategories();
    }
  }

  showActivityCategories() {
    this.currentCategory = null;
    this.navigationStack = [];
    document.getElementById('breadcrumb').style.display = 'none';
    
    const activities = this.activities.getAvailableActivities();
    let html = '<div class="activity-list">';
    
    activities.forEach(category => {
      html += `<button class="activity-btn" onclick="game.openCategory('${category.category}')">`;
      html += `${this.getCategoryIcon(category.category)} ${category.category} ›`;
      html += `</button>`;
    });
    
    html += '</div>';
    document.getElementById('activitiesContent').innerHTML = html;
  }

  getCategoryIcon(category) {
    const icons = {
      'School': '📚',
      'Work': '💼',
      'Mind & Body': '💪',
      'Love': '❤️',
      'Crime': '🚨',
      'Shopping': '🛍️',
      'Social Media': '📱'
    };
    return icons[category] || '🎯';
  }

  openCategory(categoryName) {
    this.currentCategory = categoryName;
    this.navigationStack = ['Activities', categoryName];
    this.updateBreadcrumb();
    this.showCategoryActions(categoryName);
  }

  showCategoryActions(categoryName) {
    const activities = this.activities.getAvailableActivities();
    const category = activities.find(c => c.category === categoryName);
    
    if (!category) {
      this.showActivityCategories();
      return;
    }
    
    let html = '<div class="activity-list">';
    
    category.actions.forEach(action => {
      html += `<button class="activity-btn" onclick="game.showActionDetail('${category.category}', '${action.name.replace(/'/g, "\\'")}')">`;  
      html += action.name;
      html += `</button>`;
    });
    
    html += '</div>';
    document.getElementById('activitiesContent').innerHTML = html;
  }

  updateBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    if (this.navigationStack.length === 0) {
      breadcrumb.style.display = 'none';
      return;
    }
    
    breadcrumb.style.display = 'block';
    let html = '<div class="breadcrumb">';
    
    this.navigationStack.forEach((item, index) => {
      if (index === this.navigationStack.length - 1) {
        html += `<span class="breadcrumb-item active">${item}</span>`;
      } else {
        html += `<span class="breadcrumb-item" style="cursor: pointer;" onclick="game.navigateBack(${index})">${item}</span>`;
        html += `<span class="breadcrumb-separator">›</span>`;
      }
    });
    
    html += '</div>';
    breadcrumb.innerHTML = html;
  }

  navigateBack(index) {
    if (index === 0) {
      this.showActivityCategories();
    }
  }

  showActionDetail(category, actionName) {
    const activities = this.activities.getAvailableActivities();
    const cat = activities.find(c => c.category === category);
    if (!cat) return;
    
    const action = cat.actions.find(a => a.name === actionName);
    if (!action) return;
    
    // Get action info
    const actionInfo = this.activities.getActionInfo(actionName);
    
    // Show modal
    this.showActionModal(actionName, actionInfo, () => {
      this.executeActivity(category, actionName);
    });
  }

  showActionModal(title, info, onConfirm) {
    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.onclick = () => this.closeActionModal();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'action-modal';
    modal.id = 'actionModal';
    
    let statPreviewHtml = '';
    if (info.statChanges && Object.keys(info.statChanges).length > 0) {
      statPreviewHtml = '<div class="stat-preview"><h5>Expected Changes:</h5>';
      for (const [stat, change] of Object.entries(info.statChanges)) {
        const className = change > 0 ? 'positive' : 'negative';
        const sign = change > 0 ? '+' : '';
        statPreviewHtml += `<div class="stat-preview-item">`;
        statPreviewHtml += `<span>${this.capitalizeFirst(stat)}</span>`;
        statPreviewHtml += `<span class="stat-preview-value ${className}">${sign}${change}</span>`;
        statPreviewHtml += `</div>`;
      }
      statPreviewHtml += '</div>';
    }
    
    modal.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="modal-close" onclick="game.closeActionModal()">✕</button>
      </div>
      <div class="modal-body">
        <p class="action-description">${info.description}</p>
        ${statPreviewHtml}
        ${info.requirements ? `<p style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Requirements: ${info.requirements}</p>` : ''}
        <button class="btn btn--primary btn--full-width" onclick="game.confirmAction()" style="margin-top: var(--space-16);">
          Perform Action
        </button>
      </div>
    `;
    
    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
    
    // Store callback
    this.pendingActionCallback = onConfirm;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  closeActionModal() {
    const backdrop = document.querySelector('.modal-backdrop');
    const modal = document.getElementById('actionModal');
    
    if (backdrop) {
      backdrop.classList.add('hiding');
      setTimeout(() => backdrop.remove(), 150);
    }
    
    if (modal) {
      modal.classList.add('hiding');
      setTimeout(() => modal.remove(), 200);
    }
    
    document.body.style.overflow = '';
    this.pendingActionCallback = null;
  }

  confirmAction() {
    if (this.pendingActionCallback) {
      this.closeActionModal();
      
      // Store old attributes
      const oldAttrs = JSON.parse(JSON.stringify(this.gameState.character.attributes));
      
      // Execute action
      this.pendingActionCallback();
      
      // Update UI with animations
      setTimeout(() => {
        this.updateUI(oldAttrs);
        
        // Show toast for last event
        const lastEvent = this.gameState.actionHistory[this.gameState.actionHistory.length - 1];
        if (lastEvent) {
          this.showToast(lastEvent.text, 'success');
        }
      }, 100);
    }
  }

  executeActivity(category, actionName) {
    const activities = this.activities.getAvailableActivities();
    const cat = activities.find(c => c.category === category);
    if (cat) {
      const action = cat.actions.find(a => a.name === actionName);
      if (action && action.action) {
        action.action();
      }
    }
  }

  async executeCustomAction() {
    const input = document.getElementById('customAction');
    const actionText = input.value.trim();
    
    if (!actionText) {
      this.showToast('Please enter an action!', 'warning');
      return;
    }
    
    input.value = '';
    
    // Store old attributes
    const oldAttrs = JSON.parse(JSON.stringify(this.gameState.character.attributes));
    
    // Check if AI is enabled and API key is set
    if (this.gameState.settings.aiEnabled && this.gameState.settings.perplexityApiKey) {
      await this.executeAIAction(actionText);
    } else {
      this.executeSimpleAction(actionText);
    }
    
    this.updateUI(oldAttrs);
    
    // Show toast for last event
    const lastEvent = this.gameState.actionHistory[this.gameState.actionHistory.length - 1];
    if (lastEvent) {
      this.showToast(lastEvent.text, 'success');
    }
  }

  async executeAIAction(actionText) {
    const char = this.gameState.character;
    
    // Show loading toast
    this.showToast('Processing action with AI...', 'info');
    
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.gameState.settings.perplexityApiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: `You are a life simulation game narrator like BitLife. The character is ${char.name}, age ${char.age}, a ${char.gender} living in ${char.city}, ${char.country}. Current stats: Happiness ${Math.round(char.attributes.happiness)}%, Health ${Math.round(char.attributes.health)}%, Smarts ${Math.round(char.attributes.smarts)}%, Looks ${Math.round(char.attributes.looks)}%. Generate a humorous, dramatic, or realistic 1-2 sentence narrative outcome to their action. The result should feel natural and immersive.`
            },
            {
              role: 'user',
              content: `The player wants to: ${actionText}`
            }
          ],
          max_tokens: 100
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        const narrative = data.choices[0].message.content;
        
        // Apply random stat changes
        this.applyActionEffects(actionText);
        
        this.gameState.addEvent(`✨ ${narrative}`);
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('AI action failed:', error);
      this.showToast('AI unavailable, using simple mode', 'warning');
      this.executeSimpleAction(actionText);
    }
  }

  executeSimpleAction(actionText) {
    this.applyActionEffects(actionText);
    this.gameState.addEvent(`🎯 You tried to: ${actionText}`);
  }

  applyActionEffects(actionText) {
    const lower = actionText.toLowerCase();
    
    // Analyze action and apply effects
    if (lower.includes('study') || lower.includes('learn') || lower.includes('read')) {
      this.gameState.modifyAttribute('smarts', this.gameState.random(2, 8));
      this.gameState.modifyAttribute('happiness', this.gameState.random(-3, 3));
    } else if (lower.includes('exercise') || lower.includes('gym') || lower.includes('workout')) {
      this.gameState.modifyAttribute('health', this.gameState.random(2, 6));
      this.gameState.modifyAttribute('looks', this.gameState.random(1, 4));
    } else if (lower.includes('party') || lower.includes('celebrate') || lower.includes('fun')) {
      this.gameState.modifyAttribute('happiness', this.gameState.random(5, 15));
      this.gameState.modifyAttribute('health', this.gameState.random(-3, 0));
    } else if (lower.includes('work') || lower.includes('job')) {
      const money = this.gameState.random(100, 1000);
      this.gameState.character.money += money;
      this.gameState.modifyAttribute('happiness', this.gameState.random(-5, 5));
    } else {
      // Random effects for unknown actions
      this.gameState.modifyAttribute('happiness', this.gameState.random(-5, 10));
    }
  }

  switchTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-panel').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(nav => {
      nav.classList.remove('active');
    });
    
    // Add active class to selected tab
    document.getElementById(`${tabName}Tab`).classList.add('active');
    event.currentTarget.classList.add('active');
    
    // Update content if needed
    if (tabName === 'activities') {
      this.currentCategory = null;
      this.updateActivities();
    }
  }

  showFloatingChange(attr, change) {
    const bar = document.getElementById(`${attr}Bar`);
    const rect = bar.getBoundingClientRect();
    
    const floater = document.createElement('div');
    floater.className = `stat-change ${change > 0 ? 'positive' : 'negative'}`;
    floater.textContent = `${change > 0 ? '+' : ''}${change}`;
    floater.style.left = `${rect.left + rect.width / 2}px`;
    floater.style.top = `${rect.top}px`;
    
    document.body.appendChild(floater);
    
    setTimeout(() => floater.remove(), 600);
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  }

  animateAgeUp(oldAttrs) {
    // Show age counting animation
    const char = this.gameState.character;
    
    // Update UI with old attributes for smooth transition
    this.updateUI(oldAttrs);
    
    // Show toast
    this.showToast(`You are now ${char.age} years old!`, 'info');
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  saveApiKey() {
    const apiKey = document.getElementById('apiKey').value;
    this.gameState.settings.perplexityApiKey = apiKey;
    this.showToast('API Key saved!', 'success');
  }

  updateSettings() {
    const aiEnabled = document.getElementById('aiEnabled').value === 'true';
    this.gameState.settings.aiEnabled = aiEnabled;
  }

  downloadSave() {
    const saveData = this.gameState.saveGame();
    const blob = new Blob([saveData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bitlife-save-${this.gameState.character.name}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  loadGame() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (this.gameState.loadGameData(event.target.result)) {
          this.showGameScreen();
          this.updateUI();
          this.updateActivities();
          this.showToast('Game loaded successfully!', 'success');
        } else {
          this.showToast('Failed to load game file.', 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  resetGame() {
    if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
      location.reload();
    }
  }
}

// Initialize game
const game = new BitLifeGame();