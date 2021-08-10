import { TestUtil } from "utils/testUtils";
import { mockInstanceOf } from "screeps-jest";
import routineUpgrader from "./routineUpgrader";

const container1 = mockInstanceOf<StructureContainer>({ id: "container1" as Id<StructureContainer> });
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
        upgradeController: () => OK, // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        store: { getFreeCapacity: () => 50, energy: 0 } as any,
        withdraw: () => ERR_NOT_IN_RANGE,
        room: { controller, find: () => [container1, container2] }
      });

      routineUpgrader(creep);
      // Siehe unseren Mock dazu in testUtils.ts, wir retrunen das hier von findClosestByPath.
      expect(creep.withdraw).toHaveBeenCalledWith({ pos: { x: 0, y: 0 } }, RESOURCE_ENERGY);
      expect(creep.say).toHaveBeenCalledWith("📤");
    });
    it("Upgrades the controller", () => {
      const creep = testUtil.mockCreep({
        upgradeController: () => ERR_NOT_IN_RANGE, // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        store: { getFreeCapacity: () => 0, energy: 50 } as any,
        withdraw: () => OK,
        room: { controller, find: () => [container1, container2], energyAvailable: 50, energyCapacityAvailable: 100 }
      });

      routineUpgrader(creep);
      expect(creep.upgradeController).toHaveBeenCalledWith(controller);
      expect(creep.say).toHaveBeenCalledWith("⚡");
    });
  });
});
