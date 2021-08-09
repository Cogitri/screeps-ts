import { TestUtil } from "utils/testUtils";
import { spawnRepairer } from "./modelRepairer";

describe("modelRepairer", () => {
  let testUtil: TestUtil;

  beforeEach(() => {
    testUtil = new TestUtil();
  });

  it("spawns a repairer creep", () => {
    const spawn = testUtil.mockSpawn({});

    spawnRepairer(spawn);
    Game.time = 2;
    spawnRepairer(spawn);

    expect(spawn.spawnCreep).toHaveBeenCalledTimes(2);
    expect(Object.keys(Game.creeps).length).toBe(2);

    const creep1 = Game.creeps[Object.keys(Game.creeps)[0]];
    const creep2 = Game.creeps[Object.keys(Game.creeps)[1]];

    expect(creep1.name).toMatch(new RegExp("^repairer?"));
    expect(creep1.name).not.toBe(creep2.name);
  });
});
