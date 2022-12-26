import { Route } from "@angular/router";
import { AuthRole } from "./AuthRole";

export interface myRoute extends Route {
  ACL?: AuthRole[];
  children?: myRoute[];
}
