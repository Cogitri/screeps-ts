import { TestUtil } from "utils/testUtils";
import { changeCreepCount } from "utils/commands";
import creepSpawn from "./creepSpawn";
import { spawnBuilder } from "creeps/models/modelBuilder";
import { CreepRoles, defaultCreepCount } from "utils/globalConsts";

describe("spawnCreeps", () => {
  let testUtil: TestUtil;

  beforeEach(() => {
    testUtil = new TestUtil();
  });

  it("spawns costum creep count", () => {
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
        Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === CreepRoles.ROLE_BUILDER)
      )
    );
    expect(builders.length).toEqual(5);

    const creepCountMap = new Map(Object.entries(Memory.creepCount));
    expect(creepCountMap.get("builder")).toEqual(5);
  });

  it("spawn default creep count", () => {
    const spawn = testUtil.mockSpawn({});
    for (let i = 0; i < 10; i++) {
      creepSpawn(spawn);
    }
    const builders = Object.values(
      Object.fromEntries(
        Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === CreepRoles.ROLE_BUILDER)
      )
    );
    expect(builders.length).toEqual(defaultCreepCount().get(CreepRoles.ROLE_BUILDER));

    const harvester = Object.values(
      Object.fromEntries(
        Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === CreepRoles.ROLE_HARVESTER)
      )
    );
    expect(harvester.length).toEqual(defaultCreepCount().get(CreepRoles.ROLE_HARVESTER));

    const soldiers = Object.values(
      Object.fromEntries(
        Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === CreepRoles.ROLE_SOLDIER)
      )
    );
    expect(soldiers.length).toEqual(defaultCreepCount().get(CreepRoles.ROLE_SOLDIER));

    const transporters = Object.values(
      Object.fromEntries(
        Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === CreepRoles.ROLE_TRANSPORTER)
      )
    );
    expect(transporters.length).toEqual(defaultCreepCount().get(CreepRoles.ROLE_TRANSPORTER));
  });

  it("call function with invalid role name", () => {
    let fncReturns = changeCreepCount("wurst", "5");
    expect(fncReturns).toMatch(new RegExp("Please enter a valid Creep role. The current roles are: ?"));

    fncReturns = changeCreepCount("harvester", "-1");
    expect(fncReturns).toMatch("Please enter a positiv number");

    fncReturns = changeCreepCount("harvester", "harvester");
    expect(fncReturns).toMatch("Please enter a valid number");
  });
});
