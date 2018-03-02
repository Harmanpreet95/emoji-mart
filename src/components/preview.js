import React from 'react'
import PropTypes from 'prop-types'

import { Emoji, Skins } from '.'
import { getData } from '../utils'

export default class Preview extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { emoji: null }
  }

  render() {
    var { emoji } = this.state,
      { emojiProps, skinsProps, showSkinTones, title, emoji: idleEmoji } = this.props

    if (emoji) {
      var emojiData = getData(emoji),
        { emoticons = [] } = emojiData,
        knownEmoticons = [],
        listedEmoticons = []

      emoticons.forEach(emoticon => {
        if (knownEmoticons.indexOf(emoticon.toLowerCase()) >= 0) {
          return
        }

        knownEmoticons.push(emoticon.toLowerCase())
        listedEmoticons.push(emoticon)
      })

      return (
        <div className="emoji-mart-preview">
          <div className="emoji-mart-preview-emoji">
            {Emoji({ key: emoji.id, emoji: emoji, ...emojiProps })}
          </div>

          <div className="emoji-mart-preview-data">
            <div className="emoji-mart-preview-name">{emoji.name}</div>
            <div className="emoji-mart-preview-shortnames">
              {emojiData.short_names.map(short_name => (
                <span key={short_name} className="emoji-mart-preview-shortname">
                  :{short_name}:
                </span>
              ))}
            </div>
            <div className="emoji-mart-preview-emoticons">
              {listedEmoticons.map(emoticon => (
                <span key={emoticon} className="emoji-mart-preview-emoticon">
                  {emoticon}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="emoji-mart-preview">
          <div className="emoji-mart-preview-emoji">
            {idleEmoji &&
              idleEmoji.length &&
              Emoji({ emoji: idleEmoji, ...emojiProps })}
          </div>

          <div className="emoji-mart-preview-data">
            <span className="emoji-mart-title-label">{title}</span>
          </div>

          {showSkinTones && (
            <div className="emoji-mart-preview-skins">
              <Skins {...skinsProps} />
            </div>
          )}
        </div>
      )
    }
  }
}

Preview.propTypes = {
  showSkinTones: PropTypes.bool,
  title: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  emojiProps: PropTypes.object.isRequired,
  skinsProps: PropTypes.object.isRequired,
}

Preview.defaultProps = {
  showSkinTones: true,
  onChange: () => {},
}
