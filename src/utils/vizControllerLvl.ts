export function visualizeControllerProgress(controller: StructureController) :void {
    const roomController = controller;
    const x_Coordinate = roomController.pos.x;
    const y_Coordinate = roomController.pos.y;
    const totalToUpgrade = roomController.progress + roomController.progressTotal; 

    new RoomVisual().text(`${(roomController.progress / totalToUpgrade * 100).toFixed(2)}% to next Level`, x_Coordinate, y_Coordinate, {color: 'white', font: 0.8});
}
