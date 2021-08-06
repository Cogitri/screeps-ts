import { TestUtil } from "utils/testUtils";
import { spawnUpgrader } from "./modelUpgrader";

describe("modelUpgrader", () => {
  let testUtil: TestUtil;

  beforeEach(() => {
    testUtil = new TestUtil();
  });

  it("spawns a Upgrader creep", () => {
    const spawn = testUtil.mockSpawn();

    spawnUpgrader(spawn);
    Game.time = 2;
    spawnUpgrader(spawn);

    expect(spawn.spawnCreep).toHaveBeenCalledTimes(2);
    expect(Object.keys(Game.creeps).length).toBe(2);

    const creep1 = Game.creeps[Object.keys(Game.creeps)[0]];
    const creep2 = Game.creeps[Object.keys(Game.creeps)[1]];

    expect(creep1.name).toMatch(new RegExp("^upgrader?"));
    expect(creep1.name).not.toBe(creep2.name);
  });
});
