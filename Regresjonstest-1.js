                                                                    //Innlogging informasjon//
                                                        //Brukernavn: sondre-testbruker-admin-1@entur.io//
                                                                      //Passord: 1234_pass//

context('TM-2884 Test - Auth0 -> manuell input av navn og mail på brukere med eksisterende bruker', () => {
    beforeEach(() => {
      cy.visit('https://entur-partner-staging.devstage.entur.io');
    });
    //Sørge for at det blir innloggin med mail og passord//
    it('Login på siden med admin',() => {
      cy.get('a.auth0-lock-alternative-link').each(($elm) => {
        cy.wrap($elm)
          .invoke('text')
          .then((text) => {
            if (text === 'Not your account?') {
              cy.get('.auth0-lock-alternative a').click();
            }
          });
      });

      //Logger inn med mail og passord//
      cy.get('input[name=email]').type('sondre-testbruker-admin-1@entur.io');
      cy.get('input[name=password]').type('1234_pass');
      cy.get('button[type=submit]').click();

      //Navigere til Kassapunkt//
      cy.wait(2000);
      cy.get('title');
      cy.get('a[href*="/point-of-sales"]').should('contain', 'Kassapunkt').click({multiple:true, force: true});

      //Legge til ny Kassapunkt//
      cy.get('.add-button').click();

      //Velge Mobil Terminal//
      cy.wait(4000);
      cy.get('.eds-dropdown-wrapper').should('contain', 'Vennligst velg').click()
        .contains('Mobil Terminal').click();

      //Legger til ny Kassapunkt med eksisterende bruker//
      cy.get('.eds-dropdown__toggle-button').eq(1).click() //Velge eksisterende bruker
        .get('li').first().click();
      cy.get('.eds-dropdown__toggle-button').eq(2).click() //Velge leder
        .get('li').first().click();
      cy.get('.eds-dropdown__toggle-button').eq(3).click() //Velge kassapunktplassering
        .get('li').first().click();
      cy.get('[data-testid="submit-button"]').click();
      cy.get('title'); 

      //Logge ut//
      //cy.get('.eps-user-menu__trigger-button').click();
      //cy.get(':nth-child(1) > .eds-button').first().click()
      });
    });



    context('TM-2884 Test - Auth0 -> manuell input av navn og mail på brukere med en ny bruker', () => {
      beforeEach(() => {
        cy.visit('https://entur-partner-staging.devstage.entur.io');
      })

      //Sørge for at det blir innloggin med mail og passord//
      it('Login på siden med admin',() => {
        cy.get('a.auth0-lock-alternative-link').each(($elm) => {
          cy.wrap($elm)
            .invoke('text')
            .then((text) => {
              if (text === 'Not your account?') {
                cy.get('.auth0-lock-alternative a').click();
              }
            });
        });

        //Logger inn med mail og passord//
        cy.get('input[name=email]').type('sondre-testbruker-admin-1@entur.io');
        cy.get('input[name=password]').type('1234_pass');
        cy.get('button[type=submit]').click();

        //Navigere til Kassapunkt//
        cy.wait(2000);
        cy.get('title');
        cy.get('a[href*="/point-of-sales"]').should('contain', 'Kassapunkt').click({multiple:true, force: true}); //Navigere til "Kassapunkt"

        //Legge til ny Kassapunkt//
        cy.get('.add-button').click();//Legge til ny

        //Velge Mobil Terminal//
        cy.wait(4000);
        cy.get('.eds-dropdown-wrapper').should('contain', 'Vennligst velg').click()//Velge "Mobil Terminal"
          .contains('Mobil Terminal').click();

        //Legger til ny Kassapunkt med ny bruker//
        cy.get(':nth-child(3) > .eds-form-component--radio__radio').click();
        cy.get('[data-testid=email]').type(random_Mail()+'@test123.io'); //Randomisere mailadressen
          function random_Mail() {
              var text = '';
              var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
              for (var i = 0; i < 10; i++);
                text += possible.charAt(Math.floor(Math.random() * possible.length))
              return text;
            }
        cy.get('[data-testid=firstName]').type(random_Fornavn()) //Randomisere fornavn
          function random_Fornavn() {
              var text = '';
              var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
              for (var i = 0; i < 10; i++);
               text += possible.charAt(Math.floor(Math.random() * possible.length))
              return text;
    }
       cy.get('[data-testid=lastName]').type(random_Etternavn()) //Randomisere etternavn
         function random_Etternavn() {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            for (var i = 0; i < 10; i++);
              text += possible.charAt(Math.floor(Math.random() * possible.length))
            return text;
      }
        cy.get('.eds-dropdown__toggle-button').eq(1).click() //Velge leder
          .get('li').first().click()
        cy.get('.eds-dropdown__toggle-button').eq(2).click() //Velge kassapunktplassering
          .get('li').first().click()
        cy.get('[data-testid="submit-button"]').click();
        cy.get('title'); 

      //Logge ut//
      //cy.get('.eps-user-menu__trigger-button').click();
      //cy.get(':nth-child(1) > .eds-button').first().click()
        });
      })