import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export function RecoilRootComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export const sId = atom({
  key: "sId", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
