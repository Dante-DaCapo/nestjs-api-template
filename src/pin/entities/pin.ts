import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  sourceUrl: string;

  @Column()
  userId: number;

  constructor(pin: Partial<Pin>) {
    Object.assign(this, pin);
  }
}
