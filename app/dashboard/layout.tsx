"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRecoilState } from "recoil";
import { sId } from "@/components/recoil-root";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const menuItems = [
  {
    name: "Dashboard",
    route: "/dashboard",
  },
  {
    name: "Attendance",
    route: "/dashboard/attendance",
  },
  {
    name: "Test",
    route: "/dashboard/test",
  },
  {
    name: "Topics",
    route: "/dashboard/topics",
  },
];

function DsLayout({ children }: { children: React.ReactNode }) {
  const [id, setId] = useRecoilState(sId);

  const pathname = usePathname();

  return (
    <>
      <div className="flex">
        <div className="bg-[#111827] xl:w-[17vw] w-0 h-[100vh] text-[#D1D5DB] ">
          <div className="pl-10 pt-5">
            {/* <Image src="/tcc-logo.png" alt="logo" width={50} height={50} /> */}
            {/* Logo */}
          </div>
          <div className="h-[1px] bg-[#1F2937] w-[17vw] mt-10"></div>
          {/* <NavBar /> */}
          <div className="mt-10 flex flex-col px-4">
            {menuItems.map((item) => {
              return (
                <Link
                  key={item.name}
                  href={item.route}
                  className={
                    pathname === `${item.route}`
                      ? "bg-[#242A38] py-2 px-4 mb-2 text-[#12B981] rounded-sm"
                      : "py-2 px-4 rounded-sm mb-2"
                  }
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col bg-[#F9FAFC]">
          <div className="bg-white lg:w-[83vw] w-[100vw] flex justify-between lg:px-6 pr-6  pl-2 py-3">
            <div className="flex gap-4 items-center">
              <div className="cursor-pointer lg:hidden block">
                {/* <ResNavBar /> */}
                <Dialog>
                  <DialogTrigger>
                    <Menu size={28} />
                  </DialogTrigger>

                  <DialogContent className="bg-[#111827] text-[#D1D5DB] outline-none border-none ">
                    <div className="mt-10 flex flex-col px-4">
                      {menuItems.map((item) => {
                        return (
                          <DialogClose asChild key={item.name}>
                            <Link
                              key={item.name}
                              href={item.route}
                              className={
                                pathname === `${item.route}`
                                  ? "bg-[#242A38] py-2 px-4 mb-2 text-[#12B981] rounded-sm"
                                  : "py-2 px-4 rounded-sm mb-2"
                              }
                            >
                              {item.name}
                            </Link>
                          </DialogClose>
                        );
                      })}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="text-lg mt-[-9px]">
                <Image src="/TCC_PNG.png" alt="logo" width={50} height={50} />
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      setId("");
                      window.location.href = "/"; // Redirect using window.location.href

                      // router.push("/");
                      console.log("removed out");
                    }}
                  >
                    LogOut
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}

export default DsLayout;
