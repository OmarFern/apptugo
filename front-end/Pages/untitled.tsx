import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

const Untitled: FunctionComponent = (props: any) => {
  const classes = baseClasses

  return (
    <React.Fragment>
      <div className={classes.mainPanel}></div>
    </React.Fragment>
  )
}

export default Untitled
