import { mockInstanceOf } from "screeps-jest";
import routineSoldier from "./routineSoldier";

const pathColor = "#ff3333";

describe("Soldier role", () => {
  describe("fighting", () => {
    it("should move to a weaker enemy", () => {
      const enemyWeak = mockInstanceOf<Creep>({
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
          find: () => [enemyWeak]
        },
        pos: {
          x: 0,
          y: 0,
          findClosestByPath: () => enemyWeak
        },
        moveTo: () => OK,
        say: () => OK,
        attack: () => ERR_NOT_IN_RANGE
      });
      routineSoldier(us);

      expect(us.moveTo).toHaveBeenCalledWith(enemyWeak, { visualizePathStyle: { stroke: pathColor } });
      expect(us.say).toHaveBeenCalledWith("⚔️ attack");
    });
  });
});
