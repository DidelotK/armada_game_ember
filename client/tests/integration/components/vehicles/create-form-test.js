import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('vehicles/create-form', 'Integration | Component | vehicles/create form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{vehicles/create-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#vehicles/create-form}}
      template block text
    {{/vehicles/create-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
