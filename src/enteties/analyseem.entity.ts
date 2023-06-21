
import { BaseEntity, Entity, PrimaryGeneratedColumn,Column, ManyToOne} from 'typeorm';
import { Declarerem } from './declarerem.entity';



@Entity()
export class Analyseem extends BaseEntity {
 @PrimaryGeneratedColumn()   
id:number;


@Column({ nullable: true })
ManiereDeclaration:string;
@Column({ nullable: true })
ServiceMembre:string;

@Column({ nullable: true })
Nom:string;
@Column({ nullable: true })
Prenom:string;
@Column({ nullable: true })
Fonction:string;

@Column({ nullable: true })
DateAnalyse:Date;
@Column({ nullable: true })
DateCrex:Date;
@Column({ nullable: true })
NomMembre:string;
@Column({ nullable: true })
PrenomMembre:string;
@Column({ nullable: true })
FonctionMembre:string;
@Column({ nullable: true })
DateEvent:Date;
@Column({ nullable: true })
Quoi:string;
@Column({ nullable: true })
Impact:string;
@Column({ nullable: true })
Probleme:string;
@Column({ nullable: true })
Action:string;
@Column({ nullable: true })
Concernemedicament:string;
@Column({ nullable: true })
Criticite:string;
@Column({ nullable: true })
Defaillances:string;
@Column({ nullable: true })
Autre:string;


@Column({ nullable: true })
erreurlieeauxpatients:string;
@Column({ nullable: true })
erreurlieealindividu:string;
@Column({ nullable: true })
erreurlieeaequipe:string;
@Column({ nullable: true })
erreurlieeauxtachesaaccomplir:string;
@Column({ nullable: true })
erreurlieeaenvironnement:string;
@Column({ nullable: true })
erreurlieeaorganisation:string;
@Column({ nullable: true })
erreurlieeaucontexteinstitutionnel:string;






















@Column({ nullable: true })
Eviterei:string;
@Column({ nullable: true })
Defense:string;
@Column({ nullable: true })
CauseLatente:string;
@Column({ nullable: true })
ActionPreventive:string;

@Column({ nullable: true })
ActionCorrective:string;

@Column({ nullable: true })
EffetAttendu:string;

@Column({ nullable: true })
Pilote:string;

@Column({ nullable: true })
EcheancePrevue:Date;
@Column({ nullable: true })
EcheanceEffective:Date;
@ManyToOne(type=>Declarerem,declarem=>declarem.analyses,{eager:false})
declarem:Declarerem;

@Column()
declaremId:number





}