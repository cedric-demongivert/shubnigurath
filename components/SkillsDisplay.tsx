import { Label } from './form/Label'

import { Investigator } from '../typescript/Investigator'
import { ReactElement } from 'react'
import { Skill } from '../typescript/Skill'
import { Value } from '../typescript/Value'
import { Pair } from '../typescript/data/Pair'

import { SkillLine } from './SkillLine'
import { SkillSet } from '../typescript/SkillSet'

function renderSkill(pair: Pair<Skill, Value>) : ReactElement {
  return <SkillLine skill={pair.left} value={pair.right} key={pair.left.toString()} />
}

/**
 * 
 */
export function SkillsDisplay (properties: SkillsDisplay.Properties) {  
  const skills: SkillSet = properties.value.skills.inherit(properties.value.computeDefaultSkills())

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <Label readonly value='Compétences (Expertise)' />
        </div>
        <div className='col-12'>
          { skills.entries.map(renderSkill) }
        </div>
      </div>
    </div>
  )
}

/**
 * 
 */
export namespace SkillsDisplay {
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