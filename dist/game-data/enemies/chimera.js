(function registerChimeraEnemy(globalScope) {
  const data = globalScope.TDMData || (globalScope.TDMData = { maps: [], towers: {}, enemies: {}, mutations: [], waveUnlocks: [] });

  data.registerEnemy("chimera", {
    name: "Chimera",
    desc: "Late-game menace with many traits that splits on death.",
    waveUnlock: { wave: 18, kind: "enemy", title: "Chimera", desc: "Late-game hybrid menace." },
    onDeath(context) {
      const { enemy, spawnSplitEnemy, unlockProfileTitle } = context;
      if (typeof unlockProfileTitle === "function") {
        unlockProfileTitle("mythologicalBeast");
      }
      const childTier = Math.max(1, enemy.tier - 1);
      spawnSplitEnemy(enemy, childTier, {
        type: "flying",
        armored: false,
        darkMatter: false,
        stealth: true,
        revealed: false,
        immuneHeat: false,
        immuneExplosion: false,
        explosionVulnerable: false,
      });
      spawnSplitEnemy(enemy, childTier, {
        type: "flying",
        armored: true,
        darkMatter: false,
        stealth: false,
        revealed: true,
        immuneHeat: false,
        immuneExplosion: false,
        explosionVulnerable: false,
      });
      spawnSplitEnemy(enemy, childTier, {
        type: "flying",
        armored: false,
        darkMatter: false,
        stealth: false,
        revealed: true,
        immuneHeat: false,
        immuneExplosion: false,
        explosionVulnerable: false,
      });
      return true;
    },
  });
})(window);
