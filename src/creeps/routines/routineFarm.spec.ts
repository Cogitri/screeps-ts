import { mockInstanceOf } from "screeps-jest";
import routineFarm from "./routineFarm";

const source1 = mockInstanceOf<Source>({ id: "source1" as Id<Source> });
const source2 = mockInstanceOf<Source>({ id: "source2" as Id<Source> });

describe("Farming role", () => {
  describe("run", () => {
    it("harvests the first source", () => {
      const creep = mockInstanceOf<Creep>({
        store: { getFreeCapacity: () => 50 },
        room: { find: () => [source1, source2] },
        harvest: () => OK,
        say: () => OK,
        memory: { target: null }
      });

      routineFarm(creep);
      expect(creep.harvest).toHaveBeenCalledWith(source1);
      expect(creep.say).toHaveBeenCalledWith("⛏️");
    });
  });
});
