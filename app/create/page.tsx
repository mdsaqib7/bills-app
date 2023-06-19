"use client"

import { addBill } from "@/utils/forms";
import Form from "../../components/Form";
import { useAuth } from '@clerk/nextjs';

function Page() {
    const { userId } = useAuth();
    return <Form onSubmit={(bill) => addBill(userId, bill)}></Form>
}

export default Page;