import { CreepRoles, Routines } from "utils/globalConsts";
import { TestUtil } from "utils/testUtils";
import routineSoldier from "./routineSoldier";

describe("routineSoldier", () => {
  let testUtil: TestUtil;

  beforeEach(() => {
    testUtil = new TestUtil();
  });
  describe("fighting", () => {
    it("should move to a weaker enemy", () => {
      const enemy = testUtil.mockCreep({
        my: false,
        hits: 1,
        pos: {
          x: 100,
          y: 100
        }
      });

      const us = testUtil.mockCreep(
        {
          body: testUtil.composeBody(2),
          room: {
            find: () => [enemy]
          },
          hits: 10,
          memory: {
            role: CreepRoles.ROLE_SOLDIER,
            isWorking: false,
            currentTask: Routines.ATTACK
          },
          store: { getFreeCapacity: () => 50 },

          attack: () => ERR_NOT_IN_RANGE
        },
        {
          findClosestByPath: () => enemy
        }
      );

      routineSoldier(us);
      expect(us.say).not.toHaveBeenCalledWith("⚔️");
    });
    it("should *not* move to an enemy with way more health", () => {
      const enemy = testUtil.mockCreep({
        my: false,
        hits: 100000,
        pos: {
          x: 100,
          y: 100
        }
      });

      const us = testUtil.mockCreep(
        {
          body: testUtil.composeBody(20),
          hits: 10,
          memory: { role: CreepRoles.ROLE_SOLDIER, isWorking: false, currentTask: undefined },
          store: { getFreeCapacity: () => 50, energy: 0, getCapacity: () => 50 },
          room: {
            find: () => [enemy]
          },
          moveTo: () => undefined,
          say: () => undefined,
          attack: () => ERR_NOT_IN_RANGE,
          pickup: () => OK
        },
        {
          findClosestByPath: (t: number) => {
            switch (t) {
              case FIND_HOSTILE_CREEPS:
                return enemy;
              default:
                return null;
            }
          }
        }
      );

      routineSoldier(us);

      expect(us.moveTo).not.toHaveBeenCalledWith(enemy);
      expect(us.say).toHaveBeenCalledTimes(1);
    });
    it("should *not* move to an enemy with way more body parts", () => {
      const enemy = testUtil.mockCreep({
        my: false,
        hits: 1,
        body: testUtil.composeBody(100),
        pos: {
          x: 100,
          y: 100
        }
      });

      const us = testUtil.mockCreep(
        {
          hits: 10,
          memory: { role: CreepRoles.ROLE_SOLDIER, isWorking: false, currentTask: undefined },
          room: {
            find: () => [enemy],
            energyAvailable: 50,
            energyCapacityAvailable: 50
          },
          moveTo: () => undefined,
          say: () => undefined,
          attack: () => ERR_NOT_IN_RANGE
        },
        {
          x: 0,
          y: 0,
          findClosestByPath: () => enemy
        }
      );

      routineSoldier(us);

      expect(us.moveTo).toHaveBeenCalledTimes(0);
      expect(us.say).toHaveBeenCalledTimes(1);
    });
    it("should *not* move to a stronger enemy", () => {
      const enemy = testUtil.mockCreep(
        {
          my: false,
          hits: 1000,
          body: testUtil.composeBody(100),
          memory: {
            reusePath: 100,
            serializeMemory: true
          }
        },
        {
          x: 100,
          y: 100
        }
      );

      const us = testUtil.mockCreep(
        {
          hits: 10,
          memory: { role: CreepRoles.ROLE_SOLDIER, isWorking: false, currentTask: undefined },
          room: {
            find: () => [enemy],
            energyAvailable: 50,
            energyCapacityAvailable: 50
          },
          moveTo: () => undefined,
          say: () => undefined,
          attack: () => ERR_NOT_IN_RANGE
        },
        {
          findClosestByPath: () => enemy
        }
      );

      routineSoldier(us);

      expect(us.moveTo).toHaveBeenCalledTimes(0);
      expect(us.say).toHaveBeenCalledTimes(1);
    });
    it("should not fight PowerCreeps in general", () => {
      const enemy = testUtil.mockPowerCreep(
        {
          my: false,
          hits: 1000,
          memory: {
            reusePath: 100,
            serializeMemory: true
          }
        },
        {
          x: 100,
          y: 100
        }
      );

      const us = testUtil.mockCreep(
        {
          hits: 10,
          memory: { role: CreepRoles.ROLE_SOLDIER, isWorking: false, currentTask: undefined },
          store: { getFreeCapacity: () => 50, energy: 0, getCapacity: () => 50 },
          room: {
            find: () => [enemy]
          },
          moveTo: () => undefined,
          say: () => undefined,
          attack: () => ERR_NOT_IN_RANGE,
          pickup: () => OK,
          withdraw: () => ERR_NOT_IN_RANGE
        },
        {
          findClosestByPath: (type: number) => {
            switch (type) {
              case FIND_STRUCTURES:
                return STRUCTURE_SPAWN;
              default:
                return null;
            }
          }
        }
      );

      routineSoldier(us);

      expect(us.moveTo).not.toHaveBeenCalledWith(enemy);
    });
    it("should fight PowerCreeps when it has the advantage", () => {
      const enemy = testUtil.mockPowerCreep({
        my: false,
        hits: 100,
        memory: {
          reusePath: 100,
          serializeMemory: true
        }
      });

      const us = testUtil.mockCreep(
        {
          hits: 1000,
          memory: {
            role: CreepRoles.ROLE_SOLDIER,
            isWorking: false,
            currentTask: Routines.ATTACK
          },
          store: { getFreeCapacity: () => 50 },
          room: {
            find: () => [enemy]
          },

          attack: () => ERR_NOT_IN_RANGE
        },
        {
          findClosestByPath: () => enemy
        }
      );

      routineSoldier(us);

      // expect(us.moveTo).toHaveBeenCalledWith(enemy);
      expect(us.say).not.toHaveBeenCalledWith("⚔️");
    });
  });
  describe("defending", () => {
    it("should always fight PowerCreeps nearby", () => {
      const enemy = testUtil.mockPowerCreep({
        my: false,
        hits: 10000
      });

      const us = testUtil.mockCreep(
        {
          hits: 1000,
          memory: { role: CreepRoles.ROLE_SOLDIER, isWorking: false },
          store: { getFreeCapacity: () => 50 },
          room: {
            find: () => [enemy]
          },
          attack: () => OK
        },
        {
          findClosestByPath: () => enemy
        }
      );

      routineSoldier(us);

      expect(us.attack).toHaveBeenCalledWith(enemy);
    });
    it("should always fight enemies nearby", () => {
      const enemy = testUtil.mockCreep({
        my: false,
        hits: 10000,
        body: testUtil.composeBody(200)
      });

      const us = testUtil.mockCreep(
        {
          hits: 1000,
          memory: { role: CreepRoles.ROLE_SOLDIER, isWorking: false },
          store: { getFreeCapacity: () => 50 },
          room: {
            find: () => [enemy]
          },
          attack: () => OK
        },
        {
          findClosestByPath: () => enemy
        }
      );

      routineSoldier(us);

      expect(us.attack).toHaveBeenCalledWith(enemy);
    });
  });
  describe("peace", () => {
    it("should transport when no enemies are in the room", () => {
      const us = testUtil.mockCreep(
        {
          my: true,
          hits: 1000,
          memory: { role: CreepRoles.ROLE_SOLDIER, isWorking: false, currentTask: Routines.ATTACK },
          store: { getFreeCapacity: () => 0, energy: 5, getCapacity: () => 5 },
          room: {
            energyAvailable: 5,
            energyCapacityAvailable: 100
          },
          move: () => OK,
          transfer: () => OK
        },
        {
          findClosestByPath: (type: number) => {
            switch (type) {
              case FIND_STRUCTURES:
                return STRUCTURE_SPAWN;
              default:
                return null;
            }
          }
        }
      );

      routineSoldier(us);

      expect(us.transfer).toBeCalled();
    });
  });
});
