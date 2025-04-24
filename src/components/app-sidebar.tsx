import * as React from "react";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { APP_ROUTES, UI_LABELS } from "@/lib/routes";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  header: [
    {
      title: "Dashboard",
      url: APP_ROUTES.dashboard,
    },
  ],
  navMain: [
    {
      title: `${UI_LABELS.products} Management`,
      // url: APP_ROUTES.dashboard,
      items: [
        {
          title: UI_LABELS.categories,
          url: APP_ROUTES.categories,
        },
        {
          title: UI_LABELS.brands,
          url: APP_ROUTES.brands,
        },
        {
          title: UI_LABELS.products,
          url: APP_ROUTES.products,
        },
      ],
    },
    {
      title: `${UI_LABELS.customers} Management`,
      url: APP_ROUTES.customers,
      items: [
        {
          title: `${UI_LABELS.customers} List`,
          url: APP_ROUTES.customers,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <a href={data.header[0].url}>{data.header[0].title}</a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((childItem) => (
                  <SidebarMenuItem key={childItem.title}>
                    <SidebarMenuButton asChild isActive={childItem.isActive}>
                      <a href={childItem.url}>{childItem.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "Me",
            email: "hehe@gmail.com",
            avatar: "whocares",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
