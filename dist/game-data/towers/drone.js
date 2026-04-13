(function registerDroneTower(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { maps: [], towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerTower("drone", {
    cost: 80,
    range: 120,
    rate: 0.75,
    damage: 10,
    color: "#34d399",
    slow: 0,
    moveSpeed: 1.6,
    moveRadius: 22,
    blocksPath: true,
    droneMeleeRange: 18,
    onTick(context) {
      const { tower, stats, target, ensureDroneMinis, fireProjectile, applyArmorHit, applyExplosionDamage, handleEnemyDeath, playAttackImpactSound, state, dt } = context;
      tower.cooldown = Math.max(0, (tower.cooldown || 0) - (dt || 0));
      if (stats.droneBombRate > 0) {
        tower.bombCooldown = Math.max(0, (tower.bombCooldown || 0) - (dt || 0));
        if (target && (tower.bombCooldown || 0) <= 0) {
          const dropX = target.x;
          const dropY = target.y;
          state.explosions.push({
            x: dropX,
            y: dropY,
            radius: stats.droneBombRadius,
            ttl: 0.35,
            color: "rgba(251, 146, 60, 0.6)",
          });
          playAttackImpactSound("explosion");
          for (const enemy of state.enemies) {
            if (enemy.hp <= 0) continue;
            const dist = Math.hypot(enemy.x - dropX, enemy.y - dropY);
            if (dist <= stats.droneBombRadius) {
              if (enemy.armored) {
                applyArmorHit(enemy);
              }
              applyExplosionDamage(enemy, stats.droneBombDamage);
              if (enemy.hp <= 0) {
                handleEnemyDeath(enemy);
              }
            }
          }
          tower.bombCooldown = stats.droneBombRate;
        }
      }
      ensureDroneMinis(tower, stats);
      if (target && tower.cooldown <= 0) {
        fireProjectile(tower, target, stats);
        tower.cooldown = stats.rate;
      }
      return true;
    },
  });
})(window);
