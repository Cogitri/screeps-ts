import { mockInstanceOf, mockStructure } from "screeps-jest";
import rountineHarvest from "./routineHarvester";

const source1 = mockInstanceOf<Source>({ id: "source1" as Id<Source> });
const source2 = mockInstanceOf<Source>({ id: "source2" as Id<Source> });
const spawn = mockStructure(STRUCTURE_SPAWN);

describe("Harvester role", () => {
  describe("run", () => {
    it("harvests the first source", () => {
      const creep = mockInstanceOf<Creep>({
        store: { getFreeCapacity: () => 50 },
        room: { find: () => [source1, source2, spawn] },
        harvest: () => OK,
        say: () => OK,
        memory: { lockTask: false, working: false }
      });

      rountineHarvest(creep);
      expect(creep.harvest).toHaveBeenCalledWith(source1);
      expect(creep.say).toHaveBeenCalledWith("⛏");
    });

    it("Upgrades the spawn when its full and the spawn can be filled", () => {
      const creep = mockInstanceOf<Creep>({
        store: { getFreeCapacity: () => 0, energy: 50 },
        room: {
          find: () => [spawn, source1, source2],
          energyAvailable: 50,
          energyCapacityAvailable: 100
        },
        memory: { lockTask: false, working: false },
        transfer: () => OK,
        energyAvailable: 50,
        energyCapacityAvailable: 100
      });

      rountineHarvest(creep);
      expect(creep.transfer).toHaveBeenCalledWith(spawn, RESOURCE_ENERGY);
    });
  });
});
