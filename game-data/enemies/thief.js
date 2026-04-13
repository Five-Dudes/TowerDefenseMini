(function registerThiefEnemy(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { maps: [], towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerEnemy("thief", {
    name: "Pickpocket",
    desc: "Steals gold every few seconds.",
    waveUnlock: { wave: 11, kind: "enemy", title: "Thief", desc: "Steals gold every few seconds." },
    onTick(context) {
      const { enemy, state, dt } = context;
      enemy.stealTimer = Math.max(0, (enemy.stealTimer || 0) - dt);
      if (enemy.stealTimer > 0) return true;
      const stolen = 2 + Math.floor(Math.random() * 9);
      state.gold = Math.max(0, state.gold - stolen);
      enemy.stealTimer = 2;
      return true;
    },
  });
})(window);
