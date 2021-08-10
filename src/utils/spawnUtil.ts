import { CreepRoles } from "./globalConsts";

export default function (role: CreepRoles, bodyParts: BodyPartConstant[], spawn: StructureSpawn): number {
  const name = `${role}${Game.time}${Math.trunc(Math.random() * 100)}`;
  return spawn.spawnCreep(bodyParts, name, {
    memory: { role, room: spawn.room.name, isWorking: false, announcedTask: false, target: null, currentTask: "none" }
  });
}
