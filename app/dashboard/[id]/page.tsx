"use client";
import axios from "axios";

import { useEffect, useState } from "react";

interface Params {
  params: {
    id: string;
  };
}
interface User {
  id: string;
  Sname: string;
  gender: string;
  fatherName: string;
  fatherContact: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  course: string;
  completed: boolean;
  batch: string;
  profilePic: string;
  created: string;
  remainingFees: number;
}

import { useRecoilState } from "recoil";
import { sId } from "@/components/recoil-root";

export default function Page() {
  const [id, setId] = useRecoilState(sId);
  const [user, setUser] = useState<User>({
    id: "",
    Sname: "",
    gender: "NONE",
    fatherName: "",
    fatherContact: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    course: "",
    completed: false,
    batch: "",
    profilePic: "",
    created: "",
    remainingFees: 0,
  });
  const [attendence, setAttendence] = useState([
    {
      id: "",
      Sname: "",
      date: new Date(),
      presentF: 0,
      presentS: 0,
      onLeave: 0,
      inTime: "",
      outTime: "",
      reason: "",
      holiday: 0,
    },
  ]);
  const [error, setError] = useState("");

  // get id from local storage and match it with the input
  async function getInfo() {
    var token = id;
    if (token === id) {
      try {
        var result = await axios.post("/api/get-info", { id: id });
        console.log("data : ", result.data);
        setUser(result.data);

        var attendence = await axios.post("/api/get-attendence", { id: id });
        console.log("attendence : ", attendence.data);
        setAttendence(attendence.data);
      } catch (error) {
        console.error("Error retrieving user info:", error);
        setError("Error retrieving user info");
      }
    } else {
      // console.log("Unauthorized");
      if (typeof window !== "undefined") {
        // router.push("/");
        window.location.href = "/"; // Redirect using window.location.href

        setError("Unauthorized");
      }
    }
  }

  if (id) {
    console.log("Authorized");
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      {error === "Unauthorized" ? (
        <div>Unauthorized</div>
      ) : (
        <div className="">
          <div className=" mt-10">
            <div className="text-3xl">Welcome Back, {user.Sname}!</div>
          </div>
          <div className="mt-20">
            <div className="bg-[#3E477B] text-white p-4 mb-4">
              Basic Information
            </div>
            <div className="flex flex-col  gap-2 pl-2">
              <div className="">Student Id : {user.id}</div>
              <div>Name : {user.Sname}</div>
              <div>Gender : {user.gender}</div>
              <div>Father Name: {user.fatherName}</div>
              <div>Email : {user.email}</div>
              <div>Course : {user.course}</div>
              <div>Batch : {user.batch}</div>
              <div>
                Reamaining Fee :{" "}
                {user.remainingFees == null ? "All Paid" : user.remainingFees}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="bg-[#3E477B] text-white p-4 mb-4">
              Contact Information
            </div>
            <div className="flex flex-col gap-2  pl-2">
              <div className="">Phone No. : {user.phone}</div>
              <div>Father Ph.No. : {user.fatherContact}</div>
              <div>Email : {user.email}</div>
              <div>Phone : {user.phone}</div>
              <div>Address : {user.address}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
