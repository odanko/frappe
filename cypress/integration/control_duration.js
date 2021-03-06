context('Control Duration', () => {
	before(() => {
		cy.login();
		cy.visit('/desk#workspace/Website');
	});

	function get_dialog_with_duration(show_days=1, show_seconds=1) {
		return cy.dialog({
			title: 'Duration',
			fields: [{
				'fieldname': 'duration',
				'fieldtype': 'Duration',
				'show_seconds': show_days,
				'show_days': show_seconds
			}]
		});
	}

	it('should set duration', () => {
		get_dialog_with_duration().as('dialog');
		cy.get('.frappe-control[data-fieldname=duration] input')
			.first()
			.click();
		cy.get('.duration-input[data-duration=days]')
			.type(45, {force: true})
			.blur({force: true});
		cy.get('.duration-input[data-duration=minutes]')
			.type(30)
			.blur({force: true});
		cy.get('.frappe-control[data-fieldname=duration] input').first().should('have.value', '45d 30m');
		cy.get('.frappe-control[data-fieldname=duration] input').first().blur();
		cy.get('.duration-picker').should('not.be.visible');
		cy.get('@dialog').then(dialog => {
			let value = dialog.get_value('duration');
			expect(value).to.equal(3889800);
		});
	});

	it('should hide days or seconds according to duration options', () => {
		get_dialog_with_duration(0, 0).as('dialog');
		cy.get('.frappe-control[data-fieldname=duration] input').first().click();
		cy.get('.duration-input[data-duration=days]').should('not.be.visible');
		cy.get('.duration-input[data-duration=seconds]').should('not.be.visible');
	});
});