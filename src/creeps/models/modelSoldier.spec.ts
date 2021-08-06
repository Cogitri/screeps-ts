import { TestUtil } from "utils/testUtils";
import { spawnSoldier } from "./modelSoldier";

describe("modelHarvester", () => {
  let testUtil: TestUtil;

  beforeEach(() => {
    testUtil = new TestUtil();
  });

  it("spawns a harvester creep", () => {
    const spawn = testUtil.mockSpawn();

    spawnSoldier(spawn);
    Game.time = 2;
    spawnSoldier(spawn);

    expect(spawn.spawnCreep).toHaveBeenCalledTimes(2);
    expect(Object.keys(Game.creeps).length).toBe(2);

    const creep1 = Game.creeps[Object.keys(Game.creeps)[0]];
    const creep2 = Game.creeps[Object.keys(Game.creeps)[1]];

    expect(creep1.name).toMatch(new RegExp("^soldier?"));
    expect(creep1.name).not.toBe(creep2.name);
  });
});
