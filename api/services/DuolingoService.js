const fetch = require('node-fetch');


class DuolingoServiceClass {

  constructor() {
    this.user1 = {};
    this.user2 = {};
  }

  getUserData(userToFind, user1or2, isUserOld) {

    if (isUserOld) {
      return this['user' + user1or2];
    }

    const url = `https://www.duolingo.com/users/${userToFind}`;
    const headers = {
      'Pragma': 'no-cache',
      'Accept-Encoding': 'gzip, deflate, lzma, sdch, br',
      'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36 OPR/42.0.2393.94',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Mode': 'no-cors',
      'Cookie': 'lang=en; duo_ab=f1854cb2e7a39e6ef98065a62f3420a4daeb2679eyJzY2hvb2xzX25ld19zaWdudXBfdGVzdCI6IHRydWUsICJ3ZWJfYnJhbmRlZF9tb2JpbGVfYnV0dG9uc190ZXN0IjogZmFsc2UsICJzaWdudXBfbW9kYWxfYnV0dG9uc19leHBlcmltZW50IjogZmFsc2UsICJsb2dpbl9tb2RhbF9leHBlcmltZW50IjogZmFsc2V9; _ga=GA1.2.81721699.1483480535; auth_tkt=c46285b7fb02fae63a267e82c0dd7636586c382028418880!userid_type:int; wuuid=1563278f-f14c-4697-8c26-8502a2c9aeae; AWSELB=91E12D7D1E1B37CA82C3043817CF6AE0B5D25E6E40C00F8DD3EA43A0D7AD4EE7503FA6238BC7ED8745C965B525095F6B5189C9649CB5F401684F98C2E69E62DB7B301FCFC4; mp_mixpanel__c=0; __utma=226518408.81721699.1483480535.1483487466.1483500381.4; __utmc=226518408; __utmz=226518408.1483480565.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)'
    };

    return fetch(url, headers)
      .then(res => res.json())
      .then(data => {

        this['user' + user1or2] = data;

        return data;
      });
  }
}

module.exports = new DuolingoServiceClass();
