import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { LeadsService } from '../application/leads.service';
import { LeadSegment } from '@prisma/client';

const mockLeadsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findAllForExport: jest.fn(),
  remove: jest.fn(),
};

const makeLead = (overrides = {}) => ({
  id: 'lead-1',
  segment: LeadSegment.driver,
  fullName: 'Nguyễn Văn A',
  phone: '0912345678',
  email: null,
  province: 'Hà Nội',
  companyName: null,
  licensePlate: null,
  projectScale: null,
  fleetSize: null,
  source: 'landing_page',
  note: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('LeadsController', () => {
  let controller: LeadsController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [{ provide: LeadsService, useValue: mockLeadsService }],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /* ─── create (public) ─── */
  describe('create', () => {
    it('creates lead and returns success message', async () => {
      const lead = makeLead();
      mockLeadsService.create.mockResolvedValue(lead);

      const dto = { segment: LeadSegment.driver, fullName: 'Nguyễn Văn A', phone: '0912345678', source: 'landing' };
      const result = await controller.create(dto as any);

      expect(mockLeadsService.create).toHaveBeenCalledWith(dto);
      expect(result.message).toContain('thành công');
      expect(result.data).toEqual(lead);
    });
  });

  /* ─── findAll (admin) ─── */
  describe('findAll', () => {
    it('returns paginated leads with success message', async () => {
      const paginated = {
        items: [makeLead()],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      };
      mockLeadsService.findAll.mockResolvedValue(paginated);

      const result = await controller.findAll({ page: 1, limit: 10 } as any);

      expect(result.data).toEqual(paginated);
      expect(result.message).toContain('thành công');
    });
  });

  /* ─── findOne (admin) ─── */
  describe('findOne', () => {
    it('returns lead by id', async () => {
      const lead = makeLead();
      mockLeadsService.findOne.mockResolvedValue(lead);

      const result = await controller.findOne('lead-1');

      expect(result.data).toEqual(lead);
    });

    it('propagates NotFoundException when lead not found', async () => {
      mockLeadsService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('missing')).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── remove (admin) ─── */
  describe('remove', () => {
    it('soft-deletes lead and returns success message', async () => {
      const deleted = makeLead({ deletedAt: new Date() });
      mockLeadsService.remove.mockResolvedValue(deleted);

      const result = await controller.remove('lead-1');

      expect(mockLeadsService.remove).toHaveBeenCalledWith('lead-1');
      expect(result.message).toContain('thành công');
    });

    it('propagates NotFoundException when lead not found', async () => {
      mockLeadsService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── exportCsv (admin) ─── */
  describe('exportCsv', () => {
    it('sets correct headers and sends CSV content', async () => {
      const leads = [
        makeLead(),
        makeLead({ id: 'lead-2', fullName: 'Trần Thị B', email: 'b@test.com', companyName: 'Công ty, ABC' }),
      ];
      mockLeadsService.findAllForExport.mockResolvedValue(leads);

      let sentData = '';
      const mockExpressRes = {
        setHeader: jest.fn(),
        send: jest.fn((data: string) => { sentData = data; }),
      };

      await controller.exportCsv({} as any, mockExpressRes as any);

      expect(mockExpressRes.setHeader).toHaveBeenCalledWith('Content-Type', 'text/csv; charset=utf-8');
      expect(mockExpressRes.setHeader).toHaveBeenCalledWith(
        'Content-Disposition',
        expect.stringContaining('attachment; filename="leads-'),
      );
      expect(sentData).toContain('Họ tên');
      expect(sentData).toContain('Nguyễn Văn A');
      // Commas inside cell values should be quoted
      expect(sentData).toContain('"Công ty, ABC"');
    });

    it('includes BOM for UTF-8 Excel compatibility', async () => {
      mockLeadsService.findAllForExport.mockResolvedValue([]);

      let sentData = '';
      const mockExpressRes = {
        setHeader: jest.fn(),
        send: jest.fn((data: string) => { sentData = data; }),
      };

      await controller.exportCsv({} as any, mockExpressRes as any);

      // BOM is ﻿ (UTF-8 BOM)
      expect(sentData.charCodeAt(0)).toBe(0xFEFF);
    });
  });
});
