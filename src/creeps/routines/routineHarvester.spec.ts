import { mockInstanceOf, mockStructure } from "screeps-jest";
import { TestUtil } from "utils/testUtils";
import rountineHarvest from "./routineHarvester";

const source1 = mockInstanceOf<Source>({
  id: "source1" as Id<Source>,
  room: { name: "" },
  pos: { x: 0, y: 0 }
});
const source2 = mockInstanceOf<Source>({
  id: "source2" as Id<Source>,
  room: { name: "" },
  pos: { x: 0, y: 0 }
});
const spawn = mockInstanceOf<StructureSpawn>({
  pos: { x: 0, y: 0 }
});

describe("Harvester role", () => {
  let testUtil: TestUtil;

  beforeEach(() => {
    testUtil = new TestUtil();
  });

  describe("run", () => {
    it("harvests the first source", () => {
      const creep = testUtil.mockCreep(
        {
          upgradeController: () => ERR_NOT_IN_RANGE,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          store: { getFreeCapacity: () => 50, energy: 0 } as any,
          harvest: () => ERR_NOT_IN_RANGE,
          moveTo: () => OK,
          findClosestByPath: () => null,

          room: {
            find: () => [source1, source2, spawn],
            energyAvailable: 50,
            energyCapacityAvailable: 0,
            controller: mockStructure(STRUCTURE_CONTROLLER)
          }
        },
        { findClosestByPath: () => source1 }
      );

      rountineHarvest(creep);
      expect(creep.harvest).toHaveBeenCalledWith(source1);
      expect(creep.say).toHaveBeenCalledWith("⛏️");
    });

    it("Upgrades the spawn when its full and the spawn can be filled", () => {
      const creep = testUtil.mockCreep({
        room: {
          find: () => [spawn, source1, source2],
          energyAvailable: 50,
          energyCapacityAvailable: 100
        }
      });

      rountineHarvest(creep);
      expect(creep.transfer).toHaveBeenCalledWith(spawn, RESOURCE_ENERGY);
    });
  });
});
