import globalConsts, { CreepRoles } from "./globalConsts";

import { TestUtil } from "utils/testUtils";
import spawnUtil from "./spawnUtil";

describe("Farming role", () => {
  let testUtil: TestUtil;

  beforeEach(() => {
    testUtil = new TestUtil();
  });

  it("generate bodyparts", () => {
    const spawn = testUtil.mockSpawn({ room: { energyCapacityAvailable: 1000, name: "Test" } });

    spawnUtil(CreepRoles.ROLE_HARVESTER, spawn);

    const creep1 = Game.creeps[Object.keys(Game.creeps)[0]];

    let currentCost = 0;
    creep1.body.forEach(part => {
      switch (part as any) {
        case "work":
          currentCost += BODYPART_COST[WORK];
          break;
        case "carry":
          currentCost += BODYPART_COST[CARRY];
          break;
        case "move":
          currentCost += BODYPART_COST[MOVE];
          break;
      }
    });

    expect(currentCost).toBeLessThanOrEqual(
      globalConsts.MAX_ENERGY_PERCENTAGE_TO_SPAWN * spawn.room.energyCapacityAvailable
    );

    expect(creep1.body.length).toBeGreaterThan(5);
  });
});
