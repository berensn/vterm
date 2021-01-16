import { h, Component }       from 'vue'
import { observer }           from 'mobx-vue'
import Store                  from '../store'

// Import the components for the UI/UX
import { TitleBar }           from './titlebar'
import { Terminals }          from './terminals'

// Import defaults
import {
  FONT_FAMILY, FONT_SIZE,
  BACKGROUND, BORDER_RADIUS,
  BORDER_COLOR, FOREGROUND  } from '../defaults/variables'

@observer
export class App extends Component {
  // Styles for our application
  // Using:
  // - Using fixed positioning to make the application
  //   fit entirely the transparent(macos) or
  //   white(windows and linux) space
  // - Using fontFamily and fontSize used in the WHOLE App
  //   Check for user's config otherwhise using default ones.
  // - Using borderRadius, border and background values from the config
  //   otherwhise using default. Also setting foreground for the app
  //   and the terminal
  //   NOTE: On macos the borderRadius is overwritten by the
  //   system if it's less or equal than 6
  // - Extra styles setted by the user and/ore the plugins.

  getStyles() {
    const {
      fontFamily, fontSize,
      borderRadius, background,
      borderColor, foreground
    } = Store.config

    const { App: userStyles }   = Store.config.styles

    // Plugin styles
    const { App: pluginStyles } = Store.styles

    // Styles array
    const styles = {
      // Fixed positioning
      position: 'fixed',
      top: 0, bottom: 0,
      right: 0, left: 0,

      // Using fontFamily and fontSize from user's config
      // otherwhise use default value
      fontFamily: fontFamily
        ? fontFamily + ', ' + FONT_FAMILY
        : FONT_FAMILY,
      fontSize:   fontSize   || FONT_SIZE,

      // Border radius, color and backgorund
      borderRadius: borderRadius || BORDER_RADIUS,
      border: `1px solid ${borderColor || BORDER_COLOR}`,
      background:   background   || BACKGROUND,
      color: foreground || FOREGROUND,

      // User/plugin custom styles
      ...(userStyles   || {}),
      ...(pluginStyles || {})
    }

    return styles
  }

  // Render the core of VTerm; This contains:
  // - Custom <preApp /> elements
  // - Default <Titlebar /> or custom one
  // - Default <Terminals /> list or custom one
  // - TODO: Default <Notifications />
  //         or custom one
  // - Custom <afterApp /> elements

  render() {
    // Retrive custom elements and
    // custom pre/after elements
    const {
      preApp, afterApp,
      TitleBar: _TitleBar,
      Terminals: _Terminals,
      // TODO: Notifications
    } = Store.elements

    // Retriving custom props and our styles
    const { App: appProps } = Store.props
    const styles = this.getStyles()

    // Determinate the components
    // we need to render
    const __TitleBar  = _TitleBar  ? <_TitleBar />  : <TitleBar />
    const __Terminals = _Terminals ? <_Terminals /> : <Terminals />

    return(
      <div
        className='app'
        style={styles}
        {...appProps}
      >
        {preApp}
        {__TitleBar}
        {__Terminals}
        {/* TODO: Notifications */}
        {afterApp}
      </div>
    )
  }
}
