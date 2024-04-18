"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { course, sId } from "@/components/recoil-root";
import { useRecoilState } from "recoil";

interface Topic {
  id: number;
  topic: string;
  subtopic: string;
  date: string;
  content: string;
  faculty: string;
}

function Topic() {
  const [id] = useRecoilState(sId);
  const [courses, setCourses] = useState<Topic[]>([]); // Provide default empty array
  const [sCourse] = useRecoilState(course);

  useEffect(() => {
    if (!id) {
      window.location.href = "/"; // Redirect using window.location.href
    }
    getTests();
  }, []);

  async function getTests() {
    try {
      const result = await axios.post("/api/get-topic", { sCourse });
      // console.log("Tests: ", result.data);
      setCourses(result.data);
      console.log("course", sCourse);
    } catch (error) {
      console.error("Error fetching tests: ", error);
    }
  }

  return (
    <div className="xl:px-5">
      <Table>
        <TableCaption>All Topics</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Subtopic</TableHead>
            <TableHead>Faculty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Data
              </TableCell>
              {/* <TableCell>No Test</TableCell>
              <TableCell>No Test</TableCell>
              <TableCell>No Test</TableCell> */}
            </TableRow>
          ) : (
            courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  {new Date(course.date).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                </TableCell>
                <TableCell>{course.topic}</TableCell>
                <TableCell>{course.subtopic}</TableCell>
                <TableCell>{course.faculty}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Topic;
