import React from 'react'
import { Link } from 'gatsby'

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'

// styles
const useStyles = makeStyles((theme) => ({
  appBar: {
    width: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  title: {
    textTransform: 'capitalize'
  },
  button: {
    marginRight: theme.spacing(8)
  }
}))

/**
 * SimpleHeader renders a page header
 *
 * Props:
 *
 * title - adds page title to header
 */

// markup
const SimpleHeader = (props) => {
  const { appBar, title, button } = useStyles()

  return (
    <AppBar position='relative' className={appBar}>
      <Toolbar>
        {props.btnText
          ? <Link to='/'>
            <Button
              data-testid='header-button'
              variant='contained'
              color='default'
              size='small'
              className={button}
            >
              {props.btnText}
            </Button>
          </Link>
          : null}
        {props.title
          ? <Typography
              data-testid='header-title'
              variant='h5' component='h1'
              className={title}
            >
            {props.title}
          </Typography>
          : null}
      </Toolbar>
    </AppBar>
  )
}

export default SimpleHeader
