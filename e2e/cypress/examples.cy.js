/// <reference types="cypress" />

// Добро пожаловать в Сайпресс!
//
// Этот файл спецификации содержит различные образцы тестов
// для приложения со списком задач, предназначенного для демонстрации
// возможности написания тестов на Cypress.
//
// Чтобы узнать больше о том, как работает Cypress и
// что делает его таким замечательным инструментом тестирования,
// прочтите наше руководство по началу работы:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
   // Cypress начинает с чистого листа для каждого теста
   // поэтому мы должны указать ему посетить наш веб-сайт с помощью команды `cy.visit()`.
   // Так как мы хотим посещать один и тот же URL в начале всех наших тестов,
   // мы включаем его в нашу функцию beforeEach, чтобы он запускался перед каждым тестом
    cy.visit('https://example.cypress.io/todo')
  })

  it('displays two todo items by default', () => {
    // Мы используем команду cy.get(), чтобы получить все элементы, соответствующие селектору.
    // Затем мы используем `should`, чтобы утверждать, что есть два совпадающих элемента,
    // которые являются двумя элементами по умолчанию.
    cy.get('.todo-list li').should('have.length', 2)

      // Мы можем пойти еще дальше и проверить, что все задачи по умолчанию содержат
      // правильный текст. Мы используем функции `first` и `last`
      // чтобы получить только первый и последний совпадающие элементы по отдельности,
      // и затем выполнить утверждение с `should`.
    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
  })

  it('can add new todo items', () => {
   // Мы будем хранить текст нашего элемента в переменной, чтобы мы могли повторно использовать его
    const newItem = 'Feed the cat'

      // Давайте получим входной элемент и используем команду `type` для
      // вводим наш новый элемент списка. После ввода содержимого нашего элемента,
      // нам также нужно ввести клавишу ввода, чтобы отправить ввод.
      // У этого ввода есть атрибут data-test, поэтому мы будем использовать его для выбора
      // элемент в соответствии с лучшими практиками:
      // https://on.cypress.io/выбор элементов
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

      // Теперь, когда мы ввели наш новый элемент, давайте проверим, действительно ли он был добавлен в список.
      // Так как это самый новый элемент, он должен существовать как последний элемент в списке.
      // Кроме того, с двумя элементами по умолчанию у нас должно быть всего 3 элемента в списке.
      // Так как утверждения возвращают элемент, для которого было установлено утверждение,
      // мы можем связать оба этих утверждения вместе в один оператор.
    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', newItem)
  })

  it('can check off an item as completed', () => {
      // В дополнение к использованию команды `get` для получения элемента по селектору,
      // мы также можем использовать команду `contains`, чтобы получить элемент по его содержимому.
      // Тем не менее, это даст <label>, элемент нижнего уровня, содержащий текст.
      // Чтобы проверить элемент, мы найдем элемент <input> для этого <label>
      // путем обхода dom к родительскому элементу. Оттуда мы можем «найти»
      // дочерний элемент checkbox <input> и используем команду `check` для его проверки.
    cy.contains('Pay electric bill')
      .parent()
      .find('input[type=checkbox]')
      .check()

      // Теперь, когда мы проверили кнопку, мы можем продолжить и убедиться, что
      // что элемент списка теперь помечен как завершенный.
      // Опять же, мы будем использовать `contains`, чтобы найти элемент <label>, а затем использовать команду `parents`
      // пройти несколько уровней вверх по dom, пока не найдем соответствующий элемент <li>.
      // Получив этот элемент, мы можем утверждать, что он имеет завершенный класс.
    cy.contains('Pay electric bill')
      .parents('li')
      .should('have.class', 'completed')
  })

  context('with a checked task', () => {
    beforeEach(() => {
        // Мы возьмем команду, которую мы использовали выше, чтобы отметить элемент
        // Так как мы хотим выполнить несколько тестов, которые начинаются с проверки
        // один элемент, помещаем его в хук beforeEach
        // чтобы он запускался в начале каждого теста.
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check()
    })

    it('can filter for uncompleted tasks', () => {
        // Мы нажмем кнопку «активно», чтобы
        // отображать только незавершенные элементы
      cy.contains('Active').click()

        // После фильтрации мы можем утверждать, что есть только один
        // неполный элемент в списке.
      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Walk the dog')

        // На всякий случай давайте также утверждаем, что задача, которую мы отметили,
        // не существует на странице.
      cy.contains('Pay electric bill').should('not.exist')
    })

    it('can filter for completed tasks', () => {
        // Мы можем выполнить те же действия, что и в предыдущем тесте, чтобы убедиться, что
        // показываются только выполненные задачи
      cy.contains('Completed').click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill')

      cy.contains('Walk the dog').should('not.exist')
    })

    it('can delete all completed tasks', () => {
        // Во-первых, давайте нажмем кнопку "Очистить завершено"
        // `contains` фактически служит здесь двум целям.
        // Во-первых, это гарантирует, что кнопка существует в доме.
        // Эта кнопка появляется только тогда, когда отмечена хотя бы одна задача
        // так что эта команда неявно проверяет, что он действительно существует.
        // Во-вторых, он выбирает кнопку, чтобы мы могли нажать на нее.
      cy.contains('Clear completed').click()

        // Тогда мы можем убедиться, что есть только один элемент
        // в списке и нашего элемента нет
      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill')

          // Наконец, убедитесь, что кнопка очистки больше не существует.
      cy.contains('Clear completed').should('not.exist')
    })
  })
})
