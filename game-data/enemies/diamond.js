(function registerDiamondEnemy(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { maps: [], towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerEnemy("diamond", {
    name: "Prism",
    desc: "Armored, light-blue foe. Immune to heat and explosions.",
    waveUnlock: { wave: 15, kind: "enemy", title: "Diamond", desc: "Heavy armor and big HP." },
    onDeath(context) {
      const { enemy, spawnSplitEnemy } = context;
      const dropType = Math.random() < 0.5 ? "heavy" : "speedy";
      const childTier = Math.max(1, enemy.tier - 1);
      spawnSplitEnemy(enemy, childTier, {
        type: dropType,
        armored: false,
        darkMatter: false,
        stealth: false,
        revealed: true,
        immuneHeat: false,
        immuneExplosion: false,
        explosionVulnerable: dropType === "speedy" ? true : false,
      });
      return true;
    },
  });
})(window);
