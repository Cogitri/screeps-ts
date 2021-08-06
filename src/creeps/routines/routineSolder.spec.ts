import { mockInstanceOf } from "screeps-jest";
import { CreepRoles } from "utils/globalConsts";
import routineSoldier from "./routineSoldier";

const pathColor = "#ff3333";

describe("Soldier role", () => {
  describe("fighting", () => {
    it("should move to a weaker enemy", () => {
      const enemy = mockInstanceOf<Creep>({
        my: false,
        hits: 1,
        body: composeBody(1),
        pos: {
          x: 100,
          y: 100
        }
      });

      const us = mockInstanceOf<Creep>({
        body: composeBody(2),
        hits: 10,
        memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
        store: { getFreeCapacity: () => 50 },
        room: {
          find: () => [enemy]
        },
        pos: {
          x: 0,
          y: 0,
          findClosestByPath: () => enemy
        },
        moveTo: () => OK,
        say: () => OK,
        attack: () => ERR_NOT_IN_RANGE
      });

      routineSoldier(us);

      expect(us.moveTo).toHaveBeenCalledWith(enemy, { visualizePathStyle: { stroke: pathColor } });
      expect(us.say).toHaveBeenCalledWith("⚔️ attack");
    });
    it("should *not* move to an enemy with way more health", () => {
      const enemy = mockInstanceOf<Creep>({
        my: false,
        hits: 100000,
        body: composeBody(1),
        pos: {
          x: 100,
          y: 100
        }
      });

      const us = mockInstanceOf<Creep>({
        body: composeBody(2),
        hits: 10,
        memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
        store: { getFreeCapacity: () => 50 },
        room: {
          find: () => [enemy]
        },
        pos: {
          x: 0,
          y: 0,
          findClosestByPath: () => enemy
        },
        moveTo: () => undefined,
        say: () => undefined,
        attack: () => ERR_NOT_IN_RANGE
      });

      routineSoldier(us);

      expect(us.moveTo).toHaveBeenCalledTimes(0);
      expect(us.say).toHaveBeenCalledTimes(0);
    });
    it("should *not* move to an enemy with way more body parts", () => {
      const enemy = mockInstanceOf<Creep>({
        my: false,
        hits: 1,
        body: composeBody(100),
        pos: {
          x: 100,
          y: 100
        }
      });

      const us = mockInstanceOf<Creep>({
        body: composeBody(2),
        hits: 10,
        memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
        store: { getFreeCapacity: () => 50 },
        room: {
          find: () => [enemy]
        },
        pos: {
          x: 0,
          y: 0,
          findClosestByPath: () => enemy
        },
        moveTo: () => undefined,
        say: () => undefined,
        attack: () => ERR_NOT_IN_RANGE
      });

      routineSoldier(us);

      expect(us.moveTo).toHaveBeenCalledTimes(0);
      expect(us.say).toHaveBeenCalledTimes(0);
    });
    it("should *not* move to a stronger enemy", () => {
      const enemy = mockInstanceOf<Creep>({
        my: false,
        hits: 1000,
        body: composeBody(100),
        pos: {
          x: 100,
          y: 100
        }
      });

      const us = mockInstanceOf<Creep>({
        body: composeBody(2),
        hits: 10,
        memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
        store: { getFreeCapacity: () => 50 },
        room: {
          find: () => [enemy]
        },
        pos: {
          x: 0,
          y: 0,
          findClosestByPath: () => enemy
        },
        moveTo: () => undefined,
        say: () => undefined,
        attack: () => ERR_NOT_IN_RANGE
      });

      routineSoldier(us);

      expect(us.moveTo).toHaveBeenCalledTimes(0);
      expect(us.say).toHaveBeenCalledTimes(0);
    });
    it("should not fight PowerCreeps in general", () => {
      const enemy = mockInstanceOf<PowerCreep>({
        my: false,
        hits: 1000,
        body: undefined,
        pos: {
          x: 100,
          y: 100
        }
      });

      const us = mockInstanceOf<Creep>({
        body: composeBody(2),
        hits: 10,
        memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
        store: { getFreeCapacity: () => 50 },
        room: {
          find: () => [enemy]
        },
        pos: {
          x: 0,
          y: 0,
          findClosestByPath: () => enemy
        },
        moveTo: () => undefined,
        say: () => undefined,
        attack: () => ERR_NOT_IN_RANGE
      });

      routineSoldier(us);

      expect(us.moveTo).toHaveBeenCalledTimes(0);
      expect(us.say).toHaveBeenCalledTimes(0);
    });
    it("should fight PowerCreeps whent it has the advantage", () => {
      const enemy = mockInstanceOf<PowerCreep>({
        my: false,
        hits: 100,
        body: undefined,
        pos: {
          x: 100,
          y: 100
        }
      });

      const us = mockInstanceOf<Creep>({
        body: composeBody(2),
        hits: 1000,
        memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
        store: { getFreeCapacity: () => 50 },
        room: {
          find: () => [enemy]
        },
        pos: {
          x: 0,
          y: 0,
          findClosestByPath: () => enemy
        },
        moveTo: () => OK,
        say: () => OK,
        attack: () => ERR_NOT_IN_RANGE
      });

      routineSoldier(us);

      expect(us.moveTo).toHaveBeenCalledWith(enemy, { visualizePathStyle: { stroke: pathColor } });
      expect(us.say).toHaveBeenCalledWith("⚔️ attack");
    });
  });
  describe("defending", () => {
    it("should always fight PowerCreeps nearby", () => {
      const enemy = mockInstanceOf<PowerCreep>({
        my: false,
        hits: 10000,
        body: undefined,
        pos: {
          x: 100,
          y: 100
        }
      });

      const us = mockInstanceOf<Creep>({
        body: composeBody(2),
        hits: 1000,
        memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
        store: { getFreeCapacity: () => 50 },
        room: {
          find: () => [enemy]
        },
        pos: {
          x: 0,
          y: 0,
          findClosestByPath: () => enemy
        },
        attack: () => OK
      });

      routineSoldier(us);

      expect(us.attack).toHaveBeenCalledWith(enemy);
    });
    it("should always fight enemies nearby", () => {
      const enemy = mockInstanceOf<Creep>({
        my: false,
        hits: 10000,
        body: composeBody(200),
        pos: {
          x: 100,
          y: 100
        }
      });

      const us = mockInstanceOf<Creep>({
        body: composeBody(2),
        hits: 1000,
        memory: { role: CreepRoles.ROLE_SOLDIER, working: false },
        store: { getFreeCapacity: () => 50 },
        room: {
          find: () => [enemy]
        },
        pos: {
          x: 0,
          y: 0,
          findClosestByPath: () => enemy
        },
        attack: () => OK
      });

      routineSoldier(us);

      expect(us.attack).toHaveBeenCalledWith(enemy);
    });
  });
  describe("peace", () => {
    it("should transport when no enemies are in the room", () => {
      const us = mockInstanceOf<Creep>({
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
        pos: {
          x: 0,
          y: 0,
          findClosestByPath: () => null
        },
        move: () => OK,
        transfer: () => OK
      });

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
