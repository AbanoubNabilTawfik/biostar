import { NavigationItem } from "src/@vex/interfaces/navigation-item.interface";

export const navigationItems: NavigationItem[] = [
  {
    type: "link",
    label: "Users",
    icon: null,
    // fontAwesome: "far fa-comment-dots item-icon",
    //permission: ['MCSPCompanyAdmin', 'McspCarrier'],
    route: "/users/list",
  },
  {
    type: "link",
    label: "Print Options",
    icon: null,
    // fontAwesome: "far fa-comment-dots item-icon",
    //permission: ['MCSPCompanyAdmin', 'McspCarrier'],
    route: "/print-options/list",
  },
  {
    type: "link",
    label: "New User",
    icon: null,
    // fontAwesome: "far fa-comment-dots item-icon",
    //permission: ['MCSPCompanyAdmin', 'McspCarrier'],
    route: "/auth/register",
  },

  ]; 