import { SalesService } from './salesService';
import { loadCSV } from '../utils/csvLoader';

let salesServiceInstance: SalesService | null = null;

export const getSalesService = async (): Promise<SalesService> => {
  if (!salesServiceInstance) {
    console.log('Creating SalesService instance...');
    await loadCSV();
    salesServiceInstance = new SalesService();
    console.log('SalesService instance created with data');
  }
  return salesServiceInstance;
};
