import React from 'react'
import { ReactElement } from 'react'
import { ReactNode } from 'react'

import { SubjectSummary } from '../../components/subject/SubjectSummary'
import { SubjectContent } from '../../components/subject/SubjectContent'
import { SubjectTitle } from '../../components/subject/SubjectTitle'
import { SubjectKeyword } from '../../components/subject/SubjectKeyword'
import { SubjectIdentifier } from '../../components/subject/SubjectIdentifier'
import { Subject } from '../../components/subject/Subject'

import { Feat } from '../../typescript/feat/Feat'

import { Data } from '../data/Data'

function roman (index : number) : string {

  let result : string = ''

  while (index >= 100) {
    result += 'C'
    index -= 100
  }

  while (index >= 10) {
    result += 'X'
    index -= 10
  }

  while (index >= 9) {
    result += 'IX'
    index -= 9
  }

  while (index >= 5) {
    result += 'V'
    index -= 5
  }

  while (index >= 4) {
    result += 'IV'
    index -= 4
  }

  while (index >= 1) {
    result += 'I'
    index -= 1
  }

  return result
}

export function FeatSubject (properties : FeatSubject.Properties) : ReactElement {
  return (
    <Subject>
      <SubjectIdentifier>{'feats-' + properties.children.identifier}</SubjectIdentifier>
      {
        [...properties.children.keywords].map(function (keyword : string, index : number) : ReactElement {
          return <SubjectKeyword key={index}>{keyword}</SubjectKeyword>
        })
      }
      <SubjectTitle>{ properties.children.name }</SubjectTitle>
      <SubjectSummary>

      </SubjectSummary>
      <SubjectContent>
        {properties.children.description}
      </SubjectContent>
    </Subject>
  )
}

export namespace FeatSubject {
  export type Properties = {
    children : Feat
  }
}
