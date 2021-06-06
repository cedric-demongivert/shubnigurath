import { Label } from './Label'

import { Investigator } from '../typescript/Investigator'
import { ReactElement } from 'react'
import { SkillSet } from '../typescript/SkillSet'
import { Skill } from '../typescript/Skill'
import { Value } from '../typescript/Value'
import { Pair } from '../typescript/data/Pair'

import { SkillLine } from './SkillLine'

function renderSkill(pair: Pair<Skill, Value>) : ReactElement {
  return <SkillLine skill={pair.left} value={pair.right} key={pair.left.toString()} />
}

/**
 * 
 */
export function DefaultSkills (properties: DefaultSkills.Properties) {
  const skills: SkillSet = properties.value.computeDefaultSkills().minus(properties.value.skills)
  
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <Label>Compétences (Défaut)</Label>
        </div>
        <div className='col-12 col-lg-6'>
          { skills.entries.slice(0, skills.entries.size >> 1).map(renderSkill) }
        </div>
        <div className='col-12 col-lg-6'>
          { skills.entries.slice(skills.entries.size >> 1).map(renderSkill) }
        </div>
      </div>
    </div>
  )
}

/**
 * 
 */
export namespace DefaultSkills {
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