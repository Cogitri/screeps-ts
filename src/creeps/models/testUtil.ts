import { mockGlobal, mockInstanceOf } from "screeps-jest";

export function testInit(): StructureSpawn {
  mockGlobal<Game>("Game", {
    creeps: {},
    rooms: {},
    time: 1
  });
  return mockInstanceOf<StructureSpawn>({
    spawnCreep: (body: BodyPartConstant[], name: string, opts?: SpawnOptions | undefined) => {
      Game.creeps[name] = mockInstanceOf<Creep>({
        name,
        memory: opts?.memory
      });
      return OK;
    }
  });
}
