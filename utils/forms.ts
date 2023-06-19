export interface Bill {
  patientName: string;
  address: string;
  hospitalName: string;
  dateOfService: string;
  billAmount: number;
  picture?: string;
}

function getBills(userId: string | null | undefined): Bill[] {
  const data = localStorage.getItem(`bills-${userId}`);
  console.log(data);
  if (!data) return [];

  return JSON.parse(data);
}

export function storeBills(userId: string | null | undefined, bills: Bill[]) {
  localStorage.setItem(`bills-${userId}`, JSON.stringify(bills));
}

function addBill(userId: string | null | undefined, bill: Bill) {
  storeBills(userId, [...getBills(userId), bill]);
}

export { getBills, addBill };
