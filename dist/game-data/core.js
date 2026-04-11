(function bootstrapTdmData(globalScope) {
  const data = globalScope.TDMData || {
    maps: [],
    towers: {},
    enemies: {},
    mutations: [],
    waveUnlocks: [],
  };

  data.registerTower = (id, definition) => {
    data.towers[id] = definition;
  };

  data.registerEnemy = (id, definition) => {
    data.enemies[id] = { key: id, ...definition };
    if (definition.waveUnlock) {
      data.waveUnlocks.push({
        ...definition.waveUnlock,
        value: definition.waveUnlock.value || id,
      });
    }
  };

  data.registerMutation = (definition) => {
    data.mutations.push(definition);
    if (definition.waveUnlock) {
      data.waveUnlocks.push({
        ...definition.waveUnlock,
        value: definition.waveUnlock.value || definition.key,
      });
    }
  };

  globalScope.TDMData = data;
})(window);
