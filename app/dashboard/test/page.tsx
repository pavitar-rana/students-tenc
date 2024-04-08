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

import { sId } from "@/components/recoil-root";
import { useRecoilState } from "recoil";

interface Test {
  id: string;
  date: string; // Assuming date is a string, adjust accordingly
  topic: string;
  present: number;
  totalMarks: string; // Assuming totalMarks is a string, adjust accordingly
  obtainedMarks: string; // Assuming obtainedMarks is a string, adjust accordingly
}

function Test() {
  const [id] = useRecoilState(sId);
  const [tests, setTests] = useState<Test[]>([]); // Provide default empty array

  useEffect(() => {
    if (!id) {
      window.location.href = "/"; // Redirect using window.location.href
    }
    getTests();
  }, []);

  async function getTests() {
    try {
      const result = await axios.post("/api/get-test", { id });
      console.log("Tests: ", result.data);
      setTests(result.data);
    } catch (error) {
      console.error("Error fetching tests: ", error);
    }
  }

  return (
    <div className="xl:px-5">
      <Table>
        <TableCaption>All Tests</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Test</TableHead>
            <TableHead>Total Marks</TableHead>
            <TableHead>Obtained Marks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.length === 0 ? (
            <TableRow>
              <TableCell>No Test</TableCell>
              <TableCell>No Test</TableCell>
              <TableCell>No Test</TableCell>
              <TableCell>No Test</TableCell>
            </TableRow>
          ) : (
            tests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>
                  {new Date(test.date).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                </TableCell>
                <TableCell>{test.topic}</TableCell>
                <TableCell>{test.totalMarks}</TableCell>
                <TableCell>{test.obtainedMarks}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Test;
