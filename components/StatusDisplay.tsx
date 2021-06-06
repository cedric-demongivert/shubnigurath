import { PureComponent } from 'react'
import { ReactElement } from 'react'

import { Field } from './Field'
import { Label } from './Label'
import { MovementControl } from './form/MovementControl'
import { BoundStatisticControl } from './form/BoundStatisticControl'
import { TextControl } from './form/TextControl'
import { BooleanControl } from './form/BooleanControl'

import { Investigator } from '../typescript/Investigator'
import { CharacteristicSet } from '../typescript/CharacteristicSet'
import { ControlEvent } from '../typescript/redux/ControlEvent'
import { FieldReducer } from '../typescript/redux/FieldReducer'
import { Empty } from '../typescript/utils'
import { Mutables } from '../typescript/Mutables'

/**
 * 
 */
export class StatusDisplay extends PureComponent<StatusDisplay.Properties> {
  /**
   * 
   */
  public static defaultProps: StatusDisplay.OptionalProperties = {
    /**
     * 
     */
    onChange: Empty.callback
  }

  /**
   * 
   */
  public constructor(properties: StatusDisplay.Properties) {
    super(properties)
    
    this.handleTemporaryInsaneChange = this.handleTemporaryInsaneChange.bind(this)
    this.handleIndefinitelyInsaneChange = this.handleIndefinitelyInsaneChange.bind(this)
    this.handleMajorWoundChange = this.handleMajorWoundChange.bind(this)
  }

  /**
   * 
   */
  public handleTemporaryInsaneChange (event: ControlEvent): void {
    this.props.onChange(
      Mutables.create({
        ...this.props.value,
        temporaryInsane: FieldReducer.reduce(this.props.value.temporaryInsane, event)
      }),
      this.props.value
    )
  }

  /**
   * 
   */
  public handleIndefinitelyInsaneChange (event: ControlEvent): void {
    this.props.onChange(
      Mutables.create({
        ...this.props.value,
        indefinitelyInsane: FieldReducer.reduce(this.props.value.indefinitelyInsane, event)
      }),
      this.props.value
    )
  }

  /**
   * 
   */
  public handleMajorWoundChange (event: ControlEvent): void {
    this.props.onChange(
      Mutables.create({
        ...this.props.value,
        majorWound: FieldReducer.reduce(this.props.value.majorWound, event)
      }),
      this.props.value
    )
  }

  /**
   * 
   */
  public render (): ReactElement {
    const investigator: Investigator = this.props.investigator
    const mutables: Mutables = this.props.value
    const characteristics: CharacteristicSet = investigator.characteristics

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-4 col-md-6 col-lg'>
            <Field>
              <Label>Points de vie</Label>
              <BoundStatisticControl readonly value={mutables.health.value} ceil={investigator.maximumHP} />
            </Field>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <Field>
              <Label>Santé mentale</Label>
              <BoundStatisticControl readonly value={mutables.mentalHealth.value} ceil={characteristics.power.sum()} />
            </Field>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <Field>
              <Label>Points de magie</Label>
              <BoundStatisticControl readonly value={mutables.magic.value} ceil={investigator.maximumMP} />
            </Field>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <Field>
              <Label>Blessure grave</Label>
              <BooleanControl 
                value={mutables.majorWound.value} 
                focus={mutables.majorWound.focus} 
                onChange={this.handleMajorWoundChange}
              />
            </Field>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <Field>
              <Label>Folie temporaire</Label>
              <BooleanControl 
                value={mutables.temporaryInsane.value} 
                focus={mutables.temporaryInsane.focus}
                onChange={this.handleTemporaryInsaneChange}
              />
            </Field>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <Field>
              <Label>Folie persistante</Label>
              <BooleanControl 
                value={mutables.indefinitelyInsane.value} 
                focus={mutables.indefinitelyInsane.focus}
                onChange={this.handleIndefinitelyInsaneChange}
              />
            </Field>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <Field>
              <Label>Impact</Label>
              <TextControl className='text-center' readonly value={investigator.impact} />
            </Field>
          </div>
          <div className='col-4 col-md-6 col-lg'>
            <Field>
              <Label>Carrure</Label>
              <TextControl className='text-center' readonly value={investigator.carrure} />
            </Field>
          </div>
          <div className='col-4 col-md-6 col-lg'>
           <Field>
              <Label>Mouvement</Label>
              <MovementControl readonly value={investigator.movement} />
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
export namespace StatusDisplay {
  /**
   * 
   */
  export type ChangeCallback = (next: Mutables, previous: Mutables) => void

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
    readonly investigator: Investigator,

    /**
     * 
     */
    readonly value: Mutables
  }

  /**
   * 
   */
  export type Properties = OptionalProperties & RequiredProperties
}