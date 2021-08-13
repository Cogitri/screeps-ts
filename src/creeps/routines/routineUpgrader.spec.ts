import { CreepRoles, Routines } from "utils/globalConsts";

import { TestUtil } from "utils/testUtils";
import { mockInstanceOf } from "screeps-jest";
import routineUpgrader from "./routineUpgrader";

const container1 = mockInstanceOf<StructureContainer>({
  resourceType: RESOURCE_ENERGY,
  structureType: STRUCTURE_CONTAINER,
  store: {
    energy: 100,
    getCapacity: () => 500,
    getUsedCapacity: () => 100
  }
});
const container2 = mockInstanceOf<StructureContainer>({ id: "container2" as Id<StructureContainer> });
const controller = mockInstanceOf<StructureController>({
  pos: { x: 0, y: 0 }
});

describe("Upgrader role", () => {
  let testUtil: TestUtil;

  beforeEach(() => {
    testUtil = new TestUtil();
  });

  describe("run", () => {
    it("withdraws energy from container", () => {
      const creep = testUtil.mockCreep({
        upgradeController: () => OK,
        pickup: () => OK, // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        store: { getFreeCapacity: () => 50, energy: 0, getCapacity: () => 50 } as any,
        memory: { role: CreepRoles.ROLE_UPGRADER, isWorking: false, currentTask: Routines.NONE, announcedTask: false },
        withdraw: () => ERR_NOT_IN_RANGE,
        room: { controller, find: () => [container1, container2] }
      });

      routineUpgrader(creep);
      // Siehe unseren Mock dazu in testUtils.ts, wir retrunen das hier von findClosestByPath.
      expect(creep.withdraw).toHaveBeenCalledTimes(1);
      expect(creep.say).toHaveBeenCalledWith("📤");
    });
    it("Upgrades the controller", () => {
      const creep = testUtil.mockCreep({
        upgradeController: () => ERR_NOT_IN_RANGE, // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        store: { getFreeCapacity: () => 0, energy: 50, getCapacity: () => 50 } as any,
        withdraw: () => OK,
        room: { controller, find: () => [container1, container2], energyAvailable: 50, energyCapacityAvailable: 100 }
      });

      routineUpgrader(creep);
      expect(creep.upgradeController).toHaveBeenCalledWith(controller);
      expect(creep.say).toHaveBeenCalledWith("⚡");
    });
  });
});
