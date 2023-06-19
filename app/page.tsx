"use client";

import { getBills, storeBills, Bill } from "@/utils/forms";
import HomePage from "../components/HomePage";
import { useState } from "react";
import { useAuth } from '@clerk/nextjs';

const Page = () => {
    const { userId } = useAuth();
    let [bills, setBills] = useState(getBills(userId));
  return (
    <HomePage
      forms={bills}
      setForms={(b: Bill[]) => {
        storeBills(userId, b);
        setBills(b);
      }}
    ></HomePage>
  );
};

export default Page;
