import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rides/plan-trip-table', 'Integration | Component | rides/plan trip table', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{rides/plan-trip-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#rides/plan-trip-table}}
      template block text
    {{/rides/plan-trip-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
