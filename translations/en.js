export default {
  formContact: {
    legend: 'Let\'s chat together',
    fields: {
      name: 'My name is',
      mail: 'you can contact me at',
      message: 'I\'d like to talk about'
    },
    submit: "Send",
  },
  goToWebsite: {
    fr: 'Consulter le site en français',
    en: 'Go to website in english',
  },
  socials: {
    goTo: 'Check my %label%'
  },
  nav: {
    work: 'Work',
    about: 'About',
  },
  footer: {
    designBy: `
      Design with <span aria-hidden="true">%emoji%</span>
      <span className="hidden">skills</span>
      by <strong className="font-500">%name%</strong>
    `,
    codeBy: `
      Greatly developed with <span aria-hidden="true">%emoji%</span>
      <span className="hidden">love</span>
      by <strong className="font-500">
        <a title="Check %name%'s Github" href="https://github.com/naomihauret">%name%</a>
      </strong>
    `,
  },
  pages: {
    home: {
      seeMore: 'Want to see more ?',
      goToProject: 'Go to project %name%',
    },
    work: {
      seeMore: {
        title: 'Want to see more ?',
        paragraph: 'You can check <a href="%workUrl%">my projects</a> or you can learn <a href="%aboutUrl%">about me</a>.'
      },
    }
  },
}