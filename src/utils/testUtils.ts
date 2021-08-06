/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { mockGlobal, mockInstanceOf } from "screeps-jest";

// cp from lib lel :)
// Needed as we must pass `DeepPartialObject<T>` as a type but can't import it
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

/**
 * Class to help with mocking
 *
 * How to:
 * call `let testUtil; beforeEach(() => testUtil = new TestUtil());` in the most upper `describe` block of the test
 */
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

  /**
   * Used to mock the Spawn structure
   *
   * Refer to function implementation for defaults
   *
   * @param {DeepPartialObject<StructureSpawn>} extraOpts Object of all options that apply to the default `mockInstanceOf<Spawn>()` object aswell
   * @returns The mocked Spawn
   */
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

  /**
   * Helper function to mock default Creep instances
   *
   * Refer to function implementation for defaults
   *
   * @param {DeepPartialObject<Creep>} extraOpts Object of all options that apply to the default `mockInstanceOf<Creep>()` object aswell, **expect pos**
   * @param {DeepPartialObject<RoomPosition>} posOpts Object that defines the `pos` object of the creep
   * @returns The mocked Creep
   */
  public mockCreep(
    extraOpts: DeepPartialObject<Creep> | undefined = undefined,
    posOpts: DeepPartialObject<RoomPosition> | undefined = undefined
  ): Creep {
    return mockInstanceOf<Creep>({
      store: { getFreeCapacity: () => 0, energy: 50 },
      memory: { lockTask: false, working: false },
      room: undefined,
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

  /**
   * Helper function to mock PowerCreeps instances
   *
   * Refer to function implementation for defaults
   *
   * @param {DeepPartialObject<PowerCreep>} extraOpts Object of all options that apply to the default `mockInstanceOf<PowerCreep>()` object aswell, **expect pos**
   * @param {DeepPartialObject<RoomPosition>} posOpts Object that defines the `pos` object of the creep
   * @returns The mocked PowerCreep
   */
  public mockPowerCreep(
    extraOpts: DeepPartialObject<PowerCreep> | undefined = undefined,
    posOpts: DeepPartialObject<RoomPosition> | undefined = undefined
  ): PowerCreep {
    return mockInstanceOf<PowerCreep>({
      body: undefined,
      store: { getFreeCapacity: () => 0, energy: 50 },
      room: undefined,
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
