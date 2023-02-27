/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'softer-black0': '#1a1a1a',
        'softer-black1': '#282828',
        'softer-black2': '#3d3d3d',
        'softer-black3': '#4d4d4d',
        'softer-white0': '#f5f5f5',
        'softer-white1': '#f0f0f0',
        'softer-white2': '#f2f2f2',
        'softer-white3': '#f8f8f8',

        'layout-color-light0': '#9b5550',
        'layout-color-light1': '#FF1492FF',

        'layout-color-dark0': '#1a1a1a',
        'layout-color-dark1': '#292929FF',
        // 'layout-color-color-dark1': '#212121FF',
      },
      fontFamily: {
        "Montserrat-VariableFont_wght": ["Montserrat-VariableFont_wght"],
        "Sacramento-Regular": ["Sacramento-Regular"],
        "SourceSansPro-Regular" : ["SourceSansPro-Regular"],
        "SourceSansPro-SemiBold":["SourceSansPro-SemiBold"],
        "SourceSansPro-Italic":["SourceSansPro-Italic"],
        "SourceSansPro-Light":["SourceSansPro-Light"],
        "April-June":["April June"],
        "PlayfairDisplay-VariableFont_wght":["PlayfairDisplay-VariableFont_wght"]
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms'),
  ],
}
