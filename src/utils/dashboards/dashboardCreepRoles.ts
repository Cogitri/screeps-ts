import { Bar, Dashboard, Grid, Rectangle, Widget } from "screeps-viz";
import globalConsts, { CreepRoles, PathColors } from "utils/globalConsts";

/**
 * Creates the dashboard for showing the current amount of creeps from every role.
 */
export function visualizeDashboardCreepsRoles(): void {
  const amountOfRoles = Object.keys(CreepRoles).length;

  const dataTest: Widget[] = [];

  // Bar-template
  let barWidget: Widget = Bar(() => ({
    data: { value: 0, maxValue: 0 },
    config: {
      style: {
        fill: "",
        stroke: ""
      }
    }
  }));

  for (let i = 0; i < amountOfRoles; i++) {
    switch (i % amountOfRoles) {
      case 0:
        barWidget = createABar(CreepRoles.ROLE_BUILDER, hexStringToDecString(PathColors.PATHCOLOR_BUILDER));
        break;
      case 1:
        barWidget = createABar(CreepRoles.ROLE_HARVESTER, hexStringToDecString(PathColors.PATHCOLOR_HARVESTER));
        break;
      case 2:
        barWidget = createABar(CreepRoles.ROLE_REPAIRER, hexStringToDecString(PathColors.PATHCOLOR_REPAIRER));
        break;
      case 3:
        barWidget = createABar(CreepRoles.ROLE_SOLDIER, hexStringToDecString(PathColors.PATHCOLOR_SOLDIER));
        break;
      case 4:
        barWidget = createABar(CreepRoles.ROLE_TRANSPORTER, hexStringToDecString(PathColors.PATHCOLOR_TRANSPORTER));
        break;
      case 5:
        barWidget = createABar(CreepRoles.ROLE_UPGRADER, hexStringToDecString(PathColors.PATHCOLOR_UPGRADE));
        break;
    }
    dataTest.push(barWidget);
  }

  Dashboard({
    widgets: [
      {
        pos: {
          x: 0.5,
          y: 1
        },
        width: 3.45 * dataTest.length,
        height: 7.5,
        widget: Rectangle({
          data: Grid({
            data: dataTest,
            config: { columns: amountOfRoles, rows: 1 }
          })
        })
      }
    ]
  });
}

/**
 * Creates a bar from the information of the associated creeps role.
 *
 * @param role The role that the inforamtion come from
 * @param color The r-, b- and g-values of the color as string
 * @returns Bar with information about associated roles
 */
function createABar(role: CreepRoles, color: string): Widget {
  let creepCount = new Map(Object.entries(Memory.creepCount));

  if (!creepCount.size) {
    creepCount = globalConsts.DEFAULT_CREEP_COUNT;
  }

  const amountOf = _.filter(Game.creeps, creep => creep.memory.role === role);

  const opacityFill = ", 0.3)";
  const opacityStroke = ", 0.7)";
  const colorString = "rgba(" + color;

  const barWidgetPrototype = Bar(() => ({
    data: { value: amountOf.length, maxValue: creepCount.get(role) },
    config: {
      label: role,
      style: {
        fill: colorString + opacityFill,
        stroke: colorString + opacityStroke
      }
    }
  }));
  return barWidgetPrototype;
}

/**
 * Converts a hex string to a rgb-string.
 *
 * @param hexString The hex string that should be converted to an r,g,b-string.
 * @returns A string containing the r-, g- and b-value of the inserted hex-string.
 */
function hexStringToDecString(hexString: string): string {
  hexString = hexString.slice(1, 7);

  const r = parseInt(hexString.slice(0, 2), 16);
  const g = parseInt(hexString.slice(2, 4), 16);
  const b = parseInt(hexString.slice(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}
