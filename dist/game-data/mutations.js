(function registerMutations(globalScope) {
  globalScope.TDMData.registerMutation({
    key: "armored",
    name: "Armored Mutation",
    desc: "Only laser or bomb damage hurts.",
    waveUnlock: { wave: 5, kind: "mutation", title: "Armored", desc: "Bomb and Laser break armor fastest." },
  });
  globalScope.TDMData.registerMutation({
    key: "darkmatter",
    name: "Dark Matter Mutation",
    desc: "Immune to laser, poison, and slow effects.",
    waveUnlock: { wave: 17, kind: "mutation", title: "Dark Matter", desc: "Resists slow and poison effects.", value: "darkMatter" },
  });
  globalScope.TDMData.registerMutation({
    key: "radioactive",
    name: "Radioactive Effect",
    desc: "Lingering hazard from the Nuke. Halves enemy health and speed for a full wave.",
  });
})(window);
