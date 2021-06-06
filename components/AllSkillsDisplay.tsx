import { Label } from './Label'

import { Investigator } from '../typescript/Investigator'
import { ReactElement } from 'react'
import { Skill } from '../typescript/Skill'
import { Value } from '../typescript/Value'
import { Pair } from '../typescript/data/Pair'

import { SkillSet } from '../typescript/SkillSet'
import { SkillLine } from './SkillLine'

function renderSkill(pair: Pair<Skill, Value>) : ReactElement {
  return <SkillLine skill={pair.left} value={pair.right} key={pair.left.toString()} />
}

/**
 * 
 */
export function AllSkillsDisplay (properties: AllSkillsDisplay.Properties) {  
  const defaultSkills: SkillSet = properties.value.computeDefaultSkills().minus(properties.value.skills)
  const skills: SkillSet = properties.value.skills.inherit(properties.value.computeDefaultSkills())

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12 col-md-12 col-lg'>
          <Label>Compétences (Expertise)</Label>
          { skills.entries.map(renderSkill) }
        </div>
        <div className='col-12 d-block d-lg-none'>
          <br/>
        </div>
        <div className='col-12 col-md-6 col-lg'>
          <Label>Compétences (Défaut)</Label>
          { defaultSkills.entries.slice(0, defaultSkills.entries.size >> 1).map(renderSkill) }
        </div>
        <div className='col-12 col-md-6 col-lg'>
          <Label className='d-none d-md-flex'>Compétences (Défaut)</Label>
          { defaultSkills.entries.slice(defaultSkills.entries.size >> 1).map(renderSkill) }
        </div>
      </div>
    </div>
  )
}

/**
 * 
 */
export namespace AllSkillsDisplay {
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