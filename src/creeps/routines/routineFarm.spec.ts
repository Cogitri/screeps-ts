import { TestUtil } from "utils/testUtils";
import { mockInstanceOf } from "screeps-jest";
import routineFarm from "./routineFarm";

const source1 = mockInstanceOf<Source>({ id: "source1" as Id<Source> });
const source2 = mockInstanceOf<Source>({ id: "source2" as Id<Source> });

describe("Farming role", () => {
  let testUtil: TestUtil;

  beforeEach(() => {
    testUtil = new TestUtil();
  });

  describe("run", () => {
    it("harvests the first source", () => {
      const creep = testUtil.mockCreep(undefined, { find: () => [source1, source2] });

      routineFarm(creep);
      expect(creep.harvest).toHaveBeenCalledWith(source1);
      expect(creep.say).toHaveBeenCalledWith("⛏️");
    });
  });
});
