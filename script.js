import { saveGame, loadGame } from './save_load.js';

document.addEventListener('DOMContentLoaded', () => {
  let brownies = 0;
  let bps = 0;
  let clickPower = 1;
  let clickUpgradeCost = 500;
  let upgradeCount = 0;
  let debugMenuVisible = false;

  const brownieElem = document.getElementById('brownie');
  const browniesElem = document.getElementById('brownies');
  const bpsElem = document.getElementById('bps');
  const clickPowerElem = document.getElementById('clickPower');
  const upgradeListElem = document.getElementById('upgradeList');
  const upgradeClickerButton = document.getElementById('upgradeClickerButton');
  const saveButton = document.getElementById('saveButton');
  const loadButton = document.getElementById('loadButton');

  const upgrades = [
    { name: 'Oven Mitts', cost: 5, bps: 0.2, description: 'Soft and safe for baking!', bought: false, color: '#FF5733' },
    { name: 'Wooden Spoon', cost: 25, bps: 1, description: 'Stir it up!', bought: false, color: '#33FF57' },
    { name: 'Mixer', cost: 50, bps: 4, description: 'Get mixing!', bought: false, color: '#5733FF' },
    { name: 'Oven', cost: 125, bps: 10, description: 'Bake faster!', bought: false, color: '#FFFF33' },
    { name: 'Factory', cost: 375, bps: 40, description: 'Mass production!', bought: false, color: '#33FFFF' },
    { name: 'Brownie Planet', cost: 2500, bps: 250, description: 'Colonize brownie planet', bought: false, color: '#FF33FF' },
    { name: 'Chocolate Galaxy', cost: 12500, bps: 5000, description: 'Explore a chocolate galaxy', bought: false, color: '#FFA07A' },
    { name: 'Brownie Universe', cost: 250000, bps: 50000, description: 'Create a brownie universe', bought: false, color: '#20B2AA' },
    { name: 'Time Machine', cost: 1250000, bps: 500000, description: 'Time Travel!', bought: false, color: '#87CEFA' },
    { name: 'Grandma', cost: 25000000, bps: 5000000, description: 'Grandmas are great!', bought: false, color: '#778899' },
    { name: 'Chocolate Fountain', cost: 125000000, bps: 50000000, description: 'Chocolate Fountain!', bought: false, color: '#F08080' },
    { name: 'Brownie God', cost: 2500000000, bps: 500000000, description: 'Become a brownie god', bought: false, color: '#90EE90' },
    { name: 'Chocolate Multiverse', cost: 12500000000, bps: 5000000000, description: 'Explore a chocolate multiverse', bought: false, color: '#D3D3D3' },
    { name: 'Chocolate Singularity', cost: 250000000000, bps: 50000000000, description: 'Create a chocolate singularity', bought: false, color: '#ADD8E6' },
    { name: 'Chocolate Black Hole', cost: 1250000000000, bps: 500000000000, description: 'Create a chocolate black hole', bought: false, color: '#E6E6FA' },
    { name: 'Chocolate Wormhole', cost: 25000000000000, bps: 5000000000000, description: 'Create a chocolate wormhole', bought: false, color: '#FFFACD' },
    { name: 'Chocolate Inflation', cost: 125000000000000, bps: 50000000000000, description: 'Create a chocolate inflation', bought: false, color: '#F5F5DC' },
    { name: 'Chocolate Big Bang', cost: 2500000000000000, bps: 500000000000000, description: 'Create a chocolate big bang', bought: false, color: '#FAF0E6' },
    { name: 'Chocolate God', cost: 12500000000000000, bps: 5000000000000000, description: 'Become a chocolate god', bought: false, color: '#FFF0F5' },
    { name: 'Chocolate Omniverse', cost: 250000000000000000, bps: 50000000000000000, description: 'Explore a chocolate omniverse', bought: false, color: '#FFE4E1' },
    { name: 'Chocolate Infinity', cost: 1250000000000000000, bps: 500000000000000000, description: 'Create a chocolate infinity', bought: false, color: '#FFB6C1' },
    { name: 'Chocolate Eternity', cost: 25000000000000000000, bps: 5000000000000000000, description: 'Create a chocolate eternity', bought: false, color: '#FFDAB9' },
    { name: 'Chocolate God Emperor', cost: 125000000000000000000, bps: 50000000000000000000, description: 'Become a chocolate god emperor', bought: false, color: '#FFDEAD' },
    { name: 'Chocolate Time Lord', cost: 2500000000000000000000, bps: 500000000000000000000, description: 'Become a chocolate time lord', bought: false, color: '#F0E68C' },
    { name: 'Chocolate Multidimensional Being', cost: 12500000000000000000000, bps: 5000000000000000000000, description: 'Become a chocolate multidimensional being', bought: false, color: '#E6FFE6' },
    { name: 'Chocolate Infinite Being', cost: 250000000000000000000000, bps: 50000000000000000000000, description: 'Become a chocolate infinite being', bought: false, color: '#E0FFFF' },
    { name: 'Chocolate Eternal Being', cost: 1250000000000000000000000, bps: 500000000000000000000000, description: 'Become a chocolate eternal being', bought: false, color: '#D8BFD8' },
    { name: 'Chocolate Omnipotent Being', cost: 25000000000000000000000000, bps: 5000000000000000000000000, description: 'Become a chocolate omnipotent being', bought: false, color: '#DEB887' },
    { name: 'Chocolate Omniscient Being', cost: 125000000000000000000000000, bps: 50000000000000000000000000, description: 'Become a chocolate omniscient being', bought: false, color: '#BC8F8F' },
    { name: 'Chocolate Omnipresent Being', cost: 2500000000000000000000000000, bps: 500000000000000000000000000, description: 'Become a chocolate omnipresent being', bought: false, color: '#CD5C5C' },
    { name: 'Chocolate Ultimate Being', cost: 12500000000000000000000000000, bps: 5000000000000000000000000000, description: 'Become a chocolate ultimate being', bought: false, color: '#F4A460' },
    { name: 'Chocolate Final Being', cost: 250000000000000000000000000000, bps: 500000000000000000000000000000, description: 'Become a chocolate final being', bought: false, color: '#DAA520' },
    { name: 'Chocolate Absolute Being', cost: 1250000000000000000000000000000, bps: 5000000000000000000000000000000, description: 'Become a chocolate absolute being', bought: false, color: '#BDB76B' },
    { name: 'Chocolate Transcendent Being', cost: 25000000000000000000000000000000, bps: 50000000000000000000000000000000, description: 'Become a chocolate transcendent being', bought: false, color: '#A9A9A9' },
    { name: 'Chocolate Supreme Being', cost: 125000000000000000000000000000000, bps: 500000000000000000000000000000000, description: 'Become a chocolate supreme being', bought: false, color: '#D2691E' },
    { name: 'Chocolate Prime Being', cost: 2500000000000000000000000000000000, bps: 5000000000000000000000000000000000, description: 'Become a chocolate prime being', bought: false, color: '#8B4513' },
    { name: 'Chocolate Singular Being', cost: 12500000000000000000000000000000000, bps: 5000000000000000000000000000000000, description: 'Become a chocolate singular being', bought: false, color: '#808000' },
    { name: 'Chocolate Unique Being', cost: 250000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate unique being', bought: false, color: '#4682B4' },
    { name: 'Chocolate One Being', cost: 1250000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate one being', bought: false, color: '#008080' },
    { name: 'Chocolate True Being', cost: 25000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate true being', bought: false, color: '#708090' },
    { name: 'Chocolate Real Being', cost: 125000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate real being', bought: false, color: '#00CED1' },
    { name: 'Chocolate Actual Being', cost: 2500000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate actual being', bought: false, color: '#1E90FF' },
    { name: 'Chocolate Definite Being', cost: 12500000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate definite being', bought: false, color: '#00BFFF' },
    { name: 'Chocolate Concrete Being', cost: 250000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate concrete being', bought: false, color: '#4169E1' },
    { name: 'Chocolate Material Being', cost: 1250000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate material being', bought: false, color: '#483D8B' },
    { name: 'Chocolate Physical Being', cost: 25000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate physical being', bought: false, color: '#6A5ACD' },
    { name: 'Chocolate Tangible Being', cost: 125000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate tangible being', bought: false, color: '#7B68EE' },
    { name: 'Chocolate Corporeal Being', cost: 2500000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate corporeal being', bought: false, color: '#7FFFD4' },
    { name: 'Chocolate Godling', cost: 12500000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate godling', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Demiurge', cost: 250000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate demiurge', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Creator', cost: 1250000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate creator', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Architect', cost: 25000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate architect', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Designer', cost: 125000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate designer', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Maker', cost: 2500000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate maker', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Producer', cost: 12500000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate producer', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Manufacturer', cost: 250000000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate manufacturer', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Industrialist', cost: 1250000000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate industrialist', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Capitalist', cost: 25000000000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate capitalist', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Tycoon', cost: 125000000000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate tycoon', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Magnate', cost: 2500000000000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate magnate', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Baron', cost: 12500000000000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate baron', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Sovereign', cost: 250000000000000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate sovereign', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Potentate', cost: 1250000000000000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate potentate', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Autocrat', cost: 25000000000000000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate autocrat', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Despot', cost: 125000000000000000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate despot', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Tyrant', cost: 2500000000000000000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate tyrant', bought: false, color: '#00FFFF' },
    { name: 'Chocolate Dictator', cost: 12500000000000000000000000000000000000000000000000000000000000000, bps: 50000000000000000000000000000000000, description: 'Become a chocolate dictator', bought: false, color: '#00FFFF' },
  ];

  let flyingBrownieTimeout;
  let flyingBrownieActive = false;

  const debugMenuElem = document.getElementById('debugMenu');
  const debugAmountInput = document.getElementById('debugAmount');
  const addBrowniesButton = document.getElementById('addBrowniesButton');
  const closeDebugMenuButton = document.getElementById('closeDebugMenu');

  brownieElem.addEventListener('click', () => {
    brownies += clickPower;
    updateDisplay();
  });

  upgradeClickerButton.addEventListener('click', () => {
    if (brownies >= clickUpgradeCost) {
      brownies -= clickUpgradeCost;
      clickPower += 1;
      clickUpgradeCost = Math.ceil(clickUpgradeCost * 1.2);
      updateDisplay();
      saveGameData();
    }
  });

  function buyUpgrade(index) {
    const upgrade = upgrades[index];
    const cost = calculateUpgradeCost(upgrade, index);

    if (brownies >= cost) {
      brownies -= cost;
      if (index === 0) {
        bps += upgrade.bps; 
      } else {
        bps += upgrade.bps;
      }
      upgrade.bought = true;
      upgradeCount++;
      updateDisplay();
      renderUpgrades();
      saveGameData();
    }
  }

  function calculateUpgradeCost(upgrade, index) {
    return upgrade.cost * Math.pow(1.15, upgradeCount);
  }

  function renderUpgrades() {
    upgradeListElem.innerHTML = '';
    upgrades.forEach((upgrade, index) => {
      const cost = calculateUpgradeCost(upgrade, index);
      const upgradeElem = document.createElement('div');
      upgradeElem.classList.add('upgrade');
      upgradeElem.style.backgroundColor = upgrade.color;
      upgradeElem.innerHTML = `
        <h3>${upgrade.name}</h3>
        <p>${upgrade.description}</p>
        <p>Cost: ${cost.toFixed(0)} brownies</p>
        <p>BPS: ${upgrade.bps}</p>
      `;
      upgradeElem.addEventListener('click', () => buyUpgrade(index));
      upgradeListElem.appendChild(upgradeElem);
    });
  }

  function updateDisplay() {
    browniesElem.textContent = brownies.toFixed(0);
    bpsElem.textContent = bps.toFixed(1);
    clickPowerElem.textContent = clickPower.toFixed(1) + "x";
    upgradeClickerButton.textContent = `Upgrade Clicker (Cost: ${clickUpgradeCost} brownies)`;
  }

  function gameLoop() {
    brownies += bps / 10;
    updateDisplay();
  }

  function showFlyingBrownie() {
    if (flyingBrownieActive) return;

    flyingBrownieActive = true;

    const flyingBrownie = document.createElement('img');
    flyingBrownie.src = 'brownie.svg';
    flyingBrownie.alt = 'Flying Brownie';
    flyingBrownie.style.position = 'absolute';
    flyingBrownie.style.width = '50px';
    flyingBrownie.style.height = '50px';
    flyingBrownie.style.transition = 'transform 5s linear, opacity 0.5s linear';
    flyingBrownie.style.opacity = '0';
    flyingBrownie.style.zIndex = '100'; // Ensure it's on top

    // Randomly position the brownie at the start
    const startTop = Math.random() * window.innerHeight * 0.8;
    flyingBrownie.style.top = `${startTop}px`;
    flyingBrownie.style.left = '-50px'; // Start off-screen

    document.body.appendChild(flyingBrownie);

    // Animate the flying brownie
    requestAnimationFrame(() => {
      flyingBrownie.style.opacity = '1';
      flyingBrownie.style.transform = `translateX(${window.innerWidth + 100}px)`; // Move off-screen
    });

    // Click event for the flying brownie
    flyingBrownie.addEventListener('click', () => {
      bps *= 2;
      clickPower *= 2;
      updateDisplay();
      flyingBrownie.remove();
      flyingBrownieActive = false;

      // Revert the multiplier after 2 minutes
      setTimeout(() => {
        bps /= 2;
        clickPower /= 2;
        updateDisplay();
      }, 2 * 60 * 1000);
    });

    // Remove the brownie if it's not clicked
    flyingBrownieTimeout = setTimeout(() => {
      if (flyingBrownie && flyingBrownie.parentNode) {
        flyingBrownie.remove();
        flyingBrownieActive = false;
      }
    }, 5000);

    // Schedule the next flying brownie
    setTimeout(() => {
      showFlyingBrownie();
    }, 5 * 60 * 1000); // 5 minutes
  }

  // Start the initial flying brownie timer
  setTimeout(() => {
    showFlyingBrownie();
  }, 5 * 60 * 1000);

  // Debug Menu
  document.addEventListener('keydown', (event) => {
    if (event.key === '\\') {
      debugMenuElem.style.display = debugMenuElem.style.display === 'none' ? 'block' : 'none';
    }
  });

  addBrowniesButton.addEventListener('click', () => {
    const amount = parseFloat(debugAmountInput.value);
    if (!isNaN(amount)) {
      brownies += amount;
      updateDisplay();
      saveGameData();
    }
  });

  closeDebugMenuButton.addEventListener('click', () => {
    debugMenuElem.style.display = 'none';
  });

  saveButton.addEventListener('click', () => {
    saveGameData();
  });

  loadButton.addEventListener('click', () => {
    loadGameData();
  });

  function saveGameData() {
    const gameData = {
      brownies: brownies,
      bps: bps,
      clickPower: clickPower,
      upgradeCount: upgradeCount,
      upgrades: upgrades.map(upgrade => ({ ...upgrade })), // Save upgrade states
    };
    saveGame(gameData);
  }

  function loadGameData() {
    const loadedData = loadGame();
    if (loadedData) {
      brownies = loadedData.brownies || 0;
      bps = loadedData.bps || 0;
      clickPower = loadedData.clickPower || 1;
      upgradeCount = loadedData.upgradeCount || 0;

      // Load upgrade bought states
      if (loadedData.upgrades) {
        loadedData.upgrades.forEach((loadedUpgrade, index) => {
          if (upgrades[index]) {
            upgrades[index].bought = loadedUpgrade.bought;
          }
        });
      }
      updateDisplay();
      renderUpgrades();
    }
  }

  // Initialize the game
  loadGameData();
  renderUpgrades();
  setInterval(gameLoop, 100);
});