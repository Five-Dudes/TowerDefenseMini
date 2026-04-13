(function registerFactoryTower(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { maps: [], towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerTower("factory", {
    cost: 100,
    range: 0,
    rate: 0,
    damage: 0,
    color: "#fbbf24",
    slow: 0,
    isFactory: true,
    onTick(context) {
      const { tower, stats, awardGold, updateHud, state } = context;
      if (tower.factoryDisabled && tower.factoryRepairing) {
        tower.factoryRepairTimer = Math.max(0, (tower.factoryRepairTimer || 0) - (context.dt || 0));
        if (tower.factoryRepairTimer <= 0) {
          tower.factoryRepairing = false;
          tower.factoryDisabled = false;
          tower.disabled = false;
          tower.factoryTimer = Math.max(10, stats.factoryInterval || 60);
          updateHud();
        }
      }
      if (!tower.factoryDisabled) {
        state.factoryKillGoldBonus += stats.factoryKillGoldBonus || 0;
        state.factoryKillLifeBonus += stats.factoryKillLifeBonus || 0;
        const interval = Math.max(10, stats.factoryInterval || 60);
        tower.factoryTimer = Number.isFinite(tower.factoryTimer) ? tower.factoryTimer : interval;
        tower.factoryTimer -= context.dt || 0;
        if (tower.factoryTimer <= 0) {
          const goldGain = stats.factoryGold || 0;
          const lifeGain = stats.factoryLife || 0;
          if (goldGain > 0) awardGold(goldGain);
          if (lifeGain > 0) state.lives = Math.min(state.maxLives, state.lives + lifeGain);
          updateHud();
          tower.factoryTimer += interval;
        }
        if ((stats.factoryLifeDrop || stats.factoryGoldDropMult) && !state.nukeSmoke) {
          const dropInterval = 120;
          tower.factoryDropTimer = Number.isFinite(tower.factoryDropTimer) ? tower.factoryDropTimer : dropInterval;
          tower.factoryDropTimer -= context.dt || 0;
          if (tower.factoryDropTimer <= 0) {
            const candidates = state.enemies.filter((enemy) => enemy.hp > 0 && !enemy.escaped);
            if (candidates.length > 0) {
              const pick = candidates[Math.floor(Math.random() * candidates.length)];
              if (stats.factoryLifeDrop) {
                pick.dropLives = Math.max(pick.dropLives || 0, stats.factoryLifeDrop);
              }
              if (stats.factoryGoldDropMult) {
                pick.dropGoldMult = Math.max(pick.dropGoldMult || 0, stats.factoryGoldDropMult);
              }
              tower.factoryDropTimer += dropInterval;
            }
          }
        }
      }
      return true;
    },
  });
})(window);
