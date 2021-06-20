import { Investigator } from '../../../typescript/Investigator'
import { Gender } from '../../../typescript/Gender'
import { Summary } from '../../../typescript/Summary'

import { Label } from '../../Label'

import { CopyField } from './CopyField'

/**
 * 
 */
export function SummaryRenderer (properties: SummaryRenderer.Properties) {
  const summary: Summary = properties.value.summary

  const name: string = summary.name == null ? 'Non Défini' : summary.name.toString()
  const gender: string = summary.gender == null ? 'Non Défini' : (summary.gender === Gender.MALE ? 'M' : 'F' )
  const birthdate: string = summary.birthdate == null ? 'Non Défini' : summary.birthdate
  const hiringdate: string = summary.hiringdate == null ? 'Non Défini' : summary.hiringdate
  const birthplace: string = summary.birthplace == null ? 'Non Défini' : summary.birthplace.toString()
  const home: string = summary.home == null ? 'Non Défini' : summary.home.toString()

  return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 col-md-8'>
            <CopyField value={name}>
              <Label>Agent</Label>
              { name }
            </CopyField>
          </div>
          <div className='col-6 col-md-2'>
            <CopyField value={gender}>
              <Label>Sexe</Label>
              { gender }
            </CopyField>
          </div>
          <div className='col-6 col-md-2'>
           <CopyField value={summary.age.toString()}>
              <Label>Âge</Label>
              { summary.age }
            </CopyField>
          </div>

          <div className='col-12 col-md-8'>
            <CopyField value={summary.alias}>
              <Label>Alias</Label>
              { summary.alias }
            </CopyField>
          </div>
          <div className='col-12 col-md-4'>
            <CopyField value={summary.job}>
              <Label>Couverture</Label>
              { summary.job }
            </CopyField>
          </div>

          <div className='col-12 col-md-4'>
            <CopyField value={summary.matricule}>
              <Label>Matricule</Label>
              { summary.matricule }
            </CopyField>
          </div>
          <div className='col-12 col-md-4'>
            <CopyField value={birthdate}>
              <Label>Date de naissance</Label>
              { birthdate }
            </CopyField>
          </div>
          <div className='col-12 col-md-4'>
            <CopyField value={hiringdate}>
              <Label>Date d'intégration</Label>
              { hiringdate }
            </CopyField>
          </div>

          <div className='col-12'>
            <CopyField value={birthplace}>
              <Label>Lieu de naissance</Label>
              { birthplace }
            </CopyField>
          </div>

          <div className='col-12'>
            <CopyField value={home}>
              <Label>Lieu de résidence</Label>
              { home }
            </CopyField>
          </div>
        </div>
      </div>
  )
}

/**
 * 
 */
export namespace SummaryRenderer {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    className?: string | undefined,

    /**
     * 
     */
    value: Investigator
  }
}