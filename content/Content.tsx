import React from 'react'
import { ReactElement } from 'react'

import { SubjectSummary } from '../components/subject/SubjectSummary'
import { SubjectContent } from '../components/subject/SubjectContent'
import { SubjectTitle } from '../components/subject/SubjectTitle'
import { SubjectIdentifier } from '../components/subject/SubjectIdentifier'
import { Subject } from '../components/subject/Subject'

import { Characteristics } from './characteristics'
import { Masteries } from './masteries'
import { Knowledges } from './knowledges'
import { Summary } from './Summary'
import { Feats } from './feats'
import { CoreRules } from './rules/core'
import { FightRules } from './rules/fight'
import { Echoes } from './echoes'
import { Alchemy } from './alchemy'

export function Content () : ReactElement {
  return (
    <Subject>
      <SubjectIdentifier>rules</SubjectIdentifier>
      <SubjectTitle>Table des lois</SubjectTitle>
      <SubjectSummary>
        <p> Règles du jeu corvus </p>
      </SubjectSummary>
      <SubjectContent>
        <Summary />
        <Characteristics />
        <Masteries />
        <Knowledges />
        <Feats />
        <CoreRules />
        <FightRules />
        <Echoes />
        <Alchemy />
      </SubjectContent>
    </Subject>
  )
}
