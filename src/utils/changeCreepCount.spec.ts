import globalConsts, { CreepRoles } from "utils/globalConsts";

import { TestUtil } from "utils/testUtils";
import { changeCreepCount } from "utils/commands";
import creepSpawn from "../core/creepSpawn";
import { spawnBuilder } from "creeps/models/modelBuilder";

describe("spawnCreeps", () => {
  let testUtil: TestUtil;

  beforeEach(() => {
    testUtil = new TestUtil();
  });

  it("spawns costum creep count", () => {
    const spawn = testUtil.mockSpawn({});

    spawnBuilder(spawn);
    Game.time = 2;
    changeCreepCount("builder", 5);
    creepSpawn(spawn);
    creepSpawn(spawn);
    creepSpawn(spawn);
    creepSpawn(spawn);
    creepSpawn(spawn);
    creepSpawn(spawn);

    const builders = getCreepsPerRole(CreepRoles.ROLE_BUILDER);
    expect(builders).toEqual(5);

    const creepCountMap = new Map(Object.entries(Memory.creepCount));
    expect(creepCountMap.get("builder")).toEqual(5);
  });

  it("spawn default creep count", () => {
    const spawn = testUtil.mockSpawn({});
    for (let i = 0; i < 10; i++) {
      creepSpawn(spawn);
    }
    const builders = getCreepsPerRole(CreepRoles.ROLE_BUILDER);
    expect(builders).toEqual(globalConsts.DEFAULT_CREEP_COUNT.get(CreepRoles.ROLE_BUILDER));

    const harvester = getCreepsPerRole(CreepRoles.ROLE_HARVESTER);
    expect(harvester).toEqual(globalConsts.DEFAULT_CREEP_COUNT.get(CreepRoles.ROLE_HARVESTER));

    const soldiers = getCreepsPerRole(CreepRoles.ROLE_SOLDIER);
    expect(soldiers).toEqual(globalConsts.DEFAULT_CREEP_COUNT.get(CreepRoles.ROLE_SOLDIER));

    const transporters = getCreepsPerRole(CreepRoles.ROLE_TRANSPORTER);
    expect(transporters).toEqual(globalConsts.DEFAULT_CREEP_COUNT.get(CreepRoles.ROLE_TRANSPORTER));
  });

  it("call function with invalid role name", () => {
    let fncReturns = changeCreepCount("wurst", 5);
    expect(fncReturns).toMatch(new RegExp("Please enter a valid Creep role. The current roles are: ?"));

    fncReturns = changeCreepCount("harvester", -1);
    expect(fncReturns).toMatch("Please enter a positive number");

    fncReturns = changeCreepCount("harvester", "harvester" as any);
    expect(fncReturns).toMatch("Please enter a valid number");
  });
});

function getCreepsPerRole(role: string): number {
  const object: { [k: string]: [string, Creep] } = {};
  Object.entries(Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === role)).forEach(([k, v]) => {
    object[k] = v as [string, Creep];
  });
  return Object.values(object).length;
}
