import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotFoundException } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsRepository } from '../infrastructure/leads.repository';
import { LeadSegment } from '@prisma/client';

const mockRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findFirst: jest.fn(),
  softRemove: jest.fn(),
};

const mockCache = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
};

describe('LeadsService', () => {
  let service: LeadsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockCache.get.mockResolvedValue(null);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        { provide: LeadsRepository, useValue: mockRepository },
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /* ─── create ─── */
  describe('create', () => {
    const dto = {
      segment: LeadSegment.driver,
      fullName: 'Nguyễn Văn A',
      phone: '0912345678',
      province: 'Hồ Chí Minh',
      source: 'driver_signup_page',
    };

    it('saves the lead and returns it', async () => {
      const saved = { id: 'uuid-1', ...dto, createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
      mockRepository.create.mockResolvedValue(saved);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        segment: LeadSegment.driver,
        fullName: 'Nguyễn Văn A',
        phone: '0912345678',
      }));
      expect(result.id).toBe('uuid-1');
    });

    it('invalidates list cache after create', async () => {
      // Pre-warm the list cache so there is a key to invalidate
      mockRepository.findAll.mockResolvedValue([[], 0]);
      await service.findAll({ page: 1, limit: 10 } as any);

      mockRepository.create.mockResolvedValue({ id: 'x', ...dto, createdAt: new Date(), updatedAt: new Date(), deletedAt: null });
      mockCache.del.mockClear();

      await service.create(dto);

      expect(mockCache.del).toHaveBeenCalled();
    });

    it('works for partner segment', async () => {
      const partnerDto = {
        segment: LeadSegment.partner,
        fullName: 'Công ty ABC',
        phone: '0987654321',
        companyName: 'Công ty TNHH ABC',
      };
      const saved = { id: 'uuid-2', ...partnerDto, createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
      mockRepository.create.mockResolvedValue(saved);

      const result = await service.create(partnerDto);

      expect(result.id).toBe('uuid-2');
    });
  });

  /* ─── findAll ─── */
  describe('findAll', () => {
    const mockLeads = [
      { id: '1', segment: 'driver', fullName: 'A', phone: '09', createdAt: new Date(), deletedAt: null },
      { id: '2', segment: 'partner', fullName: 'B', phone: '08', createdAt: new Date(), deletedAt: null },
    ];

    it('returns paginated list', async () => {
      mockRepository.findAll.mockResolvedValue([mockLeads, 2]);

      const result = await service.findAll({ page: 1, limit: 10 } as any);

      expect(result.items).toHaveLength(2);
      expect(result.meta.total).toBe(2);
      expect(result.meta.totalPages).toBe(1);
    });

    it('filters by segment', async () => {
      mockRepository.findAll.mockResolvedValue([[mockLeads[0]], 1]);

      await service.findAll({ segment: LeadSegment.driver, page: 1, limit: 10 } as any);

      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ segment: LeadSegment.driver }),
        }),
      );
    });

    it('filters by province (case-insensitive contains)', async () => {
      mockRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAll({ province: 'HCM', page: 1, limit: 10 } as any);

      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            province: { contains: 'HCM', mode: 'insensitive' },
          }),
        }),
      );
    });

    it('filters by dateFrom and dateTo', async () => {
      mockRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAll({
        dateFrom: '2026-01-01',
        dateTo: '2026-12-31',
        page: 1, limit: 10,
      } as any);

      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            createdAt: expect.objectContaining({
              gte: expect.any(Date),
              lte: expect.any(Date),
            }),
          }),
        }),
      );
    });

    it('returns cached result if available', async () => {
      const cached = { items: mockLeads, meta: { total: 2, page: 1, limit: 10, totalPages: 1 } };
      mockCache.get.mockResolvedValue(cached);

      const result = await service.findAll({ page: 1, limit: 10 } as any);

      expect(result).toEqual(cached);
      expect(mockRepository.findAll).not.toHaveBeenCalled();
    });
  });

  /* ─── findOne ─── */
  describe('findOne', () => {
    it('returns lead if it exists and is not deleted', async () => {
      const lead = { id: 'uuid-1', deletedAt: null };
      mockRepository.findOne.mockResolvedValue(lead);

      const result = await service.findOne('uuid-1');

      expect(result).toEqual(lead);
    });

    it('throws NotFoundException when lead not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException when lead is soft-deleted', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 'x', deletedAt: new Date() });

      await expect(service.findOne('x')).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── remove ─── */
  describe('remove', () => {
    it('soft-deletes lead and invalidates cache', async () => {
      // Pre-warm list cache
      mockRepository.findAll.mockResolvedValue([[], 0]);
      await service.findAll({ page: 1, limit: 10 } as any);
      mockCache.del.mockClear();

      const lead = { id: 'uuid-1', deletedAt: null };
      mockRepository.findOne.mockResolvedValue(lead);
      mockRepository.softRemove.mockResolvedValue({ ...lead, deletedAt: new Date() });

      const result = await service.remove('uuid-1');

      expect(mockRepository.softRemove).toHaveBeenCalledWith({ id: 'uuid-1' });
      expect(result.deletedAt).not.toBeNull();
      expect(mockCache.del).toHaveBeenCalled();
    });

    it('throws NotFoundException when lead does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── findAllForExport ─── */
  describe('findAllForExport', () => {
    it('returns all leads (no pagination) for CSV', async () => {
      const leads = Array.from({ length: 50 }, (_, i) => ({ id: `id-${i}` }));
      mockRepository.findAll.mockResolvedValue([leads, 50]);

      const result = await service.findAllForExport({});

      expect(result).toHaveLength(50);
      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({ take: 10000 }),
      );
    });

    it('applies dateFrom filter (gte)', async () => {
      mockRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAllForExport({ dateFrom: '2026-01-01' } as any);

      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            createdAt: expect.objectContaining({ gte: expect.any(Date) }),
          }),
        }),
      );
    });

    it('applies dateTo filter with end-of-day time (lte)', async () => {
      mockRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAllForExport({ dateTo: '2026-12-31' } as any);

      const call = mockRepository.findAll.mock.calls[0][0];
      const lte: Date = call.where.createdAt.lte;
      expect(lte.getHours()).toBe(23);
      expect(lte.getMinutes()).toBe(59);
    });

    it('applies both dateFrom and dateTo', async () => {
      mockRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAllForExport({ dateFrom: '2026-01-01', dateTo: '2026-12-31' } as any);

      const call = mockRepository.findAll.mock.calls[0][0];
      expect(call.where.createdAt.gte).toBeInstanceOf(Date);
      expect(call.where.createdAt.lte).toBeInstanceOf(Date);
    });
  });
});
