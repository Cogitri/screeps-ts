import { mockInstanceOf } from "screeps-jest";
import routineSoldier from "./routineSoldier";

const pathColor = "#ff3333";

describe("Soldier role", () => {
  describe("fighting", () => {
    it("should move to a weaker enemy", () => {
      const enemy = mockInstanceOf<Creep>({
        my: false,
        hits: 1,
        body: [
          {
            type: "attack",
            hits: 100
          },

          {
            type: "tough",
            hits: 100
          }
        ],
        pos: {
          x: 100,
          y: 100
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getActiveBodyparts: () => 5
      });

      const us = mockInstanceOf<Creep>({
        body: [
          {
            type: "attack",
            hits: 100
          },
          {
            type: "tough",
            hits: 100
          }
        ],
        hits: 10,
        getActiveBodyparts: () => 10,
        memory: { role: "soldier", working: false },
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
    it("should *not* move to a stronger enemy", () => {
      const enemy = mockInstanceOf<Creep>({
        my: false,
        hits: 1000,
        body: [
          {
            type: "attack",
            hits: 100
          },

          {
            type: "tough",
            hits: 100
          }
        ],
        pos: {
          x: 100,
          y: 100
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getActiveBodyparts: () => 25
      });

      const us = mockInstanceOf<Creep>({
        body: [
          {
            type: "attack",
            hits: 100
          },
          {
            type: "tough",
            hits: 100
          }
        ],
        hits: 10,
        getActiveBodyparts: () => 10,
        memory: { role: "soldier", working: false },
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
    it("should treat PowerCreeps differently", () => {
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
        body: [
          {
            type: "attack",
            hits: 100
          },
          {
            type: "tough",
            hits: 100
          }
        ],
        hits: 10,
        getActiveBodyparts: () => 10,
        memory: { role: "soldier", working: false },
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
  });
  // describe("idling", () => {});
});
