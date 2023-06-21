import { Injectable, InternalServerErrorException, Logger, NotFoundException,UnauthorizedException } from '@nestjs/common';

import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CreateOffreDto } from 'src/common/dtos/create-offre.dto';
import { GetOffresFilterDto } from 'src/common/dtos/get-offres-filter.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/enteties/user.entity';
import { Offre } from 'src/enteties/offre.entity';
import { OffreStatus } from 'src/common/enums/offre-status.enum';
import { Declarerem } from 'src/enteties/declarerem.entity';
import { CreateDeclaredDto } from 'src/common/dtos/declare.dto';
import { manieredeclaration } from 'src/common/enums/manieredeclaration.enum';
import { ModifiedDeclaredDto } from 'src/common/dtos/modify-declared.dto';
import { DeclardStatus } from 'src/common/enums/declare-status.enum';

@Injectable()
export class DeclarerService {
  constructor(
    @InjectRepository(Declarerem)
    private declarerRepository: Repository<Declarerem>,

  ){}

  async createOffre(CreatedeclaredDto: CreateDeclaredDto): Promise<Declarerem> {
    console.log('===>');
    const {
      Nom,
      Prenom,
      ManiereDeclaration,
      PatientRisque,
      CatégoriePatient,
      NomMedicament,
      Medicamentarisque,
      CategorieMedicamentarisque,
      NomVoie,
      VoieAdministrationarisque,
      CategorieVoiearisque,
      Degrerealisation,
      etapedesurvenu,
      DescEvent,
      Impact,
      Fonction,
      Date_Dec,
      DateEvent,
      service,
      NeverEvent,
      Lequel,
      EtatPatient
    } = CreatedeclaredDto;
  
    const Declared = new Declarerem();
  
    
      Declared.Nom = Nom;
      Declared.Prenom = Prenom;
      Declared.Fonction = Fonction;
     
    
  
    Declared.ManiereDeclaration = ManiereDeclaration;
    Declared.PatientRisque = PatientRisque;
    Declared.CatégoriePatient = CatégoriePatient;
    Declared.NomMedicament = NomMedicament;
    Declared.Medicamentarisque = Medicamentarisque;
    Declared.CategorieMedicamentarisque = CategorieMedicamentarisque;
    Declared.NomVoie = NomVoie;
    Declared.VoieAdministrationarisque = VoieAdministrationarisque;
    Declared.CategorieVoiearisque = CategorieVoiearisque;
    Declared.Degrerealisation = Degrerealisation;
    Declared.etapedesurvenu = etapedesurvenu;
    Declared.DescEvent = DescEvent;
    Declared.Impact = Impact;
    Declared.Date_Dec = Date_Dec;
    Declared.DateEvent = DateEvent;
    Declared.service = service;
    Declared.NeverEvent = NeverEvent;
    Declared.Lequel = Lequel;
    Declared.EtatPatient = EtatPatient;
    Declared.status = DeclardStatus.EN_ATTENTE;

  
    return await this.declarerRepository.save(Declared);
  }
  
  //get   all data
  async getall(): Promise<Declarerem[]> {
    const result =await this.declarerRepository.find()
    return result 
  
  }
  async getOffresById(
    id: number,
    ): Promise<Declarerem> {
      const found =await this.declarerRepository.findOne({
          where: { id }
   });
      if(!found){
throw new NotFoundException(`declared with ID "${id}" not found`);
}
return found
}
async modifyOffre(id: number, ModifiedDeclaredDto: ModifiedDeclaredDto): Promise<Declarerem> {
  const {
    Nom,
    Prenom,
    ManiereDeclaration,
    PatientRisque,
    CatégoriePatient,
    NomMedicament,
    Medicamentarisque,
    CategorieMedicamentarisque,
    NomVoie,
    VoieAdministrationarisque,
    CategorieVoiearisque,
    Degrerealisation,
    etapedesurvenu,
    DescEvent,
    Impact,
    Fonction,
    Date_Dec,
    DateEvent,
    service,
    NeverEvent,
    Lequel,
    EtatPatient
  } = ModifiedDeclaredDto;

  const declared = await this.getOffresById(id)

  ;
  if (!declared) {
    throw new Error('Declaration not found');
  }

  declared.Nom = Nom;
  declared.Prenom = Prenom;
  declared.Fonction = Fonction;
  declared.ManiereDeclaration = ManiereDeclaration;
  declared.PatientRisque = PatientRisque;
  declared.CatégoriePatient = CatégoriePatient;
  declared.NomMedicament = NomMedicament;
  declared.Medicamentarisque = Medicamentarisque;
  declared.CategorieMedicamentarisque = CategorieMedicamentarisque;
  declared.NomVoie = NomVoie;
  declared.VoieAdministrationarisque = VoieAdministrationarisque;
  declared.CategorieVoiearisque = CategorieVoiearisque;
  declared.Degrerealisation = Degrerealisation;
  declared.etapedesurvenu = etapedesurvenu;
  declared.DescEvent = DescEvent;
  declared.Impact = Impact;
  declared.Date_Dec = Date_Dec;
  declared.DateEvent = DateEvent;
  declared.service = service;
  declared.NeverEvent = NeverEvent;
  declared.Lequel = Lequel;
  declared.EtatPatient = EtatPatient;


  return await this.declarerRepository.save(declared);
}

//update status 
async updateDeclaredStatus(id:number
  
  ): Promise<Declarerem>{
const declared= await this.getOffresById(id)
declared.status=DeclardStatus.VALIDER;
await declared.save();
return declared
  }
  
}
    

    

