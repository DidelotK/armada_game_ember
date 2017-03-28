import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('users/profile-dashboard/user', 'Integration | Component | users/profile dashboard/user', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{users/profile-dashboard/user}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#users/profile-dashboard/user}}
      template block text
    {{/users/profile-dashboard/user}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
