const SAVE_KEY = 'brownieClickerSave';

export function saveGame(data) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export function loadGame() {
  const saveString = localStorage.getItem(SAVE_KEY);
  try {
    return JSON.parse(saveString);
  } catch (e) {
    console.error('Failed to load game data:', e);
    return null;
  }
}