const default_title = 'TestRail Integration Platform';
const default_description =
  'Railflow is a set of tools that helps TestRail users easily integrated any CICD systems like Jenkins, TeamCity, Gitlab, Github, and Travis and any testing framework and tools like Selenium, TestNG, Jest, Cucumber, Postman, Katalon, etc with TestRail.'

module.exports = {
  default: {
    title: default_title,
    titleTemplate: '%s', // outputs: "default title | Railflow"
    description: default_description,
    canonical: 'https://railflow.io',
    language: 'en',
    openGraph: {
      type: 'website',
      url: 'https://railflow.io',
    },
  },
  index_page: {
    title: 'TestRail Integration Plaform and Tools - Railflow',
    description: default_description
  },
  downloads_page: {
    title: 'Downloads',
    description: default_description,
  },
};
