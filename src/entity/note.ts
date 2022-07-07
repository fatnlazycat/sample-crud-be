import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string;

  @Column()
  completed: boolean;
}