
export interface Transaction {
  descricao: string;
  valor: number;
  categoria: string;
}

export interface AnalysisResult {
  transacoes: Transaction[];
  resumo: string;
}

export interface DebtScenario {
  nome: string;
  pagamentoMensal: number;
  tempoParaQuitarMeses: number;
  totalJurosPago: number;
}

export interface ChartDataPoint {
  month: number;
  [key: string]: number; // To accommodate multiple scenario balances
}

export type ExpenseCategory = 'Moradia' | 'Contas Fixas' | 'Alimentação' | 'Transporte' | 'Lazer' | 'Saúde' | 'Educação' | 'Outros' | 'Salário';

export interface MonthlyExpense {
    id: string;
    description: string;
    amount: number;
    category: ExpenseCategory;
    type: 'receita' | 'despesa';
    date: string;
}