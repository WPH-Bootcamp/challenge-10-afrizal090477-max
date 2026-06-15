export interface BankConfig {
  id: string;
  name: string;
  fallback: string;
}

export const BANKS: BankConfig[] = [
  { id: "BNI", name: "Bank Negara Indonesia", fallback: "BNI" },
  { id: "BRI", name: "Bank Rakyat Indonesia", fallback: "BRI" },
  { id: "BCA", name: "Bank Central Asia", fallback: "BCA" },
  { id: "Mandiri", name: "Mandiri", fallback: "MDR" },
];