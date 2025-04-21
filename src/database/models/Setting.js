const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  site: {
    title: {
      pt: {
        type: String,
        default: 'Palavra do Dia'
      },
      en: {
        type: String,
        default: 'Word of the Day'
      }
    },
    description: {
      pt: {
        type: String,
        default: 'Uma palavra diária para reflexão e inspiração'
      },
      en: {
        type: String,
        default: 'A daily word for reflection and inspiration'
      }
    }
  },
  imageGeneration: {
    defaultWordBackground: {
      type: String,
      default: '#172d4d'
    },
    defaultWordTextColor: {
      type: String,
      default: '#daa520'
    },
    defaultReflectionBackground: {
      type: String,
      default: '#daa520'
    },
    defaultReflectionTextColor: {
      type: String,
      default: '#ffffff'
    },
    defaultFontFamily: {
      type: String,
      default: 'serif'
    },
    defaultFontSize: {
      type: Number,
      default: 36
    },
    defaultWidth: {
      type: Number,
      default: 1080
    },
    defaultHeight: {
      type: Number,
      default: 1080
    }
  },
  comments: {
    enabled: {
      type: Boolean,
      default: true
    },
    requireModeration: {
      type: Boolean,
      default: true
    },
    notifyOnNew: {
      type: Boolean,
      default: true
    }
  },
  analytics: {
    enabled: {
      type: Boolean,
      default: true
    },
    trackCountry: {
      type: Boolean,
      default: true
    },
    trackDevice: {
      type: Boolean,
      default: true
    },
    trackTimeSpent: {
      type: Boolean,
      default: true
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Setting', SettingSchema);
