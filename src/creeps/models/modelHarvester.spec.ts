import { spawnHarvester } from "./modelHarvester";
import { testInit } from "./testUtil";

describe("modelHarvester", () => {
  it("spawns a harvester creep", () => {
    const spawn = testInit();

    spawnHarvester(spawn);
    Game.time = 2;
    spawnHarvester(spawn);

    expect(spawn.spawnCreep).toHaveBeenCalledTimes(2);
    expect(Object.keys(Game.creeps).length).toBe(2);

    const creep1 = Game.creeps[Object.keys(Game.creeps)[0]];
    const creep2 = Game.creeps[Object.keys(Game.creeps)[1]];

    expect(creep1.name).toMatch(new RegExp("^harvester?"));
    expect(creep1.name).not.toBe(creep2.name);
  });
});
