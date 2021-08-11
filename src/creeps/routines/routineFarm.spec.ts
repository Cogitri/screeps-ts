import { TestUtil } from "utils/testUtils";
import { mockInstanceOf } from "screeps-jest";
import routineFarm from "./routineFarm";

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

describe("Farming role", () => {
  let testUtil: TestUtil;

  beforeEach(() => {
    testUtil = new TestUtil();
  });

  describe("run", () => {
    it("harvests the first source", () => {
      const creep = testUtil.mockCreep(
        {
          harvest: () => ERR_NOT_IN_RANGE,
          moveTo: () => OK,
          room: { find: () => [source1, source2] }
        },
        { findClosestByPath: () => source1 }
      );

      routineFarm(creep);
      expect(creep.harvest).toHaveBeenCalledWith(source1);
      expect(creep.say).toHaveBeenCalledWith("⛏️");
    });
  });
});
