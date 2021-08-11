import { TestUtil } from "utils/testUtils";
import findBestEnergySourcePos from "./energySource";
import { mapToObject } from "utils/mapHelper";
import { mockInstanceOf } from "screeps-jest";

describe("viable harvest position", () => {
  describe("run", () => {
    let testUtil: TestUtil;

    beforeEach(() => {
      testUtil = new TestUtil();
      Memory.blockedSourcePositions = mapToObject(new Map<string, Creep>());
    });

    it("check if the position is viable", () => {
      const source = mockInstanceOf<Source>({
        room: { name: "roomName" },
        pos: { x: 1, y: 2, look: [LOOK_CREEPS, LOOK_TERRAIN] }
      });
      const creep = testUtil.mockCreep({ room: { find: () => [source] } }, { findClosestByPath: () => source });
      findBestEnergySourcePos(creep);
    });
  });
});
