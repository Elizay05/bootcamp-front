import { PaginatedResult } from 'src/app/interfaces/paginated-result.interface';
import { Technology } from '../interfaces/technology.interface';

export const mockTechnology1: Technology = {
  id: 1,
  name: 'Technology 1',
  description: 'Description for Technology 1'
};

export const mockTechnology2: Technology = {
    id: 2,
    name: 'Technology 2',
    description: 'Description for Technology 2'
};

export const mockTechnology3: Technology = {
    id: 3,
    name: 'Technology 3',
    description: 'Description for Technology 3'
};


export const mockPaginatedTechnologyResult: PaginatedResult<Technology> = {
    content: [mockTechnology1, mockTechnology2, mockTechnology3],
    pageNumber: 0,
    pageSize: 10,
    totalElements: 1,
    totalPages: 1
};
