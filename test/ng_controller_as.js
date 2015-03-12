//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_controller_as', {
    valid: [
        '$routeProvider.when("/myroute", { controller: "MyController", controllerAs: "vm" })',
        '$routeProvider.when("/myroute2", { template: "<div></div>" })',
        '$stateProvider.state("mystate", { controller: "MyController", controllerAs: "vm" })',
        '$stateProvider.state("mystate2", { controller: "MyController as vm" })',
        '$stateProvider.state("mystate2", { template: "<div></div>" })'
    ],
    invalid: [
        { code: '$routeProvider.when("/myroute", { controller: "MyController" })',
            errors: [{ message: 'Route "/myroute" should use controllerAs syntax'}] },
        { code: '$routeProvider.when("/myroute", { controller: "MyController", controllerAs: "vm" }).when("/myroute2", { controller: "MyController" })',
            errors: [{ message: 'Route "/myroute2" should use controllerAs syntax'}] },
        { code: '$stateProvider.state("mystate", { controller: "MyController" })',
            errors: [{ message: 'State "mystate" should use controllerAs syntax'}] },
        { code: '$stateProvider.state("mystate", { controller: "MyController", controllerAs: "vm" }).state("mystate2", { controller: "MyController" })',
            errors: [{ message: 'State "mystate2" should use controllerAs syntax'}] },
        { code: '$stateProvider.state({ name: "myobjstate", controller: "MyController" })',
            errors: [{ message: 'State "myobjstate" should use controllerAs syntax'}] }
    ]
});
