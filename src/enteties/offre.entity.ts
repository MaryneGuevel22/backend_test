import { BaseEntity, Entity, PrimaryGeneratedColumn,Column} from 'typeorm';
import { OffreStatus } from 'src/common/enums/offre-status.enum';

@Entity()
export class Offre extends BaseEntity {
 @PrimaryGeneratedColumn()   
id:number;
@Column()
title:string;

@Column()
description:string;
@Column()
status:OffreStatus;

@Column()
userId:number
}