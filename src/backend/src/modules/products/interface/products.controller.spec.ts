import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from '../application/products.service';

const mockProductsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockRes = { header: jest.fn() };

const makeProduct = (overrides = {}) => ({
  id: 'prod-1',
  name: 'iPhone 15 Pro',
  price: 24900000,
  stock: 100,
  category: 'Smartphones',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /* ─── create ─── */
  describe('create', () => {
    it('creates product, sets Location header, returns success message', async () => {
      const product = makeProduct();
      mockProductsService.create.mockResolvedValue(product);

      const result = await controller.create(
        { name: 'iPhone 15 Pro', price: 24900000 } as any,
        mockRes as any,
      );

      expect(mockProductsService.create).toHaveBeenCalled();
      expect(mockRes.header).toHaveBeenCalledWith('Location', `/api/v1/products/${product.id}`);
      expect(result.message).toContain('thành công');
      expect(result.data).toEqual(product);
    });
  });

  /* ─── findAll ─── */
  describe('findAll', () => {
    it('returns paginated product list', async () => {
      const paginated = {
        items: [makeProduct()],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      };
      mockProductsService.findAll.mockResolvedValue(paginated);

      const result = await controller.findAll({ page: 1, limit: 10 } as any);

      expect(result.data).toEqual(paginated);
      expect(result.message).toContain('thành công');
    });
  });

  /* ─── findOne ─── */
  describe('findOne', () => {
    it('returns product by id', async () => {
      const product = makeProduct();
      mockProductsService.findOne.mockResolvedValue(product);

      const result = await controller.findOne('prod-1');

      expect(result.data).toEqual(product);
    });

    it('propagates NotFoundException when product not found', async () => {
      mockProductsService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('missing')).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── update ─── */
  describe('update', () => {
    it('updates product and returns updated data', async () => {
      const updated = makeProduct({ name: 'Samsung S24' });
      mockProductsService.update.mockResolvedValue(updated);

      const result = await controller.update('prod-1', { name: 'Samsung S24' } as any);

      expect(result.data).toEqual(updated);
      expect(result.message).toContain('thành công');
    });

    it('propagates NotFoundException when product not found', async () => {
      mockProductsService.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update('missing', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── remove ─── */
  describe('remove', () => {
    it('soft-deletes product and returns success message', async () => {
      const deleted = makeProduct({ deletedAt: new Date() });
      mockProductsService.remove.mockResolvedValue(deleted);

      const result = await controller.remove('prod-1');

      expect(mockProductsService.remove).toHaveBeenCalledWith('prod-1');
      expect(result.message).toContain('thành công');
    });

    it('propagates NotFoundException when product not found', async () => {
      mockProductsService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });
});
