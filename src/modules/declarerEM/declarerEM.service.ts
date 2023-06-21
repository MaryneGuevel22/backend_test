import { Injectable, InternalServerErrorException, Logger, NotFoundException,UnauthorizedException } from '@nestjs/common';

import {InjectRepository} from '@nestjs/typeorm'
import { Between, Repository } from 'typeorm';
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

  //Test

  async getNumberOfDeclarationsToday(): Promise<number> {
    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59
    );
  
    const count = await this.declarerRepository.count({
      where: {
        Date_Dec: Between(startOfDay, endOfDay),
      },
    });
  
    return count;
  }


  async getNumberOfEMToday(): Promise<number> {
    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59
    );
  
    const count = await this.declarerRepository.count({
      where: {
        DateEvent: Between(startOfDay, endOfDay),
      },
    });
  
    return count;
  }

  async getNumberOfDeclarationsByService(service: string): Promise<number> {
    return await this.declarerRepository.count({
      where: {
        service:service,
      },
    });;
  }
  
  async getNumberOfDeclarationsForAllServices(): Promise<{ service: string; count: number }[]> {
    const services = ['Gérontologie','Mère enfant', 'Chirurgie', 'Médico-Technique', 'Médecine', 'Plateau Technique']; // Add all your services here
    const results: { service: string; count: number }[] = [];

    for (const service of services) {
      const count = await this.getNumberOfDeclarationsByService(service);
      results.push({ service, count });
    }

    return results;
  }

}
    

    

