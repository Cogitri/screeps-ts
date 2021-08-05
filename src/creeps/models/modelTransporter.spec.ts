import { spawnTransporter } from "./modelTransporter";
import { testInit } from "./testUtil";

describe("modelHarvester", () => {
  it("spawns a harvester creep", () => {
    const spawn = testInit();

    spawnTransporter(spawn);
    Game.time = 2;
    spawnTransporter(spawn);

    expect(spawn.spawnCreep).toHaveBeenCalledTimes(2);
    expect(Object.keys(Game.creeps).length).toBe(2);

    const creep1 = Game.creeps[Object.keys(Game.creeps)[0]];
    const creep2 = Game.creeps[Object.keys(Game.creeps)[1]];

    expect(creep1.name).toMatch(new RegExp("^transporter?"));
    expect(creep1.name).not.toBe(creep2.name);
  });
});
