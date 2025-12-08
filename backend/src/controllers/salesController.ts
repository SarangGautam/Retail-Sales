// backend/src/controllers/salesController.ts
import { Request, Response } from 'express';
import { SalesService } from '../services/salesService';

const service = new SalesService();

export const getSales = async (req: Request, res: Response) => {
  try {
    const { searchTerm, sortBy, sortOrder, page, pageSize, filters } = req.query;

    let parsedFilters: any = undefined;
    if (typeof filters === 'string' && filters.trim()) {
      try {
        parsedFilters = JSON.parse(filters);
      } catch {
        // ignore bad filter JSON
      }
    }

    const result = await service.getSales({
      searchTerm: typeof searchTerm === 'string' ? searchTerm : undefined,
      sortBy: sortBy as any,
      sortOrder: sortOrder as any,
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 10,
      filters: parsedFilters
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch sales data' });
  }
};

export const getFilterOptions = async (_req: Request, res: Response) => {
  try {
    const result = await service.getFilterOptions();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch filter options' });
  }
};
