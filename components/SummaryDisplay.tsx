import { Field } from './Field'
import { Label } from './Label'
import { TextControl } from './form/TextControl'

import { Investigator } from '../typescript/Investigator'
import { Gender } from '../typescript/Gender'
import { Summary } from '../typescript/Summary'

import { CopyField } from './CopyField'

/**
 * 
 */
function formatDate (date: Date): string {
  return (
    date.getDay().toString().padStart(2, '0') + '-' + 
    date.getMonth().toString().padStart(2, '0') + '-' + 
    date.getFullYear()
  )
}

/**
 * 
 */
export function SummaryDisplay (properties: SummaryDisplay.Properties) {
  const summary: Summary = properties.value.summary

  const name: string = summary.name.toString()
  const gender: string = summary.gender === Gender.MALE ? 'M' : 'F' 
  const birthdate: string = formatDate(summary.birthdate)
  const hiringdate: string = formatDate(summary.hiringdate)
  const birthplace: string = summary.birthplace.toString()
  const home: string = summary.home.toString()

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
export namespace SummaryDisplay {
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