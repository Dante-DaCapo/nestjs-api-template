import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pin } from "../entities/pin";
import { FetchUrlService } from "../contracts/FetchUrlService";
import { CreatePinDto } from "../dto/CreatePinDto";

@Injectable()
export class PinService {
  constructor(
    @InjectRepository(Pin) private readonly pinRepository: Repository<Pin>,
    private readonly fetchUrlService: FetchUrlService,
  ) {}

  findByIdAndUserId(id: number, userId: number): Promise<Pin> {
    return this.pinRepository.findOneBy({ id, userId });
  }

  findAllByUserId(userId: number): Promise<Pin[]> {
    console.log(userId);
    console.log("HEHO");
    return this.pinRepository.findBy({ userId: userId });
  }

  async deleteById(id: number): Promise<void> {
    await this.pinRepository.delete(id);
  }

  async createPin(createPinDto: CreatePinDto): Promise<void> {
    const pin = new Pin(createPinDto);
    await this.pinRepository.save(pin);
  }

  async extractDataFromUrl(
    url: string,
  ): Promise<{ description: string; title: string; imageUrl: string }> {
    return await this.fetchUrlService.getPageFromUrl(url);
  }
}
