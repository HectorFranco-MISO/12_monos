
import { faker } from '@faker-js/faker'

describe('Los Estudiantes bajo ataque', function () {

  it('Visitar LosEstudiantes y sobrevrivir al ataque del Ejercito de los 12 Monos', { retries: 20 }, function () {

    // Definir semilla de aleatoriedad
    faker.seed(1000)

    // Definir el número de monkeys a usar
    const monkeys = faker.number.int({ min: 1, max: 15 })
    cy.log(`Atacar Los Estudiantes con ${monkeys} monos`)

    // Visitar la página web
    cy.visit('https://losestudiantes.com');
    cy.wait(1000);

    // Eventos aleatorios
    cy.log('Inicia randomEvent()')
    randomEvent(monkeys);
  })
})

/**
 * Genera eventos aleatorios con los monos disponibles
 * @param {Integer} monkeysLeft número de monos disponibles
 */
function randomEvent(monkeysLeft) {

  var monkeysLeft = monkeysLeft;
  if (monkeysLeft > 0) {

    cy.log('Monos disponibles', monkeysLeft)

    // El monkey escoge aleatoriamente qué evento realizar
    const chooseEvent = getRandomInt(0, 10)

    // Listado de eventos disponibles
    switch (chooseEvent) {
      case 0:
        randomClicksOverLinks()
        break;

      case 1:
        randomInputFills()
        break;

      case 2:
        randomSelectsOverComboBox()
        break;

      case 3:
        randomClicksOverButtons()
        break;

      case 4:
        randomDoubleClicksOverButtons()
        break;

      case 5:
        randomWindowScroll()
        break;

      case 6:
        randomGoVisit()
        break;

      case 7:
        randomSetCookies()
        break;

      case 8:
        randomSetViewport()
        break;

      case 9:
        randomTakeScreenshots()
        break;

      default:
        break;
    }

    monkeysLeft--;
    cy.wait(1000)
    randomEvent(monkeysLeft)

  }
}

/**
 * Genera clicks aleatorios en los links de la página
 */
function randomClicksOverLinks() {

  cy.log('*******************')
  cy.log('randomClicksOverLinks')
  cy.log('*******************')

  cy.get('a').then(($links) => {
    var randomLink = $links.get(getRandomInt(0, $links.length));
    if (!Cypress.dom.isHidden(randomLink))
      cy.wrap(randomLink).click({ force: true });
  });

}

/**
 * Generar entradas aleatorias en los inputs de la página
 */
function randomInputFills() {

  cy.log('*******************')
  cy.log('randomInputFills')
  cy.log('*******************')

  cy.get('input').then(($inputs) => {
    var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
    if (!Cypress.dom.isHidden(randomInput)) {

      // Datos aleatorios para los inputs
      const randomValue = [
        faker.person.fullName(),
        faker.internet.email(),
        faker.internet.password(),
        faker.phone.number()
      ]

      cy.wrap(randomInput).type(randomValue[getRandomInt(0, randomValue.length)], { force: true })
    }
  });
}

/**
 * Selecciona opciones al azar sobre 
 */
function randomSelectsOverComboBox() {

  cy.log('*******************')
  cy.log('randomSelectsOverComboBox')
  cy.log('*******************')

  cy.get('select').then(($dropdowns) => {
    var randomDropdown = $dropdowns.get(getRandomInt(0, $dropdowns.length));
    if (!Cypress.dom.isHidden(dropdowns))
      cy.wrap(randomDropdown).select(
        randomDropdown.options[getRandomInt(0, randomDropdown.options.length)],
        { force: true }
      );
  });

}

/**
 * Genera clicks aleatorios en los botones de la página
 */
function randomClicksOverButtons() {

  cy.log('*******************')
  cy.log('randomClicksOverButtons')
  cy.log('*******************')

  cy.get('button').then(($buttons) => {
    var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
    if (!Cypress.dom.isHidden(randomButton))
      cy.wrap(randomButton).click({ force: true });
  });

}

/**
 * Genera clicks aleatorios en los botones de la página
 */
function randomDoubleClicksOverButtons() {

  cy.log('*******************')
  cy.log('randomDoubleClicksOverButtons')
  cy.log('*******************')

  cy.get('button').then(($buttons) => {
    var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
    if (!Cypress.dom.isHidden(randomButton))
      cy.wrap(randomButton).dblclick({ force: true });
  });

}

/**
 * Genera scrolls aleatorios en toda la página web
 */
function randomWindowScroll() {

  cy.log('*******************')
  cy.log('randomWindowScroll')
  cy.log('*******************')

  const posY = getRandomInt(0, 100)
  const options = ['topLeft', 'top', 'topRight', 'left', 'center', 'right', 'bottomLeft', 'bottom', 'bottomRight']
  const randomOption = options[getRandomInt(0, options.length)]
  cy.window().scrollTo(randomOption, `${posY}%'`)

}

/**
 * Va a los sitios de las universidades de forma aleatoria
 */
function randomGoVisit() {

  cy.log('*******************')
  cy.log('randomWindowScroll')
  cy.log('*******************')

  const universities = [
    'uniandes',
    'universidad-nacional',
    'pontificia-universidad-javeriana',
    'universidad-del-rosario',
    'about',
    'terms',
    'privacy',
    ''
  ]
  cy.visit(`https://losestudiantes.com/${universities[getRandomInt(0, universities.length)]}`)

  cy.wait(2000)

}

/**
 * Genera cookies aleatorias que son guardadas en el navegador
 */
function randomSetCookies() {

  cy.log('*******************')
  cy.log('randomSetCookies')
  cy.log('*******************')

  const cookiesAmount = getRandomInt(4, 20)

  for (let i = 0; i < cookiesAmount; i++) {

    const cookieKey = faker.word.verb()
    const cookieValue = faker.word.interjection()

    cy.setCookie(cookieKey, cookieValue)
    cy.getCookie(cookieKey).should('have.property', 'value', cookieValue)

  }

}

/**
 * Cambia el tamaño del Viewport de forma aleatoria
 */
function randomSetViewport() {

  cy.log('*******************')
  cy.log('randomSetCookies')
  cy.log('*******************')

  const width = getRandomInt(64, 2048)
  const height = getRandomInt(64, 2048)

  cy.viewport(width, height)

}

/**
 * Toma Screenshots de la vista actual
 */
function randomTakeScreenshots() {

  cy.log('*******************')
  cy.log('randomSetCookies')
  cy.log('*******************')

  cy.screenshot()

}

/**
 * Helper: Ayuda a obtener valores aleatorios 
 * con base a dos párametros enteros
 * @param {Integer} min valor mínimo 
 * @param {Integer} max valor máximo 
 * @returns Integer: un valor entero entre el mínimo y máximo excluyente
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
