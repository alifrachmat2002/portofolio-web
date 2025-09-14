"use client"
import * as React from "react"

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
} from "@/components/ui/sidebar"
import { GalleryVerticalEnd } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Contents",
      url: "/admin",
      items: [
        {
          title: "Tech Stack",
          url: "/admin/techstacks",
        },
        {
          title: "Projects",
          url: "/admin/projects",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async() => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        }
      }
    });
  }
  

  return (
      <Sidebar {...props}>
          <SidebarHeader>
              <SidebarMenu>
                  <SidebarMenuItem>
                      <SidebarMenuButton
                          size="lg"
                          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                          onClick={() => router.push("/")}
                      >
                          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                              <GalleryVerticalEnd className="size-4" />
                          </div>
                          <div className="flex flex-col gap-0.5 leading-none">
                              <span className="font-semibold">
                                  Back to Home
                              </span>
                          </div>
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
                              {item.items.map((item) => (
                                  <SidebarMenuItem key={item.title}>
                                      <SidebarMenuButton
                                          asChild
                                          isActive={pathname == item.url}
                                      >
                                          <a href={item.url}>{item.title}</a>
                                      </SidebarMenuButton>
                                  </SidebarMenuItem>
                              ))}
                          </SidebarMenu>
                      </SidebarGroupContent>
                  </SidebarGroup>
              ))}
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={signOut}>
                  Sign Out
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
      </Sidebar>
  );
}
