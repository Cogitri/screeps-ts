import { mockGlobal, mockInstanceOf, mockStructure } from "screeps-jest";
import rountineHarvest from "./routineHarvester";

const source1 = mockInstanceOf<Source>({ id: "source1" as Id<Source> });
const source2 = mockInstanceOf<Source>({ id: "source2" as Id<Source> });
const spawn = mockInstanceOf<StructureSpawn>({
  pos: { x: 0, y: 0 }
});

describe("Harvester role", () => {
  describe("run", () => {
    it("harvests the first source", () => {
      const creep = mockInstanceOf<Creep>({
        store: { getFreeCapacity: () => 50 },
        room: {
          find: () => [source1, source2, spawn],
          energyAvailable: 50,
          energyCapacityAvailable: 0,
          controller: mockStructure(STRUCTURE_CONTROLLER)
        },
        harvest: () => OK,
        say: () => OK,
        energyAvailable: () => 0,
        memory: { lockTask: false, working: false },
        upgradeController: () => ERR_NOT_IN_RANGE,
        moveTo: () => OK
      });

      rountineHarvest(creep);
      expect(creep.harvest).toHaveBeenCalledWith(source1);
      expect(creep.say).toHaveBeenCalledWith("⛏️");
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
        energyCapacityAvailable: 100,
        pos: {
          x: 0,
          y: 0,
          findClosestByPath: () => {
            return mockInstanceOf<StructureContainer>({
              pos: { x: 0, y: 0 }
            });
          }
        }
      });
      mockGlobal<PathFinder>("PathFinder", {
        search: () => OK
      });

      rountineHarvest(creep);
      expect(creep.transfer).toHaveBeenCalledWith(spawn, RESOURCE_ENERGY);
    });
  });
});
