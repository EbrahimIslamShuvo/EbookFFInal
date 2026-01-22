
export interface IPaymentData {
  total_amount: number;
  currency: string;
  tran_id: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  cus_email: string;
  cus_name?: string;
  cus_addr1?: string;
  cus_city?: string;
  cus_postcode?: string;
  cus_country?: string;
  cus_phone?: string;
}

export interface IPaymentInit {
  amount: number;
  bookIds: string[];
  userId: string;
}

export interface ITransactionRecord {
  userId: string;
  bookIds: string[];
  amount: number;
  transactionId: string;
  status: "pending" | "success" | "failed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

