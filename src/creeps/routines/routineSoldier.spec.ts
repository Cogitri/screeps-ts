import { CreepRoles } from "utils/globalConsts";
import { TestUtil } from "utils/testUtils";
import { movePath } from "utils/vizPath";
import routineSoldier from "./routineSoldier";

const pathColor = "#ff3333";

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
        body: composeBody(1),

        pos: {
          x: 100,
          y: 100
        }
      });

      const us = testUtil.mockCreep(
        {
          body: composeBody(2),
          room: {
            find: () => [enemy]
          },
          hits: 10,
          memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          store: { getFreeCapacity: () => 50 },
          moveTo: () => OK,
          say: () => OK,
          attack: () => ERR_NOT_IN_RANGE
        },
        {
          findClosestByPath: () => enemy
        }
      );

      routineSoldier(us);

      expect(us.moveTo).toHaveBeenCalledWith(enemy);
      expect(us.say).toHaveBeenCalledWith("⚔️ attack");
    });
    it("should *not* move to an enemy with way more health", () => {
      const enemy = testUtil.mockCreep({
        my: false,
        hits: 100000,
        body: composeBody(1),
        pos: {
          x: 100,
          y: 100
        }
      });

      const us = testUtil.mockCreep(
        {
          body: composeBody(2),
          hits: 10,
          memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
          store: { getFreeCapacity: () => 50 },
          room: {
            find: () => [enemy]
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
      expect(us.say).toHaveBeenCalledTimes(0);
    });
    it("should *not* move to an enemy with way more body parts", () => {
      const enemy = testUtil.mockCreep({
        my: false,
        hits: 1,
        body: composeBody(100),
        pos: {
          x: 100,
          y: 100
        }
      });

      const us = testUtil.mockCreep(
        {
          body: composeBody(2),
          hits: 10,
          memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
          room: {
            find: () => [enemy]
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
      expect(us.say).toHaveBeenCalledTimes(0);
    });
    it("should *not* move to a stronger enemy", () => {
      const enemy = testUtil.mockCreep(
        {
          my: false,
          hits: 1000,
          body: composeBody(100)
        },
        {
          x: 100,
          y: 100
        }
      );

      const us = testUtil.mockCreep(
        {
          body: composeBody(2),
          hits: 10,
          memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
          room: {
            find: () => [enemy]
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
      expect(us.say).toHaveBeenCalledTimes(0);
    });
    it("should not fight PowerCreeps in general", () => {
      const enemy = testUtil.mockPowerCreep(
        {
          my: false,
          hits: 1000
        },
        {
          x: 100,
          y: 100
        }
      );

      const us = testUtil.mockCreep(
        {
          body: composeBody(2),
          hits: 10,
          memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
          store: { getFreeCapacity: () => 50 },
          room: {
            find: () => [enemy]
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
      expect(us.say).toHaveBeenCalledTimes(0);
    });
    it("should fight PowerCreeps whent it has the advantage", () => {
      const enemy = testUtil.mockPowerCreep({
        my: false,
        hits: 100
      });

      const us = testUtil.mockCreep(
        {
          body: composeBody(2),
          hits: 1000,
          memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
          store: { getFreeCapacity: () => 50 },
          room: {
            find: () => [enemy]
          },
          moveTo: () => OK,
          say: () => OK,
          attack: () => ERR_NOT_IN_RANGE
        },
        {
          findClosestByPath: () => enemy
        }
      );

      routineSoldier(us);

      expect(us.moveTo).toHaveBeenCalledWith(enemy);
      expect(us.say).toHaveBeenCalledWith("⚔️ attack");
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
          body: composeBody(2),
          hits: 1000,
          memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
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
        body: composeBody(200)
      });

      const us = testUtil.mockCreep(
        {
          body: composeBody(2),
          hits: 1000,
          memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
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
          body: composeBody(2),
          hits: 1000,
          memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
          store: { getFreeCapacity: () => 0 },
          room: {
            energyAvailable: 5,
            energyCapacityAvailable: 100,
            find: () => STRUCTURE_SPAWN
          },
          move: () => OK,
          transfer: () => OK
        },
        {
          findClosestByPath: () => null
        }
      );

      routineSoldier(us);

      expect(us.transfer).toBeCalled();
    });
  });
});

function composeBody(parts: number): BodyPartDefinition[] {
  const arr: BodyPartDefinition[] = [];
  for (let i = 0; i < parts; i++) {
    arr.push({
      type: "attack",
      hits: 100
    });
    arr.push({
      type: "tough",
      hits: 100
    });
  }

  return arr;
}
