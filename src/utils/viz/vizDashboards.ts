import { visualizeDashboardCreepsRoles } from "utils/dashboards/dashboardCreepRoles";
import { visualizeDashboardEnergySources } from "utils/dashboards/dashboardEnergySources";
import { visualizeDashboardLegend } from "utils/dashboards/dashboardLegend";

export function visualizeDashboards(room: Room): void {
  if (global.dashboards) {
    visualizeDashboardCreepsRoles();
    visualizeDashboardLegend();
    visualizeDashboardEnergySources(room);
  }
}
