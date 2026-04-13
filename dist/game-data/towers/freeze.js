(function registerFreezeTower(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { maps: [], towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerTower("freeze", {
    cost: 70,
    range: 120,
    rate: 1.3,
    damage: 0,
    color: "#7dd3fc",
    slow: 0.55,
    projectileType: "gas",
    gasSpeed: 60,
    gasDuration: 1.1,
    gasRadius: 12,
    gasMaxRadius: 70,
    gasGrowRate: 55,
    blocksPath: true,
    onTick(context) {
      const { tower, stats, target, emitFreezeGas, state, dt } = context;
      tower.cooldown = Math.max(0, (tower.cooldown || 0) - (dt || 0));
      if (target && tower.cooldown <= 0) {
        emitFreezeGas(tower, target, stats);
        tower.cooldown = stats.rate;
      } else {
        const lingering = state.projectiles.find((entry) => entry.kind === "gas" && entry.owner === tower);
        if (lingering) {
          lingering.ttl = Math.min(lingering.ttl, 1.2);
          lingering.maxTtl = Math.max(lingering.maxTtl || 0, lingering.ttl);
        }
      }
      return true;
    },
  });
})(window);
