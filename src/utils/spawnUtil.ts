import { CreepRoles } from "./globalConsts";

export default function (role: CreepRoles, bodyParts: BodyPartConstant[], spawn: StructureSpawn): void {
  const name = `${role}${Game.time}${Math.trunc(Math.random() * 100)}`;
  spawn.spawnCreep(bodyParts, name, {
    memory: { role, room: spawn.room.name, working: false, lockTask: false, target: null, currentTask: "none" }
  });
}
