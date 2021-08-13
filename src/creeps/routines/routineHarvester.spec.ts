import { mockInstanceOf, mockStructure } from "screeps-jest";
import { CreepRoles } from "utils/globalConsts";

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
  structureType: STRUCTURE_SPAWN,
  store: {
    energy: 100,
    getFreeCapacity: () => 500
  }
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
          store: { getUsedCapacity: () => 50, energy: 100, getCapacity: () => 100 } as any,
          harvest: () => ERR_NOT_IN_RANGE,
          moveTo: () => OK,
          findClosestByPath: () => null,
          memory: {
            role: CreepRoles.ROLE_HARVESTER,
            currentTask: undefined,
            target: null,
            isWorking: false
          },
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
    });

    it("Upgrades the spawn when its full and the spawn can be filled", () => {
      const creep = testUtil.mockCreep({
        store: { getUsedCapacity: () => 100, energy: 100, getCapacity: () => 100 },
        room: {
          name: "test",
          find: () => [spawn, source1, source2],
          energyAvailable: 50,
          energyCapacityAvailable: 100
        }
      });
      // const transporter = testUtil.mockCreep({
      //   memory: {
      //     role: CreepRoles.ROLE_TRANSPORTER
      //   },
      //   room: {
      //     name: "test",
      //     find: () => [spawn, source1, source2],
      //     energyAvailable: 50,
      //     energyCapacityAvailable: 100
      //   }
      // });
      // Game.creeps.transporter = transporter;

      rountineHarvest(creep);
      expect(creep.transfer).toHaveBeenCalledTimes(1);
    });
  });
});
