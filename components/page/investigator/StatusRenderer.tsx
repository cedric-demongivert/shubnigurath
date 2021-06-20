import { PureComponent } from 'react'
import { ReactElement } from 'react'

import { Investigator } from '../../../typescript/Investigator'
import { CharacteristicSet } from '../../../typescript/CharacteristicSet'
import { Empty } from '../../../typescript/utils'
import { Mutables } from '../../../typescript/Mutables'
import { DataEvent, DataReducer } from '../../../typescript/redux'

import { Label } from '../../Label'
import { BooleanField } from '../../form/BooleanField'
import { BoundStatisticField } from '../../form/BoundStatisticField'

import { CopyField } from './CopyField'
import { MovementRenderer } from './MovementRenderer'


/**
 * 
 */
export class StatusRenderer extends PureComponent<StatusRenderer.Properties> {
  /**
   * 
   */
  public static defaultProps: StatusRenderer.OptionalProperties = {
    /**
     * 
     */
    onChange: Empty.callback
  }

  /**
   * 
   */
  public constructor(properties: StatusRenderer.Properties) {
    super(properties)
    
    this.handleTemporaryInsaneChange = this.handleTemporaryInsaneChange.bind(this)
    this.handleIndefinitelyInsaneChange = this.handleIndefinitelyInsaneChange.bind(this)
    this.handleMajorWoundChange = this.handleMajorWoundChange.bind(this)
    this.handleHealthChange = this.handleHealthChange.bind(this)
    this.handleMagicChange = this.handleMagicChange.bind(this)
    this.handleMentalHealthChange = this.handleMentalHealthChange.bind(this)
  }

  /**
   * 
   */
  public handleTemporaryInsaneChange (event: DataEvent<boolean>): void {
    this.props.onChange(
      Investigator.create({
        ...this.props.value,
        mutables: Mutables.create({
          ...this.props.value.mutables,
          temporaryInsane: DataReducer.reduce(this.props.value.mutables.temporaryInsane, event)
        })
      }),
      this.props.value
    )
  }

  /**
   * 
   */
  public handleIndefinitelyInsaneChange (event: DataEvent<boolean>): void {
    this.props.onChange(
      Investigator.create({
        ...this.props.value,
        mutables: Mutables.create({
          ...this.props.value.mutables,
          indefinitelyInsane: DataReducer.reduce(this.props.value.mutables.indefinitelyInsane, event)
        })
      }),
      this.props.value
    )
  }

  /**
   * 
   */
  public handleMajorWoundChange (event: DataEvent<boolean>): void {
    this.props.onChange(
      Investigator.create({
        ...this.props.value,
        mutables: Mutables.create({
          ...this.props.value.mutables,
          majorWound: DataReducer.reduce(this.props.value.mutables.majorWound, event)
        })
      }),
      this.props.value
    )
  }

  /**
   * 
   */
  public handleHealthChange (event: DataEvent<number>): void {
    this.props.onChange(
      Investigator.create({
        ...this.props.value,
        mutables: Mutables.create({
          ...this.props.value.mutables,
          health: DataReducer.reduce(this.props.value.mutables.health, event)
        })
      }),
      this.props.value
    )
  }

  /**
   * 
   */
  public handleMagicChange (event: DataEvent<number>): void {
    this.props.onChange(
      Investigator.create({
        ...this.props.value,
        mutables: Mutables.create({
          ...this.props.value.mutables,
          magic: DataReducer.reduce(this.props.value.mutables.magic, event)
        })
      }),
      this.props.value
    )
  }

  /**
   * 
   */
  public handleMentalHealthChange (event: DataEvent<number>): void {
    this.props.onChange(
      Investigator.create({
        ...this.props.value,
        mutables: Mutables.create({
          ...this.props.value.mutables,
          mentalHealth: DataReducer.reduce(this.props.value.mutables.mentalHealth, event)
        })
      }),
      this.props.value
    )
  }

  /**
   * 
   */
  public render (): ReactElement {
    const investigator: Investigator = this.props.value
    const mutables: Mutables = this.props.value.mutables
    const characteristics: CharacteristicSet = investigator.characteristics

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-4 col-md-6 col-lg'>
            <BoundStatisticField onChange={this.handleHealthChange} value={mutables.health} maximum={investigator.maximumHP}>
              <Label>Points de vie</Label>
            </BoundStatisticField>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <BoundStatisticField onChange={this.handleMentalHealthChange} value={mutables.mentalHealth} maximum={characteristics.power.sum()}>
              <Label>Santé mentale</Label>
            </BoundStatisticField>
          </div>
          <div className='col-4 col-md-6 col-lg'> 
            <BoundStatisticField onChange={this.handleMagicChange} value={mutables.magic} maximum={investigator.maximumMP}>
              <Label>Points de magie</Label>
            </BoundStatisticField>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <BooleanField value={mutables.majorWound} onChange={this.handleMajorWoundChange}>
              <Label>Blessure grave</Label>
            </BooleanField>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <BooleanField value={mutables.temporaryInsane} onChange={this.handleTemporaryInsaneChange}>
              <Label>Folie temporaire</Label>
            </BooleanField>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <BooleanField value={mutables.indefinitelyInsane} onChange={this.handleIndefinitelyInsaneChange}>
              <Label>Folie persistante</Label>
            </BooleanField>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <CopyField value={investigator.impact} className='align-items-center'>
              <Label>Impact</Label>
              { investigator.impact }
            </CopyField>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <CopyField value={investigator.carrure.toString()} className='align-items-center'>
              <Label>Carrure</Label>
              { investigator.carrure }
            </CopyField>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <CopyField value={investigator.movement.toString()} className='align-items-center'>
              <Label>Mouvement</Label>
              <MovementRenderer value={ investigator.carrure } />
            </CopyField>
          </div>
        </div>
      </div>
    )
  }
}
/**
 * 
 */
export namespace StatusRenderer {
  /**
   * 
   */
  export type ChangeCallback = (next: Investigator, previous: Investigator) => void

  /**
   * 
   */
  export type OptionalProperties = {
    /**
     * 
     */
    readonly className?: string | undefined,

    /**
     * 
     */
    readonly onChange?: ChangeCallback | undefined
  }

  /**
   * 
   */
  export type RequiredProperties = {
    /**
     * 
     */
    readonly value: Investigator
  }

  /**
   * 
   */
  export type Properties = OptionalProperties & RequiredProperties
}