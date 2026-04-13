(function registerLaserTower(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { maps: [], towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerTower("laser", {
    cost: 140,
    range: 190,
    rate: 1.35,
    damage: 18,
    color: "#ef4444",
    slow: 0,
    laser: true,
    beamWidth: 8,
    fireUnlockLevel: 3,
    fireDps: 9,
    fireDuration: 2.4,
    blocksPath: true,
    onTick(context) {
      const { tower, stats, target, fireLaser, dt } = context;
      const range = stats.range || 0;
      tower.cooldown = Math.max(0, (tower.cooldown || 0) - (dt || 0));
      if (stats.laserContinuous) {
        if (tower.laserOverheatTimer > 0) {
          tower.laserOverheatTimer = Math.max(0, tower.laserOverheatTimer - (dt || 0));
          if (tower.laserOverheatTimer <= 0) {
            tower.laserEnergy = stats.laserEnergyMax;
          }
          return true;
        }
        if (!Number.isFinite(tower.laserEnergy)) {
          tower.laserEnergy = stats.laserEnergyMax;
        }
        if (target && tower.laserEnergy > 0) {
          fireLaser(tower, target, stats, range);
          tower.laserEnergy -= stats.laserEnergyDrain * (dt || 0);
          if (tower.laserEnergy <= 0) {
            tower.laserEnergy = 0;
            tower.laserOverheatTimer = stats.laserRechargeTime;
          }
        }
        return true;
      }
      if (stats.laserChargeTime > 0) {
        if (!target) {
          tower.laserChargeTimer = 0;
          return true;
        }
        if (tower.cooldown > 0) return true;
        if (tower.laserChargeTimer > 0) {
          tower.laserChargeTimer -= dt || 0;
          if (tower.laserChargeTimer <= 0) {
            fireLaser(tower, target, stats, range);
            tower.cooldown = stats.rate;
          }
        } else {
          tower.laserChargeTimer = stats.laserChargeTime;
        }
        return true;
      }
      if (target && tower.cooldown <= 0) {
        fireLaser(tower, target, stats, range);
        tower.cooldown = stats.rate;
      }
      return true;
    },
  });
})(window);
