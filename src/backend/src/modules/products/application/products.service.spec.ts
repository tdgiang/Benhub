import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsRepository } from '../infrastructure/products.repository';

const mockRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  softRemove: jest.fn(),
  productSelect: {},
};

const mockCache = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
};

const mockConfigService = {
  get: jest.fn((key: string, def: unknown) => {
    if (key === 'PRODUCT_CACHE_TTL') return 60000;
    return def;
  }),
};

const makeProduct = (overrides = {}) => ({
  id: 'prod-1',
  name: 'iPhone 15 Pro',
  description: 'Flagship',
  price: 24900000,
  stock: 100,
  category: 'Smartphones',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockCache.get.mockResolvedValue(null);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useValue: mockRepository },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /* ─── create ─── */
  describe('create', () => {
    it('creates a product and invalidates list cache', async () => {
      const dto = { name: 'iPhone 15 Pro', price: 24900000 };
      const product = makeProduct();
      mockRepository.create.mockResolvedValue(product);

      // Pre-warm list cache so there is a key to invalidate
      mockRepository.findAll.mockResolvedValue([[product], 1]);
      await service.findAll({ page: 1, limit: 10 } as any);
      mockCache.del.mockClear();

      const result = await service.create(dto as any);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(result.id).toBe('prod-1');
      expect(mockCache.del).toHaveBeenCalled();
    });
  });

  /* ─── findAll ─── */
  describe('findAll', () => {
    const products = [makeProduct(), makeProduct({ id: 'prod-2', name: 'Samsung S24' })];

    it('returns paginated list of products', async () => {
      mockRepository.findAll.mockResolvedValue([products, 2]);

      const result = await service.findAll({ page: 1, limit: 10 } as any);

      expect(result.items).toHaveLength(2);
      expect(result.meta.total).toBe(2);
      expect(result.meta.totalPages).toBe(1);
    });

    it('returns cached result without hitting repository', async () => {
      const cached = { items: products, meta: { total: 2, page: 1, limit: 10, totalPages: 1 } };
      mockCache.get.mockResolvedValue(cached);

      const result = await service.findAll({ page: 1, limit: 10 } as any);

      expect(result).toEqual(cached);
      expect(mockRepository.findAll).not.toHaveBeenCalled();
    });

    it('filters by category', async () => {
      mockRepository.findAll.mockResolvedValue([[products[0]], 1]);

      await service.findAll({ category: 'Smartphones', page: 1, limit: 10 } as any);

      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ category: 'Smartphones' }),
        }),
      );
    });

    it('filters by isActive', async () => {
      mockRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAll({ isActive: false, page: 1, limit: 10 } as any);

      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isActive: false }),
        }),
      );
    });

    it('searches by name and description', async () => {
      mockRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAll({ search: 'iPhone', page: 1, limit: 10 } as any);

      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.arrayContaining([
              { name: { contains: 'iPhone', mode: 'insensitive' } },
              { description: { contains: 'iPhone', mode: 'insensitive' } },
            ]),
          }),
        }),
      );
    });

    it('always includes deletedAt: null in where clause', async () => {
      mockRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAll({ page: 1, limit: 10 } as any);

      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ deletedAt: null }),
        }),
      );
    });

    it('applies correct skip for pagination', async () => {
      mockRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAll({ page: 3, limit: 10 } as any);

      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 20, take: 10 }),
      );
    });
  });

  /* ─── findOne ─── */
  describe('findOne', () => {
    it('returns product by id', async () => {
      const product = makeProduct();
      mockRepository.findOne.mockResolvedValue(product);

      const result = await service.findOne('prod-1');

      expect(result).toEqual(product);
    });

    it('returns cached product without hitting repository', async () => {
      const product = makeProduct();
      mockCache.get.mockResolvedValue(product);

      const result = await service.findOne('prod-1');

      expect(result).toEqual(product);
      expect(mockRepository.findOne).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when product not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── update ─── */
  describe('update', () => {
    it('updates product and invalidates cache', async () => {
      const product = makeProduct();
      const updated = { ...product, name: 'Updated Name' };
      mockRepository.findOne.mockResolvedValue(product);
      mockRepository.update.mockResolvedValue(updated);

      const result = await service.update('prod-1', { name: 'Updated Name' } as any);

      expect(mockRepository.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'prod-1' } }),
      );
      expect(result.name).toBe('Updated Name');
      expect(mockCache.del).toHaveBeenCalledWith('product_prod-1');
    });

    it('throws NotFoundException if product does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('missing', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── remove ─── */
  describe('remove', () => {
    it('soft-deletes product and invalidates cache', async () => {
      const product = makeProduct();
      const deleted = { ...product, deletedAt: new Date() };
      mockRepository.findOne.mockResolvedValue(product);
      mockRepository.softRemove.mockResolvedValue(deleted);

      const result = await service.remove('prod-1');

      expect(mockRepository.softRemove).toHaveBeenCalledWith({ id: 'prod-1' });
      expect(result.deletedAt).not.toBeNull();
    });

    it('throws NotFoundException if product does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });
});
