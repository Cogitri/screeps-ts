import { visualizeDashboardCreepsRoles } from "utils/dashboards/dashboardCreepRoles";
import { visualizeDashboardEnergySources } from "utils/dashboards/dashboardEnergySources";
import { visualizeDashboardLegend } from "utils/dashboards/dashboardLegend";

/**
 * Visualizes dashboards if global dashboards variable is true.
 * @param room {@link https://docs.screeps.com/api/#Room|Room}
 */
export function visualizeDashboards(room: Room): void {
  if (global.dashboards) {
    visualizeDashboardCreepsRoles();
    visualizeDashboardLegend();
    visualizeDashboardEnergySources(room);
  }
}
