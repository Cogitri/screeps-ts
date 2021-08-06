/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { mockGlobal, mockInstanceOf } from "screeps-jest";
import { Position } from "source-map";

export class TestUtil {
  public constructor() {
    mockGlobal<Game>("Game", {
      creeps: {},
      rooms: {},
      time: 1
    });

    mockGlobal<PathFinder>("PathFinder", {
      search: () => OK
    });
  }

  public mockSpawn(extraOpts: Partial<StructureSpawn> | undefined = undefined): StructureSpawn {
    return mockInstanceOf<StructureSpawn>({
      spawnCreep: (body: BodyPartConstant[], name: string, opts?: SpawnOptions | undefined) => {
        Game.creeps[name] = mockInstanceOf<Creep>({
          name,
          memory: opts?.memory
        });
        return OK;
      },
      room: {
        name: "test"
      },
      extraOpts
    });
  }

  public mockCreep(
    extraOpts: Partial<Creep> | undefined = undefined,
    roomOpts: Partial<Room> | undefined = undefined,
    posOpts: Partial<RoomPosition> | undefined = undefined
  ): Creep {
    return mockInstanceOf<Creep>({
      store: { getFreeCapacity: () => 0, energy: 50 },
      room: roomOpts,
      memory: { isWorking: false, announceTask: false },
      transfer: () => OK,
      harvest: () => OK,
      say: () => OK,
      pos: {
        findClosestByPath: () => {
          return mockInstanceOf<StructureContainer>({
            pos: { x: 0, y: 0 }
          });
        },
        x: 0,
        y: 0,

        ...posOpts
      },
      ...extraOpts
    });
  }
}
