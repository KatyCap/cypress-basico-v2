/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
  cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    /* Fazer comentarios em varias linhas */ 
    it.only('Preenche campos obrigatórios e envia formulário ', function() {
      const longText = 'Teste teste2 rerwe 324234234 dsfsdfsdf wrwerwe'
      cy.get('#firstName').type('Kati')
      cy.get('#lastName').type('Kiec')
      cy.get('#email').type('Kati@teste.com')
      cy.get('#open-text-area').type(longText, { delay: 0 })
      cy.get('#email-checkbox').click() 
      cy.contains('button', 'Enviar').click() 
      cy.get('.success').should('be.visible')
    })  

    it.only('Exibe mensagem de erro ao submeter formulario com email inválido', function() {
      const longText = 'Teste teste2 rerwe 324234234 dsfsdfsdf wrwerwe'
      cy.get('#firstName').type('Kati')
      cy.get('#lastName').type('Kiec')
      cy.get('#email').type('Kati@teste,com')
      cy.get('#open-text-area').type(longText, { delay: 0 })
      cy.get('#email-checkbox').click() 
      cy.get('button[type="submit"]').click() 
      cy.get('.error').should('be.visible')
  })
  
  it.only('Exibe mensagem erro quando o telefone se torna um campo obrigatorio', function() {
    cy.get('#email').type('kati2@teste.com')
      cy.get('#open-text-area').type('teste')
      cy.get('#phone-checkbox').click() 
      cy.get('button[type="submit"]').click() 
      cy.get('.error').should('be.visible')
})

it.only('Campo telefone continua vazio após digitar valor não numérico', function() {
  cy.get('#phone')
  .type('gdfgdf')
  .should('have.value', '')
})

it.only('Preenche limpa os campos e confere valores', function() {
  cy.get('#firstName')
    .type('Kati')  
    .should('have.value', 'Kati')
    .clear()
    .should('have.value', '')
})

it.only('Envia formulário com sucesso usando comando customizado', function() {
cy.fillMandatoryFieldsAndSubmit('Kati2, Kaaaa')
cy.get('.success').should('be.visible')
})

it.only('Seleciona um item num campo de seleção por seu texto', function() {
   cy.get('#product')
   .select('YouTube')
   .should('have.value', 'youtube')
  })
  it.only('Seleciona item por seu valor (value)', function() {
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')  
  })
  it.only('Seleciona item por seu indice', function() {
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')  
  })
  it.only('Marcando campos de input pelo tipo e valor', function() {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback') 
  })
  it.only('Selecionar varias campos do tipo radio e já ir conferindo', function() {
    cy.get('input[type="radio"]')
    .should('have.length', 3) 
    .each(function($radio) {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })
    it.only('Marca mais de um check e desmarca o ultimo', function() {
      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
     }) 
     
     it.only('Selecionar um arquivo para upload', function() {
     cy.get('input[type="file"]#file-upload')
     .should('not.have.value')
     .selectFile('./cypress/fixtures/example.json')
     .should(function($input) {
      //console.log($input)
      expect($input[0].files[0].name).to.equal('example.json')
     })
     })   

     it.only('Selecionar um arquivo para upload simulando drag-and-drop', function() {
      cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      //a virgula é para separar e passar o próximo argumento
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input) {
       //console.log($input)
       expect($input[0].files[0].name).to.equal('example.json')
      })
      }) 

      it.only('Selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('aliasArq1')
        cy.get('input[type="file"]')
        .selectFile('@aliasArq1')
        .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
        })
        }) 
  it.only('Verifica que um campo abre em outra aba sem um clique', function() {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
        })
 /*it('Verifica que um campo abre em outra aba sem um clique', function() {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
       })*/
  it.only('Acessa um botão que abre nova aba removendo o target e então clicando no link', function() {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
      cy.contains('Talking About Testing').should('be.visible')
      })
                  
   })
