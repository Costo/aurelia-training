import 'bootstrap';
import {Aurelia} from 'aurelia-framework';
import {Configuration} from 'configuration';

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    aurelia.use.plugin('aurelia-animator-css');

    var config = new Configuration();
    config.userId = 1;
    config.apiRoot = 'http://jsonplaceholder.typicode.com/';
    aurelia.use.instance(Configuration, config);

    aurelia.start().then(() => aurelia.setRoot());
}