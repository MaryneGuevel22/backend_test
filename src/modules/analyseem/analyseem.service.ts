import { Injectable, InternalServerErrorException, Logger, NotFoundException,UnauthorizedException } from '@nestjs/common';

import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { Analyseem } from 'src/enteties/analyseem.entity';
import { CreateAnalyseemDto } from 'src/common/dtos/analyseem-create.dto';
import { DeclarerService } from '../declarerEM/declarerEM.service';

@Injectable()
export class AnalyseemService {
  constructor(
    @InjectRepository(Analyseem)
    private analyseemRepository: Repository<Analyseem>,
    private declaredService: DeclarerService

  ){}

 async createDeclareem( declaremId:number, CreatedeclaredDto: CreateAnalyseemDto): Promise<Analyseem> {
  const declaration = await this.declaredService.getOffresById(declaremId);
  console.log("===>",declaration)
  if (!declaration) {
    throw new NotFoundException('Declaration not found');
  }  const {
    Nom,
    Prenom,
    ManiereDeclaration,
    Fonction,
    DateAnalyse,
    DateCrex,
    NomMembre,
    PrenomMembre,
    FonctionMembre,
    DateEvent,
    Quoi,
    Impact,
    Probleme,
    Action,
    Concernemedicament,
    Criticite,
    Defaillances,
    Autre,
    erreurlieeauxpatients,
    erreurlieealindividu,
    erreurlieeaequipe,
    erreurlieeauxtachesaaccomplir,
    erreurlieeaenvironnement,
    erreurlieeaorganisation,
    erreurlieeaucontexteinstitutionnel,
    Eviterei,
    Defense,
    CauseLatente,
    ActionPreventive,
    ActionCorrective,
    EffetAttendu,
    Pilote,
    EcheancePrevue,
  EcheanceEffective,
  ServiceMembre,

  } = CreatedeclaredDto;

  const Declared = new Analyseem();

  Declared.Nom = Nom != null ? Nom : "";
  Declared.Prenom = Prenom != null ? Prenom : "";
  Declared.ManiereDeclaration = ManiereDeclaration != null ? ManiereDeclaration : "";
  Declared.DateAnalyse = DateAnalyse;
  Declared.DateCrex = DateCrex;
  Declared.NomMembre = NomMembre;
  Declared.PrenomMembre = PrenomMembre;
  Declared.FonctionMembre = FonctionMembre;
  Declared.DateEvent = DateEvent;
  Declared.Quoi = Quoi;
  Declared.Fonction=Fonction;
  Declared.Impact = Impact;
  Declared.Probleme = Probleme;
  Declared.Action = Action;
  Declared.Concernemedicament = Concernemedicament;
  Declared.Criticite = Criticite;
  Declared.Defaillances = Defaillances;
  Declared.Autre = Autre;
  Declared.erreurlieeauxpatients = erreurlieeauxpatients;
  Declared.erreurlieealindividu = erreurlieealindividu;
  Declared.erreurlieeaequipe = erreurlieeaequipe;
  Declared.erreurlieeauxtachesaaccomplir = erreurlieeauxtachesaaccomplir;
  Declared.erreurlieeaenvironnement = erreurlieeaenvironnement;
  Declared.erreurlieeaorganisation = erreurlieeaorganisation;
  Declared.erreurlieeaucontexteinstitutionnel = erreurlieeaucontexteinstitutionnel;
  Declared.Eviterei = Eviterei;
  Declared.Defense = Defense;
  Declared.CauseLatente = CauseLatente;
  Declared.ActionPreventive = ActionPreventive;
  Declared.ActionCorrective = ActionCorrective;
  Declared.EffetAttendu = EffetAttendu;
  Declared.Pilote = Pilote;
  Declared.EcheancePrevue = EcheancePrevue;
  Declared.EcheanceEffective = EcheanceEffective;
  Declared.ServiceMembre=ServiceMembre
  Declared.declaremId=declaremId

  const createdAnalyseem = await this.analyseemRepository.save(Declared);

  // Update the status of the corresponding Declaration entity
  await this.declaredService.updateDeclaredStatus(declaremId);

  return createdAnalyseem;
  
  }
  async getall(): Promise<Analyseem[]> {
    const result =await this.analyseemRepository.find()
    return result 
  
}
    

    
}
