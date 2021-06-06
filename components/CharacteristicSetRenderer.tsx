import { Investigator } from '../typescript/Investigator'
import { CharacteristicSet } from '../typescript/CharacteristicSet'

import { ValueControl } from './form/ValueControl'

import { Field } from './Field'
import { Label } from './Label'
import { ValueRenderer } from './ValueRenderer'
import { CopyField } from './CopyField'
import { PureComponent, ReactElement } from 'react'
import { ControlEvent } from '../typescript/redux/ControlEvent'
import { FieldReducer } from '../typescript/redux/FieldReducer'
import { Mutables } from '../typescript/Mutables'

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
  }

  /**
   * 
   */
  private handleLuckChange (event: ControlEvent): void {
    if (this.props.onChange) {
      this.props.onChange(
        Mutables.create({
          ...this.props.value,
          luck: FieldReducer.reduce(this.props.value.luck, event)
        }),
        this.props.value
      )
    }
  }

  /**
   * @see React.Component.render
   */
  public render (): ReactElement {
    const characteristics: CharacteristicSet = this.props.investigator.characteristics
    const mutables: Mutables = this.props.value

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
              <Field>
                <Label>Chance</Label>
                <ValueControl maximum={100} minimum={0} onChange={this.handleLuckChange} value={mutables.luck.value} />
              </Field>
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
  export type ChangeCallback = (next: Mutables, previous: Mutables) => void

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
    readonly investigator: Investigator,

    /**
     * 
     */
    readonly value: Mutables,

    /**
     * 
     */
    readonly onChange?: ChangeCallback | undefined
  }
}