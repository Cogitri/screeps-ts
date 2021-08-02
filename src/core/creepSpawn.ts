export default function (spawn: StructureSpawn): void {
  // Spawn a creep if there is none
  var creepNumber = 0;
  if (!spawn.room.find(FIND_MY_CREEPS).length) {
    // TODO: Implement defined standard creep body (Issue 4)

    // assigning unique name (Issue 5)
    var creepName = 'Creep' + creepNumber;
    creepNumber++;

    const basicCreepBody = [WORK,CARRY,MOVE];
    spawn.spawnCreep(basicCreepBody, creepName,
      {memory: {role: 'creep', room:'', working:true}});

    return;
  }

}
