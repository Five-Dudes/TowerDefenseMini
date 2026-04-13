(function registerTrollEnemy(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { maps: [], towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerEnemy("troll", {
    name: "Backstepper",
    desc: "Occasionally moves backward to dodge slow shots.",
    waveUnlock: { wave: 8, kind: "enemy", title: "Backstepper", desc: "Randomly steps backward to dodge shots." },
    onTick(context) {
      const { enemy, dt, getEnemyProgress } = context;
      enemy.backtrackCooldown = Math.max(0, (enemy.backtrackCooldown || 0) - dt);
      const progress = typeof getEnemyProgress === "function" ? getEnemyProgress(enemy) : 0;
      if (enemy.backtrackCooldown <= 0 && progress >= 1.25 && (enemy.pathIndex || 0) > 1 && Math.random() < 0.08) {
        enemy.backtrackTimer = 0.6;
        enemy.backtrackCooldown = 2.2;
      }
      return true;
    },
  });
})(window);
