import { ReactElement } from 'react'

import { Investigator } from '../../../typescript/Investigator'
import { Skill } from '../../../typescript/Skill'
import { Value } from '../../../typescript/Value'
import { Pair } from '../../../typescript/data/Pair'
import { SkillSet } from '../../../typescript/SkillSet'

import { Label } from '../../Label'

import { SkillLine } from './SkillLine'

function renderSkill(updates: SkillSet, onSelect: (skill: Skill) => void, pair: Pair<Skill, Value>) : ReactElement {
  return <SkillLine 
    className={'is-clickable'} 
    selected={updates.has(pair.left)} 
    skill={pair.left} 
    value={pair.right} 
    key={pair.left.toString()} 
    onClick={onSelect.bind(undefined, pair.left)}
  />
}

/**
 * 
 */
export function AllSkillsRenderer (properties: AllSkillsRenderer.Properties) {  
  const defaultSkills: SkillSet = properties.value.computeDefaultSkills().minus(properties.value.skills)
  const skills: SkillSet = properties.value.skills.inherit(properties.value.computeDefaultSkills())

  const handleSkillRendering = renderSkill.bind(undefined, properties.value.updates, properties.onSelect)

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12 col-md-12 col-lg'>
          <Label>Compétences (Expertise)</Label>
          { skills.entries.map(handleSkillRendering) }
        </div>
        <div className='col-12 d-block d-lg-none'>
          <br/>
        </div>
        <div className='col-12 col-md-6 col-lg'>
          <Label>Compétences (Défaut)</Label>
          { defaultSkills.entries.slice(0, defaultSkills.entries.size >> 1).map(handleSkillRendering) }
        </div>
        <div className='col-12 col-md-6 col-lg'>
          <Label className='d-none d-md-flex'>Compétences (Défaut)</Label>
          { defaultSkills.entries.slice(defaultSkills.entries.size >> 1).map(handleSkillRendering) }
        </div>
      </div>
    </div>
  )
}

/**
 * 
 */
export namespace AllSkillsRenderer {
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
    value: Investigator,

    /**
     * 
     */
    onSelect: (skill: Skill) => void
  }
}