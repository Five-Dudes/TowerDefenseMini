(function registerSaboteurEnemy(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { maps: [], towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerEnemy("saboteur", {
    name: "Saboteur",
    desc: "Disables traps, stuns towers, and shuts down factory towers temporarily.",
    waveUnlock: { wave: 14, kind: "enemy", title: "Saboteur", desc: "Disables nearby traps, mines, and factory towers for a short time." },
    onTick(context) {
      const { enemy, state, dt, grid } = context;
      const radius = (grid && grid.size ? grid.size : 40) * 2;
      enemy.sabotageTimer = Math.max(0, (enemy.sabotageTimer || 0) - dt);
      if (enemy.sabotageTimer > 0) return true;
      let closestTrap = null;
      let bestTrap = Infinity;
      for (const trap of state.traps) {
        const dist = Math.hypot(trap.x - enemy.x, trap.y - enemy.y);
        if (dist <= radius && dist < bestTrap) {
          closestTrap = trap;
          bestTrap = dist;
        }
      }
      if (closestTrap) {
        closestTrap.disabledTimer = Math.max(closestTrap.disabledTimer || 0, 3);
      }
      let towerTarget = null;
      let towerBest = Infinity;
      for (const tower of state.towers) {
        if (tower.type === "wall" || tower.type === "mine") continue;
        const dist = Math.hypot(tower.x - enemy.x, tower.y - enemy.y);
        if (dist <= radius && dist < towerBest) {
          towerTarget = tower;
          towerBest = dist;
        }
      }
      if (towerTarget) {
        towerTarget.stunTimer = Math.max(towerTarget.stunTimer || 0, 1.5);
      }
      enemy.sabotageTimer = 2.2;
      return true;
    },
  });
})(window);
