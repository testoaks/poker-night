import "./helpers/context_menu.js";
import "./helpers/external_links.js";
import './stylesheets/main.scss';
import 'angular';
import 'angular-ui-router';
import 'ui-router-extras';

window.ngapp = angular.module('myApp', ['ui.router', 'ct.ui.router.extras']);

ngapp.config(function ($urlMatcherFactoryProvider) {
  // allow urls with and without trailing slashes to go to the same state
  $urlMatcherFactoryProvider.strictMode(false);
});

require('./views/home');