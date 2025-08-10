export const GAME = {
  voitingSegmentTimer: 10, // 20
  startSegmentTimer: 20, // 20
  startGold: 180, // 180
  startWood: 0, // 0
  maxPlayers: 6, // 6
  enemyPlayerId: 9, // 9
  decorPlayerId: 6, // 6
  capPerPlayer: 50, // 50
  presetStartLvl: 3,
  extentionsRound: 3, // 3 do not set lower then 1
  dummyId: 'u000:ushd',
  sanctumId: 'h00X:hars',
  altarId: 'h00Y:hars',
  accentColor: { code: '|cffffcc00', rgb: { r: 255, g: 204, b: 0 } },
  capColor: { code: '|cff939596', rgb: { r: 147, g: 149, b: 150 } },
  lootTable: ['I000:gold', 'I001:lmbr'],
  playerColor: [
    { name: 'Red', rgb: { r: 255, g: 3, b: 3 }, code: '|cffff0303' },
    { name: 'Blue', rgb: { r: 0, g: 66, b: 255 }, code: '|cff0042ff' },
    { name: 'Teal', rgb: { r: 27, g: 231, b: 186 }, code: '|cff1be7ba' },
    { name: 'Purple', rgb: { r: 85, g: 0, b: 129 }, code: '|cff550081' },
    { name: 'Yellow', rgb: { r: 254, g: 252, b: 0 }, code: '|cfffefc00' },
    { name: 'Orange', rgb: { r: 254, g: 137, b: 13 }, code: '|cfffe890d' }
  ],
  spwPointSummoner: [
    [-1280, 1922],
    [2047, 1922],
    [5376, 1922],
    [-1280, -1916],
    [2047, -1916],
    [5376, -1916]
  ],
  spwPointSunc: [
    [-1410.3, 2377.0],
    [1919.1, 2377.0],
    [5248.8, 2377.0],
    [-1404.1, -2376.0],
    [1921.1, -2376.0],
    [5249.8, -2376.0]
  ],
  spwPointAltar: [
    [-1158.0, 2377.0],
    [2166.0, 2377.0],
    [5496.8, 2377.0],
    [-1154.3, -2375.0],
    [2172.2, -2375.0],
    [5501.4, -2375.0]
  ],
  upgrades: [
    { upgradeId: 'R005:Rhst', spellId: 'A00H:AOae', name: 'aura haste' },
    { upgradeId: 'R004:Rhst', spellId: 'A00G:Aakb', name: 'aura strength' }
  ],
  buildFields: [
    {
      rect: [
        [-1621.4, 2106.8],
        [-943.0, 1467.1]
      ],
      center: [-1278.8, 1792.8]
    },
    {
      rect: [
        [1718.4, 2106.8],
        [2375.9, 1467.1]
      ],
      center: [-2047.4, 1792.8]
    },
    {
      rect: [
        [5042.0, 2106.8],
        [5705.0, 1467.1]
      ],
      center: [5376.7, 1792.8]
    },

    {
      rect: [
        [-1621.4, -1462.5],
        [-943.0, -2110.5]
      ],
      center: [-1278.8, -1790.1]
    },
    {
      rect: [
        [1718.4, -1462.5],
        [2375.9, -2110.5]
      ],
      center: [-2047.4, -1790.1]
    },
    {
      rect: [
        [5042.0, -1462.5],
        [5705.0, -2110.5]
      ],
      center: [5376.7, -1790.1]
    }
  ]
};
