/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { mockGlobal, mockInstanceOf } from "screeps-jest";

// cp from lib lel :)
// eslint-disable-next-line @typescript-eslint/ban-types
type DeepPartialObject<T extends object> = {
  [P in keyof T]?: DeepPartial<T[P]>;
} & { [key: string]: any };

type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends AnyObj
  ? T extends boolean
    ? boolean // \
    : T extends number
    ? number //   > No type assertion needed to mock a tagged primitive
    : T extends string
    ? string // /
    : DeepPartialObject<T>
  : T;

type AnyObj = Record<string, any>;
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

  public mockSpawn(extraOpts: DeepPartialObject<StructureSpawn> | undefined = undefined): StructureSpawn {
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
    extraOpts: DeepPartialObject<Creep> | undefined = undefined,
    posOpts: DeepPartialObject<RoomPosition> | undefined = undefined
  ): Creep {
    return mockInstanceOf<Creep>({
      store: { getFreeCapacity: () => 0, energy: 50 },
      memory: { lockTask: false, working: false },
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

  public mockPowerCreep(
    extraOpts: DeepPartialObject<PowerCreep> | undefined = undefined,
    posOpts: DeepPartialObject<RoomPosition> | undefined = undefined
  ): PowerCreep {
    return mockInstanceOf<PowerCreep>({
      body: undefined,
      store: { getFreeCapacity: () => 0, energy: 50 },
      memory: { lockTask: false, working: false },
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
