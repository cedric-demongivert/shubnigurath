import { ReactElement } from 'react'
import { Skill } from '../typescript/Skill'
import { Value } from '../typescript/Value'

import { Padding } from './Padding'

export function SkillLine(properties: SkillLine.Properties) : ReactElement {
  const name: string = properties.skill.toString()

  const base: number = properties.value.sum()
  const halved: number = properties.value.half()
  const fifth: number = properties.value.fifth()

  const dbase = base.toString()
  const dhalved = (halved > 0 ? halved : base > 0 ? 1 : 0).toString()
  const dfifth = (fifth > 0 ? fifth : base > 0 ? 1 : 0).toString()

  return (
    <div key={name} className='skill skill-default'>
      <div className='skill-name'>
        {name.substr(0, 1).toLocaleUpperCase()}{name.substr(1)}
      </div>
      <div className='skill-filler' />
      <div className='skill-values'>
        <div className='skill-value'>
          <Padding padding={' '} of={dbase} size={2} />{dbase}<span className='percent'>%</span>
        </div>
        <div className='skill-separator'>·</div>
        <div className='skill-value'>
          <Padding padding={' '} of={dhalved} size={2} />{dhalved}<span className='percent'>%</span>
        </div>
        <div className='skill-separator'>·</div>
        <div className='skill-value'>
          <Padding padding={' '} of={dfifth} size={2} />{dfifth}<span className='percent'>%</span>
        </div>
      </div>
    </div>
  )
}

/**
 * 
 */
export namespace SkillLine {
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
    skill: Skill,

    /**
     * 
     */
    value: Value
  }
}