(function registerAegisEnemy(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { maps: [], towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerEnemy("aegis", {
    name: "Aegis",
    desc: "Projects a shield that cancels area damage for nearby enemies.",
    waveUnlock: { wave: 9, kind: "enemy", title: "Aegis", desc: "Shields nearby enemies from splash." },
    onTick(context) {
      const { enemy, state, grid } = context;
      const radius = enemy.umbrellaRadius || ((grid && grid.size) ? grid.size * 2 : 80);
      for (const ally of state.enemies) {
        if (ally.hp <= 0) continue;
        const dist = Math.hypot(ally.x - enemy.x, ally.y - enemy.y);
        if (dist <= radius) {
          ally.umbrellaShielded = true;
        }
      }
      return true;
    },
  });
})(window);
