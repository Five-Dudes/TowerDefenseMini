(function registerBufferEnemy(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { maps: [], towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerEnemy("buffer", {
    name: "Totemist",
    desc: "Heals and buffs nearby enemies.",
    waveUnlock: { wave: 13, kind: "enemy", title: "Buffer", desc: "Buffs and heals nearby enemies." },
    onTick(context) {
      const { enemy, state, dt, grid } = context;
      const radius = enemy.buffRadius || ((grid && grid.size) ? grid.size * 2.4 : 96);
      for (const ally of state.enemies) {
        if (ally === enemy || ally.hp <= 0) continue;
        const dist = Math.hypot(ally.x - enemy.x, ally.y - enemy.y);
        if (dist > radius) continue;
        if ((ally.antiHealTimer || 0) <= 0) {
          ally.buffed = true;
          if (ally.hp < ally.maxHp) {
            ally.hp = Math.min(ally.maxHp, ally.hp + (enemy.healRate || 6) * dt);
            ally.healFlashTimer = Math.max(ally.healFlashTimer || 0, 0.4);
          }
        }
      }
      return true;
    },
    onDeath(context) {
      const { enemy, state, grid } = context;
      const radius = enemy.buffRadius || ((grid && grid.size) ? grid.size * 2.4 : 96);
      state.explosions.push({
        x: enemy.x,
        y: enemy.y,
        radius,
        ttl: 0.5,
        color: "rgba(34, 197, 94, 0.45)",
      });
      for (const ally of state.enemies) {
        if (ally === enemy || ally.hp <= 0) continue;
        const dist = Math.hypot(ally.x - enemy.x, ally.y - enemy.y);
        if (dist > radius) continue;
        if ((ally.antiHealTimer || 0) <= 0) {
          const healAmount = Math.min(40, Math.max(8, ally.maxHp * 0.15));
          ally.hp = Math.min(ally.maxHp, ally.hp + healAmount);
          ally.tempBuffTimer = Math.max(ally.tempBuffTimer || 0, 3);
          ally.buffed = true;
          ally.healFlashTimer = Math.max(ally.healFlashTimer || 0, 0.6);
        }
      }
    },
  });
})(window);
