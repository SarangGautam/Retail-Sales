// backend/src/services/salesService.ts
import fs from 'fs';
import csv from 'csv-parser';

const DATA_PATH = './data/sales.csv';

export type SortBy = 'date' | 'quantity' | 'customerName';
export type SortOrder = 'asc' | 'desc';

export interface FilterOptions {
  customerRegion?: string[];
  gender?: string[];
  productCategory?: string[];
  paymentMethod?: string[];
}

export interface SearchParams {
  searchTerm?: string;
  filters?: FilterOptions;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  page?: number;
  pageSize?: number;
}

export interface SalesRowView {
  date: string;
  customerName: string;
  phoneNumber: string;
  customerRegion: string;
  productName: string;
  productCategory: string;
  quantity: number;
  finalAmount: number;
  paymentMethod: string;
  gender: string;
  age: number;
}

export class SalesService {
  async getSales(params: SearchParams) {
    const {
      searchTerm = '',
      filters,
      sortBy = 'date',
      sortOrder = 'desc',
      page = 1,
      pageSize = 10
    } = params;

    const term = searchTerm.trim().toLowerCase();
    const matches: SalesRowView[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(DATA_PATH)
        .pipe(csv())
        .on('data', (row: any) => {
          try {
            const viewRow: SalesRowView = {
              date: row['Date'],
              customerName: row['Customer Name'],
              phoneNumber: row['Phone Number'],
              customerRegion: row['Customer Region'],
              productName: row['Product Name'],
              productCategory: row['Product Category'],
              quantity: Number(row['Quantity']) || 0,
              finalAmount: Number(row['Final Amount']) || 0,
              paymentMethod: row['Payment Method'],
              gender: row['Gender'],
              age: Number(row['Age']) || 0
            };

            // ---- Search filter ----
            if (term) {
              const byName = viewRow.customerName
                .toLowerCase()
                .includes(term);
              const byPhone = viewRow.phoneNumber.includes(searchTerm);

              if (!byName && !byPhone) return; // skip this row
            }

            // ---- Extra filters ----
            if (filters) {
              if (
                filters.customerRegion &&
                filters.customerRegion.length > 0 &&
                !filters.customerRegion.includes(viewRow.customerRegion)
              )
                return;

              if (
                filters.gender &&
                filters.gender.length > 0 &&
                !filters.gender.includes(viewRow.gender)
              )
                return;

              if (
                filters.productCategory &&
                filters.productCategory.length > 0 &&
                !filters.productCategory.includes(viewRow.productCategory)
              )
                return;

              if (
                filters.paymentMethod &&
                filters.paymentMethod.length > 0 &&
                !filters.paymentMethod.includes(viewRow.paymentMethod)
              )
                return;
            }

            matches.push(viewRow);
          } catch {
            // ignore malformed rows
          }
        })
        .on('end', () => {
          // ---- Sorting ----
          matches.sort((a, b) => {
            let cmp = 0;

            if (sortBy === 'date') {
              cmp =
                new Date(a.date).getTime() -
                new Date(b.date).getTime();
            } else if (sortBy === 'quantity') {
              cmp = a.quantity - b.quantity;
            } else if (sortBy === 'customerName') {
              cmp = a.customerName.localeCompare(b.customerName);
            }

            return sortOrder === 'asc' ? cmp : -cmp;
          });

          // ---- Pagination ----
          const totalRecords = matches.length;
          const totalPages = Math.ceil(totalRecords / pageSize);
          const start = (page - 1) * pageSize;
          const data = matches.slice(start, start + pageSize);

          resolve({
            data,
            pagination: {
              currentPage: page,
              pageSize,
              totalPages,
              totalRecords
            }
          });
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async getFilterOptions() {
    const regions = new Set<string>();
    const genders = new Set<string>();
    const productCategories = new Set<string>();
    const paymentMethods = new Set<string>();
    let minAge = Infinity;
    let maxAge = -Infinity;
    let minDate = Infinity;
    let maxDate = -Infinity;

    return new Promise((resolve, reject) => {
      fs.createReadStream(DATA_PATH)
        .pipe(csv())
        .on('data', (row: any) => {
          regions.add(row['Customer Region']);
          genders.add(row['Gender']);
          productCategories.add(row['Product Category']);
          paymentMethods.add(row['Payment Method']);

          const ageNum = Number(row['Age']);
          if (!Number.isNaN(ageNum)) {
            if (ageNum < minAge) minAge = ageNum;
            if (ageNum > maxAge) maxAge = ageNum;
          }

          const t = new Date(row['Date']).getTime();
          if (!Number.isNaN(t)) {
            if (t < minDate) minDate = t;
            if (t > maxDate) maxDate = t;
          }
        })
        .on('end', () => {
          resolve({
            customerRegions: Array.from(regions).filter(Boolean),
            genders: Array.from(genders).filter(Boolean),
            productCategories: Array.from(productCategories).filter(Boolean),
            paymentMethods: Array.from(paymentMethods).filter(Boolean),
            ageRange: {
              min: minAge === Infinity ? 0 : minAge,
              max: maxAge === -Infinity ? 0 : maxAge
            },
            dateRange: {
              min: minDate === Infinity ? 0 : minDate,
              max: maxDate === -Infinity ? 0 : maxDate
            }
          });
        })
        .on('error', (err) => reject(err));
    });
  }
}
