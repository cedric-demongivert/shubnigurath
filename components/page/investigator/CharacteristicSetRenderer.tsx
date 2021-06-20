import { PureComponent, ReactElement } from 'react'

import { Investigator } from '../../../typescript/Investigator'
import { CharacteristicSet } from '../../../typescript/CharacteristicSet'
import { DataEvent } from '../../../typescript/redux/DataEvent'
import { DataReducer } from '../../../typescript/redux'
import { Mutables } from '../../../typescript/Mutables'

import { ValueField } from '../../form/ValueField'
import { IncrementEvent } from '../../increment/IncrementEvent'

import { Label } from '../../Label'

import { ValueRenderer } from './ValueRenderer'
import { CopyField } from './CopyField'

/**
 * 
 */
export class CharacteristicSetRenderer extends PureComponent<CharacteristicSetRenderer.Properties> 
{
  /**
   * 
   */
  public constructor (properties: CharacteristicSetRenderer.Properties) {
    super(properties)

    this.handleLuckChange = this.handleLuckChange.bind(this)
    this.handleLuckIncrement = this.handleLuckIncrement.bind(this)
  }

  /**
   * 
   */
  private handleLuckChange (event: DataEvent<number>): void {
    if (this.props.onChange) {
      this.props.onChange(
        Investigator.create({
          ...this.props.value,
          mutables: Mutables.create({
            ...this.props.value.mutables,
            luck: DataReducer.reduce(this.props.value.mutables.luck, event)
          })
        }),
        this.props.value
      )
    }
  }

  /**
   * 
   */
  private handleLuckIncrement (event: IncrementEvent): void {
    console.log(event)
  }

  /**
   * @see React.Component.render
   */
  public render (): ReactElement {
    const characteristics: CharacteristicSet = this.props.value.characteristics
    const mutables: Mutables = this.props.value.mutables

    return (
        <div className='container-fluid'>
          <div className='row'>            
            <div className='col-4 col-md-6'>
              <CopyField value={characteristics.appearance.toString()} className='align-items-center'>
                <Label>Apparence</Label>
                <ValueRenderer>{characteristics.appearance}</ValueRenderer>
              </CopyField>
            </div>
            <div className='col-4 col-md-6'>
              <CopyField value={characteristics.education.toString()} className='align-items-center'>
                <Label>Éducation</Label>
                <ValueRenderer>{ characteristics.education }</ValueRenderer>
              </CopyField>
            </div>
            <div className='col-4 col-md-6'>
              <CopyField value={characteristics.power.toString()} className='align-items-center'>
                <Label>Pouvoir</Label>
                <ValueRenderer>{ characteristics.power }</ValueRenderer>
              </CopyField>
            </div>
            <div className='col-4 col-md-6'>
              <CopyField value={characteristics.constitution.toString()} className='align-items-center'>
                <Label>Constitution</Label>
                <ValueRenderer>{ characteristics.constitution }</ValueRenderer>
              </CopyField>
            </div>
            <div className='col-4 col-md-6'>
              <CopyField value={characteristics.strength.toString()} className='align-items-center'>
                <Label>Force</Label>
                <ValueRenderer>{ characteristics.strength }</ValueRenderer>
              </CopyField>
            </div>
            <div className='col-4 col-md-6'>
             <CopyField value={characteristics.size.toString()} className='align-items-center'>
                <Label>Taille</Label>
                <ValueRenderer>{ characteristics.size }</ValueRenderer>
              </CopyField>
            </div>
            <div className='col-4 col-md-6'>
              <CopyField value={characteristics.dexterity.toString()} className='align-items-center'>
                <Label>Dextérité</Label>
                <ValueRenderer>{ characteristics.dexterity }</ValueRenderer>
              </CopyField>
            </div>
            <div className='col-4 col-md-6'>
              <CopyField value={characteristics.intelligence.toString()} className='align-items-center'>
                <Label>Intelligence</Label>
                <ValueRenderer>{ characteristics.intelligence }</ValueRenderer>
              </CopyField>
            </div>
            <div className='col-4 col-md-6'>
              <ValueField maximum={100} minimum={0} onChange={this.handleLuckChange} value={mutables.luck}>
                <Label>Chance</Label>
              </ValueField>
            </div>
          </div>
        </div>
    )
  }
}


/**
 * 
 */
export namespace CharacteristicSetRenderer {
  /**
   * 
   */
  export type ChangeCallback = (next: Investigator, previous: Investigator) => void

  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    readonly className?: string | undefined,

    /**
     * 
     */
    readonly value: Investigator,

    /**
     * 
     */
    readonly onChange?: ChangeCallback | undefined
  }
}