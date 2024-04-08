"use client";
import { sId } from "@/components/recoil-root";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface AttendanceData {
  id: string;
  date: string; // Assuming date is a string, adjust accordingly
  present: number;
  onLeave: number;
  inTime: string;
  outTime: string;
  reason: string;
  holiday: number;
}
function Attendance() {
  const [attendance, setAttendance] = useState<AttendanceData[]>([]);

  const [id, setId] = useRecoilState(sId);

  useEffect(() => {
    getInfo();
    if (!id) {
      window.location.href = "/"; // Redirect using window.location.href
    }
  }, []);

  async function getInfo() {
    try {
      const result = await axios.post("/api/get-attendence", { id });
      setAttendance(result.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  }

  return (
    <div className="xl:px-5">
      <Table>
        <TableCaption>All Attendance.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead>InTime</TableHead>
            <TableHead>OutTime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendance.length === 0 ? (
            <TableRow>
              <TableCell>No Attendance</TableCell>
              <TableCell>No Attendance</TableCell>
              <TableCell>No Attendance</TableCell>
            </TableRow>
          ) : (
            attendance.map((day) => (
              <TableRow key={day.date}>
                <TableCell>
                  {new Date(day.date).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                {day.holiday === 1 ? (
                  <TableCell>Holiday</TableCell>
                ) : day.onLeave === 1 ? (
                  <>
                    <TableCell>OnLeave</TableCell>
                    <TableCell>Reason: {day.reason}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{day.present ? "Present" : "Absent"}</TableCell>
                    <TableCell>{day.inTime}</TableCell>
                    <TableCell>{day.outTime}</TableCell>
                  </>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Attendance;
