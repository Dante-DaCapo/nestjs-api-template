import { Module } from "@nestjs/common";
import { PinController } from "./controllers/pin.controller";
import { PinService } from "./services/pin.service";
import { Pin } from "./entities/pin";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AxiosCheerioFetchUrlService } from "./services/AxiosCheerioFetchUrlService";
import { FetchUrlService } from "./contracts/FetchUrlService";
import { TestFetchUrlService } from "./tests/TestFetchUrlService";

const fetchUrlServiceProvider = {
  provide: FetchUrlService,
  useClass:
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "production"
      ? AxiosCheerioFetchUrlService
      : TestFetchUrlService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Pin])],
  controllers: [PinController],
  providers: [PinService, fetchUrlServiceProvider],
})
export class PinModule {}
