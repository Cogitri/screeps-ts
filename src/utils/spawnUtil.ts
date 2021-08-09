import globalConsts, { CreepRoles, Routines } from "./globalConsts";

export default function (role: CreepRoles, spawn: StructureSpawn): number {
  let body: BodyPartConstant[] = globalConsts.DEFAULT_BODYPARTS.get(CreepRoles.ROLE_BUILDER) as BodyPartConstant[];
  const map = new Map(Object.entries(Memory.roleBodyParts));
  if (map.size) {
    body = map.get(CreepRoles.ROLE_BUILDER) as BodyPartConstant[];
  }

  const name = `${role}${Game.time}${Math.trunc(Math.random() * 100)}`;
  return spawn.spawnCreep(body, name, {
    memory: {
      role,
      room: spawn.room.name,
      isWorking: false,
      announcedTask: false,
      target: null,
      currentTask: Routines.None
    }
  });
}
