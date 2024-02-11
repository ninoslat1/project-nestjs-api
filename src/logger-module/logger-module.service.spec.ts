import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModuleService } from './logger-module.service';

describe('LoggerModuleService', () => {
  let service: LoggerModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerModuleService],
    }).compile();

    service = module.get<LoggerModuleService>(LoggerModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
