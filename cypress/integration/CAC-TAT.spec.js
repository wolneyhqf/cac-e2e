/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')  
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName')
            .should('be.visible')
            .type('John')
            .should('have.value', 'John')

        cy.get('#lastName')
            .should('be.visible')
            .type('Doe')
            .should('have.value', 'Doe')

        cy.get('#email')
            .should('be.visible')
            .type('john.doe@gmail.com')
            .should('have.value', 'john.doe@gmail.com')

        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras commodo ornare urna et pulvinar. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In tempor arcu pharetra purus aliquet venenatis. In faucibus, turpis nec pharetra rutrum, nunc mauris lobortis nulla, eu vestibulum erat neque non elit. Nunc in purus quis mauris commodo vestibulum. Morbi placerat placerat pharetra. Pellentesque massa sapien, convallis in ex id, commodo ultricies velit. Sed sodales tellus porttitor ipsum pretium, ut elementum erat posuere. Curabitur et nibh iaculis, lacinia turpis et, pretium purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus in neque vitae condimentum. Curabitur suscipit et purus sed ornare.'
        cy.get('#open-text-area')
            .should('be.visible')
            .type(longText, {delay: 0})
            .should('have.value', longText)

        cy.contains('button', 'Enviar')
            .should('be.visible')
            .click()

        cy.get('.success')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Doe')
        cy.get('#email').type('john.doe')
        cy.get('#open-text-area').type('Test')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('verifica se o campo de telefone só aceita números', function() {
        cy.get('#phone').type('my number').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Doe')
        cy.get('#email').type('john.doe')
        cy.get('#open-text-area').type('Test')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .should('be.visible')
            .type('John')
            .should('have.value', 'John')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .should('be.visible')
            .type('Doe')
            .should('have.value', 'Doe')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .should('be.visible')
            .type('john.doe@gmail.com')
            .should('have.value', 'john.doe@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .should('be.visible')
            .type('81981231180')
            .should('have.value', '81981231180')
            .clear()
            .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

})
