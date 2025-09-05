"use client";

import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import logo from "../../public/limiLogo.webp";
import {
  Boxes,
  Building2,
  ChevronDown,
  ChevronRight,

  LayoutGrid,
  LayoutList,
  LogOut,
  MonitorPlay,
  ScanSearch,
  Slack,
  Truck,
  User,
  UserSquare2,
  Users2,
  Warehouse,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

interface SidebarLink {
  title: string;
  icon: React.ComponentType<any>;
  href: string;
}

export default function Sidebar({ showSidebar, setShowSidebar }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const sidebarLinks: SidebarLink[] = [
    { title: "Customers", icon: Users2, href: "/dashboard/customers" },
    { title: "Markets", icon: Warehouse, href: "/dashboard/markets" },
    { title: "Farmers", icon: UserSquare2, href: "/dashboard/farmers" },
    { title: "Orders", icon: Truck, href: "/dashboard/orders" },
    { title: "Sales", icon: Truck, href: "/dashboard/sales" },
    { title: "Staff", icon: User, href: "/dashboard/staff" },
    { title: "Community", icon: Building2, href: "/dashboard/community" },
    { title: "Profile", icon: Truck, href: "/dashboard/profile" },
  ];

  const catalogueLinks: SidebarLink[] = [
    { title: "Products", icon: Boxes, href: "/dashboard/products" },
    { title: "Categories", icon: LayoutList, href: "/dashboard/categories" },
    { title: "Coupons", icon: ScanSearch, href: "/dashboard/coupons" },
    { title: "Store Banners", icon: MonitorPlay, href: "/dashboard/banners" },
    { title: "Sub-Categories", icon: LayoutList, href: "/dashboard/subcategories" },
  ];

  async function handleLogout() {
    await signOut();
    router.push("/");
  }

  return (
    <div
      className={`${
        showSidebar ? "sm:block" : "hidden sm:block"
      } mt-20 sm:mt-0 dark:bg-slate-800 bg-white space-y-6 w-64 h-screen text-slate-800 dark:text-slate-300 fixed left-0 top-0 shadow-md overflow-y-scroll`}
    >
      <Link onClick={() => setShowSidebar(false)} className="px-6 py-4" href="/dashboard">
        <Image src={logo} alt="limifood logo" className="w-36" />
      </Link>

      <div className="space-y-3 flex flex-col">
        <Link
          onClick={() => setShowSidebar(false)}
          href="/dashboard"
          className={`flex items-center space-x-3 px-6 py-2 ${
            pathname === "/dashboard" ? "border-l-8 border-lime-500 text-lime-500" : ""
          }`}
        >
          <LayoutGrid />
          <span>Dashboard</span>
        </Link>

        {catalogueLinks.length > 0 && (
          <Collapsible className="px-6">
            <CollapsibleTrigger
              className="flex items-center justify-between py-2 w-full"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <div className="flex items-center space-x-3">
                <Slack />
                <span>Catalogue</span>
              </div>
              {openMenu ? <ChevronDown /> : <ChevronRight />}
            </CollapsibleTrigger>

            <CollapsibleContent className="rounded-lg py-3 px-3 pl-6 dark:bg-slate-800 dark:text-slate-300">
              {catalogueLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    onClick={() => setShowSidebar(false)}
                    href={item.href}
                    className={`flex items-center space-x-3 py-1 text-sm ${
                      pathname === item.href ? "text-lime-500" : ""
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        )}

        {sidebarLinks.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              key={i}
              onClick={() => setShowSidebar(false)}
              href={item.href}
              className={`flex items-center space-x-3 px-6 py-2 ${
                pathname === item.href ? "border-l-8 border-lime-500 text-lime-500" : ""
              }`}
            >
              <Icon />
              <span>{item.title}</span>
            </Link>
          );
        })}

        <div className="px-6 py-2">
          <button
            onClick={handleLogout}
            className="bg-lime-600 rounded-md flex items-center space-x-3 px-6 py-3"
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
