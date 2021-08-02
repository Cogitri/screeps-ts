export default function (spawn: StructureSpawn): void {
  // Spawn a creep if there is none
  var creepNumber = 0;
  if (!spawn.room.find(FIND_MY_CREEPS).length) {


    const creepBasicBody = [MOVE];
     var creepName = 'Creep' + creepNumber;
     creepNumber++;

     spawn.spawnCreep([WORK,CARRY,MOVE], creepName,
       {memory: {role: 'creep', room:'', working:true}});
    return;
  }

}
