import { TestUtil } from "utils/testUtils";
import { changeCreepCount } from "utils/commands";
import creepSpawn from "./creepSpawn";
import { spawnBuilder } from "creeps/models/modelBuilder";
import { CreepRoles } from "utils/globalConsts";

describe("spawnCreeps", () => {
  let testUtil: TestUtil;

  beforeEach(() => {
    testUtil = new TestUtil();
  });

  it("spawns a builder creep", () => {
    const spawn = testUtil.mockSpawn({});

    spawnBuilder(spawn);
    Game.time = 2;
    changeCreepCount("builder", "5");
    creepSpawn(spawn);
    creepSpawn(spawn);
    creepSpawn(spawn);
    creepSpawn(spawn);
    creepSpawn(spawn);
    creepSpawn(spawn);

    const builders = Object.values(
      Object.fromEntries(
        Object.entries(Game.creeps).filter(([_, creep]) => creep.memory.role === CreepRoles.ROLE_BUILDER)
      )
    );
    expect(builders.length).toEqual(5);
  });
});
