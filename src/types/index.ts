export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  status: 'paid' | 'pending';
  dueDate?: string;
  notes?: string;
}

export interface TelegramConfig {
  botToken: string;
  chatId: string;
  enabled: boolean;
}

export interface SupabaseConfig {
  url: string;
  apiKey: string;
}

export interface AppConfig {
  telegram: TelegramConfig;
  supabase: SupabaseConfig;
}

export interface AppState {
  transactions: Transaction[];
  config: AppConfig;
}