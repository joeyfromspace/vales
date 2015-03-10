// Array of regexes that will match Safari
var browserData = {
  'userAgentParsers': [
    {
      'regex': '(AppleWebKit)/(\\d+)\\.?(\\d+)?\\+ .* Safari',
      'familyReplacement': 'WebKit Nightly'
    },
    {
      'regex': '(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?.*Safari/',
      'familyReplacement': 'Safari'
    },
    {
      'regex': '(Safari)/\\d+'
    },
  ]
};

/**
 * Function to loop through the regex array and compare each regex to the user 
 * agent being reported by the user's browser to check for browser version.
 * @return {string} Browser version that matches the regex of the user agent.
 */
function getBrowserV() {

  for (var i = 0; i < browserData['userAgentParsers'].length; i++) {

    // Get the regex value of the current index and make a regex object from it.
    var currentItem =
      new RegExp(browserData['userAgentParsers'][i]['regex']);

    // Check the string of the user agent against our current regex value.
    var browserMatch = currentItem.exec(navigator.userAgent);

    // If the regex value matches the user agent, create a string to return.
    if (browserMatch) {
      /**
       * If the UA doesn't report a proper browser version, use the replacement
       * from our browserData array.
       */
      if (browserData['userAgentParsers'][i]['v1Replacement']) {
        var browserVersion =
          browserData['userAgentParsers'][i]['v1Replacement'];

        // If there is a browser subversion replacement, add it to our string.
        if (browserData['userAgentParsers'][i]['v2Replacement']) {
          browserVersion +=
            '.' + browserData['userAgentParsers'][i]['v2Replacement'];
        }

      // If the UA provides all the default data then create the string from it.
      } else {
        var browserVersion = browserMatch[2];
      }

      return browserVersion;
    }

  }

};