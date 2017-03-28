import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rides/view-ride-table', 'Integration | Component | rides/view ride table', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{rides/view-ride-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#rides/view-ride-table}}
      template block text
    {{/rides/view-ride-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
