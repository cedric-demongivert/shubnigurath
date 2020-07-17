import React from 'react'
import { ReactElement } from 'react'

import { SubjectSummary } from '../../components/subject/SubjectSummary'
import { SubjectContent } from '../../components/subject/SubjectContent'
import { SubjectTitle } from '../../components/subject/SubjectTitle'
import { SubjectKeyword } from '../../components/subject/SubjectKeyword'
import { SubjectIdentifier } from '../../components/subject/SubjectIdentifier'
import { Subject } from '../../components/subject/Subject'
import { LocalSummary } from '../../components/LocalSummary'

import { Survival } from './survival'

import { Introduction } from './Introduction'

export function Knowledges () : ReactElement {
  return (
    <Subject>
      <SubjectIdentifier>knowledges</SubjectIdentifier>
      <SubjectKeyword>Connaissance</SubjectKeyword>
      <SubjectTitle>Connaissances</SubjectTitle>
      <SubjectSummary>

      </SubjectSummary>
      <SubjectContent>
        <LocalSummary />

        <Introduction />
        <Survival />
      </SubjectContent>
    </Subject>
  )
}