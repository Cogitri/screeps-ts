import { Bar, Dashboard, Grid, Rectangle, Widget } from "screeps-viz";
import globalConsts, { CreepRoles } from "utils/globalConsts";

/**
 * Creates the dashboard for showing the current amount of creeps fromm every role.
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
        barWidget = createABar(CreepRoles.ROLE_BUILDER, "255, 255, 51");
        break;
      case 1:
        barWidget = createABar(CreepRoles.ROLE_HARVESTER, "255, 196, 0");
        break;
      case 2:
        barWidget = createABar(CreepRoles.ROLE_REPAIRER, "255, 255, 51");
        break;
      case 3:
        barWidget = createABar(CreepRoles.ROLE_SOLDIER, "255, 0, 0");
        break;
      case 4:
        barWidget = createABar(CreepRoles.ROLE_TRANSPORTER, "51, 214, 255");
        break;
      case 5:
        barWidget = createABar(CreepRoles.ROLE_UPGRADER, "0, 230, 0");
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
