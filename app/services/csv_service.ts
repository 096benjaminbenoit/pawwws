import { inject } from '@adonisjs/core'

import Papa from 'papaparse'

@inject()
export default class CsvService {
  async convert(animals: any) {
    const dataForCsv = animals.map((animal: any) => ({
      Identification: animal.identificationNumber,
      Nom: animal.name,
      Couleur: animal.color,
      Naissance: animal.birthDate.toISOString().slice(0, 10),
      Date_arrivée: animal.arrivalDate.toISOString().slice(0, 10),
      Stérilisé: animal.isSterilized ? 'Oui' : 'Non',
      Genre: animal.sex,
      Espèce: animal.species,
      Race: animal.race || 'Inconnu',
      Commentaire: animal.comment || '',
      Adopté: animal.isAdopted ? 'Oui' : 'Non',
      Date_début_adoption: animal.adoptionStart
        ? animal.adoptionStart.toISOString().slice(0, 10)
        : 'N/A',
      Date_fin_adoption: animal.adoptionEnd ? animal.adoptionEnd.toISOString().slice(0, 10) : 'N/A',
      Famille_adoptant_prénom: animal.adoptiveFamily?.firstName,
      Famille_adoptant_nom: animal.adoptiveFamily?.lastName,
      Famille_adoptant_téléphone: animal.adoptiveFamily?.telephone,
      Famille_adoptant_adresse: animal.adoptiveFamily?.address,
      Famille_adoptant_code_postal: animal.adoptiveFamily?.postalCode,
      Famille_adoptant_ville: animal.adoptiveFamily?.city,
      Famille_adoptant_pays: animal.adoptiveFamily?.country,
      Accueil: animal.isHosted ? 'Oui' : 'Non',
      Date_début_accueil: animal.hostingStart
        ? animal.hostingStart.toISOString().slice(0, 10)
        : 'N/A',
      Date_fin_accueil: animal.hostingEnd ? animal.hostingEnd.toISOString().slice(0, 10) : 'N/A',
      Famille_accueil_prénom: animal.hostingFamily?.firstName,
      Famille_accueil_nom: animal.hostingFamily?.lastName,
      Famille_accueil_téléphone: animal.hostingFamily?.telephone,
      Famille_accueil_adresse: animal.hostingFamily?.address,
      Famille_accueil_code_postal: animal.hostingFamily?.postalCode,
      Famille_accueil_ville: animal.hostingFamily?.city,
      Famille_accueil_pays: animal.hostingFamily?.country,
      Structure_nom: animal.organization.name,
      Stucture_telephone: animal.organization.telephone,
      Structure_adresse: animal.organization.address,
      Structure_code_postal: animal.organization.postalCode,
      Structure_ville: animal.organization.city,
      Structure_pays: animal.organization.country,
    }))

    const csv = Papa.unparse(dataForCsv)
    return csv
  }
}
