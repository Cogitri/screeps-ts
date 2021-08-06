export default function (spawn: StructureSpawn): void {
  const controllerLvl = spawn.room.controller?.level;
  if (controllerLvl && controllerLvl >= 2) {
    const room = spawn.room;
    const look = room.lookAt(spawn.pos);
    let checkSpawn = true;
    look.forEach(lookObject => {
      if (lookObject.type === LOOK_STRUCTURES && lookObject[LOOK_STRUCTURES]?.structureType === "rampart") {
        checkSpawn = false;
      }
    });
    if (checkSpawn) {
      room.createConstructionSite(spawn.pos, STRUCTURE_RAMPART);
    }
  }
}
