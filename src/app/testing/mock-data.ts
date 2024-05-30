import { PaginatedResult } from 'src/app/interfaces/paginated-result.interface';
import { Technology } from '../interfaces/technology.interface';
import { Capacity } from '../interfaces/capacity.interface';
import { Bootcamp } from '../interfaces/bootcamp.interface';

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

export const mockCapacity1: Capacity = {
    id: 1,
    name: 'Capacity 1',
    description: 'Description for Capacity 1',
    technologies: []
  };
  
  export const mockCapacity2: Capacity = {
      id: 2,
      name: 'Capacity 2',
      description: 'Description for Capacity 2',
      technologies: []
  };
  
  export const mockCapacity3: Capacity = {
      id: 3,
      name: 'Capacity 3',
      description: 'Description for Capacity 3',
      technologies: []
  };

  export const mockBootcamp1: Bootcamp = {
    id: 1,
    name: 'Bootcamp 1',
    description: 'Description for Bootcamp 1',
    capacities: []
  };
  
  export const mockBootcamp2: Bootcamp = {
      id: 2,
      name: 'Bootcamp 2',
      description: 'Description for Bootcamp 2',
      capacities: []
  };
  
  export const mockBootcamp3: Bootcamp = {
      id: 3,
      name: 'Bootcamp 3',
      description: 'Description for Bootcamp 3',
      capacities: []
  };

export const mockPaginatedTechnologyResult: PaginatedResult<Technology> = {
    content: [mockTechnology1, mockTechnology2, mockTechnology3],
    pageNumber: 0,
    pageSize: 10,
    totalElements: 1,
    totalPages: 1
};

export const mockPaginatedCapacityResult: PaginatedResult<Capacity> = {
    content: [mockCapacity1, mockCapacity2, mockCapacity3],
    pageNumber: 0,
    pageSize: 10,
    totalElements: 1,
    totalPages: 1
};

export const mockPaginatedBootcampResult: PaginatedResult<Bootcamp> = {
    content: [mockBootcamp1, mockBootcamp2, mockBootcamp3],
    pageNumber: 0,
    pageSize: 10,
    totalElements: 1,
    totalPages: 1
  };