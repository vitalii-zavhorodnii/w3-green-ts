export const DECOR = {
  summoners: [
    'h000:hpea',
    'h002:hpea',
    'h00Z:hpea',
    'h011:hpea',
    'h012:hpea',
    'h010:hpea'
  ],
  zombies: ['u001:uban', 'u002:uske', 'u003:uskm', 'n001:nsko', 'n002:ndmu'],
  necro: {
    unit: 'u005:uskm',
    spell: 'A00Q:ANcl',
    spawn: { x: 2141.4, y: 99.7 },
    rect: [
      [2570.1, 3.8],
      [2661.8, 109.1]
    ],
    ritual: { x: 2623.5, y: 77.8 },
    points: [
      [2562.7, 283.6],
      [1841.9, 494.6],
      [1930.0, -284.0],
      [2542.8, -444.4]
    ]
  },
  shade: {
    unit: 'u006:ushd',
    timer: 5,
    points: [
      [4094.7, 1536.4],
      [3454.2, 1536.7],
      [3477.0, 1023.0],
      [4089.5, 1040.6]
    ]
  },
  treant: {
    tree: 'n003:nctl',
    treePos: [145.2, 1456.4],
    treeAngle: 315,
    wisp: 'e000:ewsp',
    wispTimer: 12,
    wispPos: [195.3, 1278.5],
    wispOrder: [611.4, 1299.3],
    rect: [
      [415.1, 1587.4],
      [975.4, 1029.9]
    ],
    animation: 'stand birth alternate work upgrade first second',
    effect: 'Abilities\\Spells\\NightElf\\Starfall\\StarfallCaster.mdl',
    effectPos: [777.9, 1397.7],
    effectTimer: 37
  },
  felguard: {
    unit: 'o014:orgu',
    unitPos: [35.6, -1061.7],
    waypoints: [
      [241.5, -897.8],
      [-211.2, -1102.5],
      [-507.5, -908.5],
      [-632.5, -739.0],
      [-673.9, -172.2],
      [-215.0, 3.7],
      [240.8, -0.8],
      [774.9, 482.7]
    ]
  },
  wisps: {
    unitId: 'e000:ewsp',
    decorId: 'B000',
    unitsSpawns: [
      [-3528.6, -656.1],
      [-3395.5, 453.5],
      [-2389.6, -270],
      [2496.5, 3307.8],
      [1406.4, -574.8],
      [30.2, 307.9],
      [-1730.1, -3260.6],
      [6905.4, -3480.5],
      [7404.1, 2749.8]
    ]
  }
};
